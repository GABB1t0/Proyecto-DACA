import { url } from "./urls.js";
import { alerta } from "./utils.js";
import { validarExpresion, validarNumeros } from "./validaciones.js";

const {url_productos, url_sesiones} = url;

const d = document,
$tabListProductsVenta = d.querySelector('#tabListProductsVenta'),
$lista_productosVenta = d.querySelector('#lista_productos_venta'),
$search_producto_venta = d.querySelector('#search_producto_venta'),
$buscador =  d.querySelector('#buscador'),
$buscador2 = d.querySelector('#buscador2'),
$fragment_productos = d.createDocumentFragment();

//Mostrar los datos de los productos
const showAllproductos = (data) => {

    //enlazamos el template creado en el HTML
    const $template_productos = d.querySelector('#template_productos_venta').content;

    if(data.length > 0){

        data.forEach(element => {
            //Insertamos los datos en el template
            $template_productos.querySelector('#name_producto').textContent = `${element['nombre_producto']}`;  
            $template_productos.querySelector('#precio').textContent = `Precio : $${element['precio'] == null ? 0 : element['precio']}`;
            $template_productos.querySelector('#contenido_neto').textContent = `Contenido neto : ${element['contenido_neto']}L`;
            //guardamos una copia de la estrutura actual del template en la variable $node
            
            element.url_image == "" 
            ? 
            $template_productos.querySelector('.img-responsive').src = 'views/assets/img/fontLogin.jpg' 
            : 
            $template_productos.querySelector('.img-responsive').src = element.url_image.substring(3);

            let $node = d.importNode($template_productos,true);
            //Guardamos el nodo en el fragment
            $fragment_productos.append($node);
        });
    
        //Limpiamos la lista
        $lista_productosVenta.innerHTML= "";
         //Insertamos el fragment en la lista
        $lista_productosVenta.append($fragment_productos);
    }else{
        //Limpiamos la lista
        $lista_productosVenta.innerHTML= "";
    }
}

//Extraemos los datos de los productos que estan en venta
const getAllDataProductos = async (url) => {

    try {
        const res =  await fetch(`${url}?consultar_todos_productos_venta=1`);
        if(!res.ok) throw {status : res.status, statusText : res.statusText};
        const data = await res.json();
        //Verificamos si la consulta trae productos para mostrar
        if(data['success'] == 0){
            alerta({
                titulo : '¡No hay Productos en Venta!',
                tipo_mensaje : "warning"
            })
        }else{
            showAllproductos(data["success"]);
        }        
    } catch (error) {
        console.log(error);
        let titulo = error.status || "Error";
        let mensaje = error.statusText || "Ocurrio un error, Contacte al Administrador";
        alerta({
            titulo,
            mensaje,
            tipo_mensaje:"error"
        });
    }
}

//Extraemos los datos de un producto especifico, dicho producto tiene que estar en venta
const getDataProductoVenta = async (producto,url) => {

    try {
        const res =  await fetch(`${url}?consultar_producto_venta=${producto}`);
        if(!res.ok) throw {status : res.status, statusText : res.statusText};
        const data = await res.json();
        console.log(data)
        //Verificamos si la consulta trae productos para mostrar
        if(data['success'] == 0){
            alerta({
                titulo : "El Producto No Se Encuentra En Venta",
                tipo_mensaje : "warning"
            });
           $search_producto_venta.value = "";
        }else{

            //En caso de fallar la validacion en el backend se envia un alerta y se detiene la busqueda
            if(typeof data['success'][0] === "string"){
                alerta({
                    titulo: "Error",
                    mensaje : data["success"][0],
                    tipo_mensaje: "error",
                });
                data['success'][1] !== '' ? d.querySelector(`#${data['success'][1]}`).parentElement.parentElement.classList.add('is-invalid') : "";
            }else{
                 //Mostramos los datos
                showAllproductos(data['success']);
            }
        }
    } catch (error) {
        console.log(error);
        let titulo = error.status || "Error";
        let mensaje = error.statusText || "Ocurrio un error, Contacte al Administrador";
        alerta({
            titulo,
            mensaje,
            tipo_mensaje:"error"
        });
    }
}

d.addEventListener('DOMContentLoaded', e => {

    if($tabListProductsVenta !== null){
        getAllDataProductos(url_productos);

        d.addEventListener('click', ev => {

            if(ev.target === $buscador || ev.target === $buscador2){
                if($search_producto_venta.value !== ""){
                    if(!validarNumeros($search_producto_venta)){
                        return;
                    }
                    getDataProductoVenta($search_producto_venta.value, url_productos);
                }
            }
        });
    }
});