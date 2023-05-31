import { url } from "./urls.js";
import { helpHttp } from "./ApiFetch.js";
import { extraerDatosLocalStorage} from "./car.js";
import { parseToDoubleWithTwoDecimals } from "./utils.js"

const { url_productos,url_pedidos } = url;

const d = document,
$lista_productos_checkout = d.querySelector('#lista_productos_checkout'),
$registrar_pedido = d.querySelector('#registrar_pedido'),
$fragment = d.createDocumentFragment();
const apiFetch = helpHttp();

let data_carrito;

const show_data_products = (data) => {

    //Enlazamos el template HTML
    const $template_lista_productos_checkout = d.querySelector('#template_lista_productos_checkout').content;

    if(data.length > 0){

        data.forEach(element => {
            //Insertamos valores en el template
            $template_lista_productos_checkout.querySelector('.name').textContent = `${element.nombre_producto} ${element.grabado_excento == 1 ? '(G)': '(E)'}`;
            $template_lista_productos_checkout.querySelector('.price').textContent = `$${parseToDoubleWithTwoDecimals(element.precio)}`;
            $template_lista_productos_checkout.querySelector('.input-number').value = element.cantidad_pedida_usuario;
            $template_lista_productos_checkout.querySelector('.total').textContent = `$${parseToDoubleWithTwoDecimals(Number(element.precio) * Number(element.cantidad_pedida_usuario))}`;
            $template_lista_productos_checkout.querySelector('.img').style.backgroundImage = `url('views/images/${element.url_image.substring(25)}')`;
            $template_lista_productos_checkout.querySelector('.table-iva')
                .textContent = 
                    `$${parseToDoubleWithTwoDecimals(    
                        ( Number(element.precio) * Number(element.cantidad_pedida_usuario)) * 0.16
                        )
                    }`;

            let $clone = $template_lista_productos_checkout.cloneNode(true);
            //Guardamos el nodo en el fragment
            $fragment.append($clone); 
        });

        //Limpiamos la lista
        $lista_productos_checkout.innerHTML = "";
        $lista_productos_checkout.append($fragment);

    }else{
        //Limpiamos la lista
        $lista_productos_checkout.innerHTML = "";
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

const validar_metodo_pago = () => {
// Validar radio button
  const radioButtons = document.getElementsByName('optradio');
  let radioSelected = false;

  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      radioSelected = true;
      break;
    }
  }

  if (!radioSelected) {
    alert('Selecciona un metodo de pago');
    return false;
  }

  // Validar checkbox
  const checkbox = document.getElementsByName('terminos')[0];

  if (!checkbox.checked) {
    alert('Debes aceptar los términos y condiciones');
    return false;
  }

  return true;
}

const init = async () => {
    
    //Extraemos los datos guardados en el localStorage
    data_carrito = extraerDatosLocalStorage('carrito');


    if(data_carrito != false){

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
}

const extraer_fecha_actual = () => {

     // Paso 1: Crear una nueva instancia de Date
     const currentDate = new Date();

     // Paso 2: Formatear la fecha
     const year = currentDate.getFullYear();
     const month = String(currentDate.getMonth() + 1).padStart(2, '0');
     const day = String(currentDate.getDate()).padStart(2, '0');
     const formattedDate = `${year}-${month}-${day}`;

     return formattedDate;
}

$registrar_pedido.addEventListener('click', async e => {

    e.preventDefault();

    if(!validar_metodo_pago()){
        return;
    }

    //PREPARAMOS LOS DATOS PARA REGISTRAR EL PEDIDO

    //Extreamos la fecha actual
    const fecha_actual = extraer_fecha_actual();

    //Extraemos el id del cliente
    const data_cliente = extraerDatosLocalStorage('datos_user_cliente');

    //Validamos los datos del cliente
    if(data_cliente !== false){

        let data_pedido = {
            fecha_actual,
            id_cliente : data_cliente[0].id_cliente,
            data_carrito : data_carrito,
        };
    
        //Verificamos que la cantidad de pedidos del cliente no exceda el limite (3) maximo

        //Registramos el pedido en la base de datos
        let is_pedido_registrado = await apiFetch.post(`${url_pedidos}?registrar_pedido=1`,{
            body:data_pedido, 
            headers : {"content-type" : "application/json"}
        });

        //Verificamos que el pedido se registro correctamente
        if(is_pedido_registrado.success == 1){

            //Se debe borrar los datos del carrito

            //Se debe enviar los datos bancarios al correo del cliente

            //redireccionar seccion para envio de pago

        }

    }else{
        alert('cliente no ha iniciado sesión');
    }

});

d.addEventListener('DOMContentLoaded', async e => {
    await init();
});