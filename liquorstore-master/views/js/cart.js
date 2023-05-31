import { url } from "./urls.js";
import { helpHttp } from "./ApiFetch.js";
import { extraerDatosLocalStorage, functions_car } from "./car.js";
import { parseToDoubleWithTwoDecimals } from "./utils.js"

const { url_productos, get_sessiones } = url;

const d = document,
$lista_productos_cart = d.querySelector('#lista_productos_cart'),
$checkout = d.querySelector('#checkout'),
$modal = new bootstrap.Modal(document.getElementById('exampleModal')),// Obtén una referencia al modal por su identificador
$fragment = d.createDocumentFragment();
const apiFetch = helpHttp();

const show_data_products = (data) => {

    //Enlazamos el template HTML
    const $template_lista_productos_cart = d.querySelector('#template_lista_productos_cart').content;

    if(data.length > 0){

        data.forEach(element => {
            //Insertamos valores en el template
            $template_lista_productos_cart.querySelector('.name').textContent = `${element.nombre_producto} ${element.grabado_excento == 1 ? '(G)': '(E)'}`;
            $template_lista_productos_cart.querySelector('.price').textContent = `$${parseToDoubleWithTwoDecimals(element.precio)}`;
            $template_lista_productos_cart.querySelector('.input-number').value = element.cantidad_pedida_usuario;
            $template_lista_productos_cart.querySelector('.input-number').dataset.id = element.id_producto;
            $template_lista_productos_cart.querySelector('.agregar').dataset.id = element.id_producto;
            $template_lista_productos_cart.querySelector('.fa-plus').dataset.id = element.id_producto;
            $template_lista_productos_cart.querySelector('.disminuir').dataset.id = element.id_producto;
            $template_lista_productos_cart.querySelector('.fa-minus').dataset.id = element.id_producto;
            $template_lista_productos_cart.querySelector('.delete').dataset.id = element.id_producto;
            $template_lista_productos_cart.querySelector('.fa-close').dataset.id = element.id_producto;
            $template_lista_productos_cart.querySelector('.total').textContent = `$${parseToDoubleWithTwoDecimals(Number(element.precio) * Number(element.cantidad_pedida_usuario))}`;
            $template_lista_productos_cart.querySelector('.img').style.backgroundImage = `url('views/images/${element.url_image.substring(25)}')`;

            let $clone = $template_lista_productos_cart.cloneNode(true);
            //Guardamos el nodo en el fragment
            $fragment.append($clone); 
        });

        //Limpiamos la lista
        $lista_productos_cart.innerHTML = "";
        $lista_productos_cart.append($fragment);

    }else{
        //Limpiamos la lista
        $lista_productos_cart.innerHTML = "";
    }
}

const calcular_sub_total = (data) => {
    let sub_total = 0;
    
    data.forEach(element => {
        sub_total += Number(parseToDoubleWithTwoDecimals(Number(element.precio) * Number(element.cantidad_pedida_usuario)))   
    });
    
    return sub_total;
}

const calcular_total_iva = (data) => {
    let total_iva = 0;

    data.forEach(element => {
        total_iva += Number(parseToDoubleWithTwoDecimals(Number(element.precio) * Number(element.cantidad_pedida_usuario))) * 0.16;   
    });

    return total_iva;

    
}

const show_factura = (data) => {

    let total_iva = calcular_total_iva(data);
    let sub_total = calcular_sub_total(data);

    d.querySelector('.iva').textContent = `$${total_iva}`;
    d.querySelector('.subtotal').textContent = `$${sub_total}`;
    d.querySelector('.monto_total').textContent = `$${parseToDoubleWithTwoDecimals(sub_total + total_iva)}`;
}

const init = async () => {
    
    //Extraemos los datos guardados en el localStorage
    let data_carrito = extraerDatosLocalStorage('carrito');

    console.log(data_carrito)

    //Obtenemos los id de los productos contenidos en carrito
    let id_productos_carrito = data_carrito.map( e => e.id_producto);

    let data_productos = await apiFetch.post(`${url_productos}?consultar_productos=1`,{
        body:id_productos_carrito, 
        headers : {"content-type" : "application/json"}
    });

    data_productos.success.forEach((element,index)=> {
        element.cantidad_pedida_usuario = data_carrito[index].cantidad;
    });

    data_productos.success.sort((a, b) => b.id_producto - a.id_producto);

    show_data_products(data_productos.success);
    show_factura(data_productos.success);
}

$checkout.addEventListener('click', async e => {

    e.preventDefault();

    let session = await apiFetch.get(`${get_sessiones}?comprobar_session_cliente=1`);

    //Se verifica si tiene la session activa
    if(session.success != 0){//Si la tiene se redirige a la siguiente pagina
        window.location = 'checkout';
    }else{//Si no, se abre una ventana para hacer login
        // Abre el modal
        $modal.show();
    }
});

d.addEventListener('click', e => {

    //Aumentamos la cantidad de productos
    if(e.target.classList.contains('agregar')){
        e.preventDefault();

        if (e.target.parentElement.tagName === 'SPAN') {

            let id_product = e.target.dataset.id
            let cantidad = Number(e.target.parentElement.previousElementSibling.value) + 1;

            e.target.parentElement.previousElementSibling.value = cantidad;

            functions_car.modificar_cantidad_productos({
                id_product,
                cantidad
            });

            init();
        
        }else if (e.target.parentElement.tagName === 'BUTTON') {

            let id_product = e.target.dataset.id;
            let cantidad = Number(e.target.parentElement.parentElement.previousElementSibling.value) + 1;

            e.target.parentElement.parentElement.previousElementSibling.value = cantidad;
            
            functions_car.modificar_cantidad_productos({
                id_product,
                cantidad
            });

            init();

        }
    }
  
    //Disminuimos la cantidad de productos
    if(e.target.classList.contains('disminuir')){
      e.preventDefault();

        if (e.target.parentElement.tagName === 'SPAN') {

            let id_product = e.target.dataset.id
            let cantidad = e.target.parentElement.nextElementSibling.value > 1 ? Number(e.target.parentElement.nextElementSibling.value) - 1 : 1;

            e.target.parentElement.nextElementSibling.value = cantidad;

            functions_car.modificar_cantidad_productos({
                id_product,
                cantidad
            });

            init();
        
        }else if (e.target.parentElement.tagName === 'BUTTON') {

            let id_product = e.target.dataset.id
            let cantidad = e.target.parentElement.parentElement.nextElementSibling.value > 1 ?Number(e.target.parentElement.parentElement.nextElementSibling.value) - 1 : 1;

            e.target.parentElement.parentElement.nextElementSibling.value = cantidad;

            functions_car.modificar_cantidad_productos({
                id_product,
                cantidad
            });

            init();
        }
    }

    //Eliminar Producto del carrito
    if(e.target.classList.contains('delete')){
        functions_car.deleteCar(e.target.dataset.id);
        init();
    }

    //Cerramos el modal
    if(e.target.classList.contains('cerrar')){
        $modal.hide();
    }
  
});

d.addEventListener('DOMContentLoaded', async e => {
    await init();
});