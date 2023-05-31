import { url } from "./urls.js";
import {alerta} from "./utils.js";
import { validarExpresion, validarNumeros } from "./validaciones.js";
import { comprobar_permiso_accion } from "./controlador_acciones.js";

const {url_productos, url_sesiones} = url;

const d = document,
$tabListProducts = d.querySelector('#tabListProducts'),
$lista_productos = d.querySelector('#lista_productos'),
$searchProduct = d.querySelector('#searchProduct'),
$buscador =  d.querySelector('#buscador'),
$buscador2 = d.querySelector('#buscador2'),
$fragment_productos = d.createDocumentFragment();

//Mostrar los datos de los productos
const showAllproductos = (data) => {

    console.log(data);
    //enlazamos el template creado en el HTML
    const $template_productos = d.querySelector('#template_productos').content;
        
    if(data.length > 0){

        data.forEach(element => {
            //Insertamos los datos en el template
            $template_productos.querySelector('#name_producto').textContent = `${element['nombre_producto']}`;
            $template_productos.querySelector('.zmdi-more').dataset.id = element['id_producto']; 
            $template_productos.querySelector('#precio').textContent = `Precio : $${element['precio'] == null ? 0 : element['precio']}`;
            $template_productos.querySelector('#contenido_neto').textContent = `Contenido neto : ${element['contenido_neto']}L`;

            element.url_image == "" 
            ? 
            $template_productos.querySelector('.img-responsive').src = 'views/assets/img/fontLogin.jpg' 
            : 
            $template_productos.querySelector('.img-responsive').src = element.url_image.substring(3);

            //guardamos una copia de la estrutura actual del template en la variable $node
            let $node = d.importNode($template_productos,true);
            //Guardamos el nodo en el fragment
            $fragment_productos.append($node);
        });

        //Limpiamos la lista
        $lista_productos.innerHTML = "";
         //Insertamos el fragment en la lista
        $lista_productos.append($fragment_productos);
    }
}

//Extraer datos de los productos
const getAllDataProductos = async (url) => {

    try {
        const res =  await fetch(`${url}?consultar_todos_productos=1`);
        if(!res.ok) throw {status : res.status, statusText : res.statusText};
        const data = await res.json();
        //Verificamos si la consulta trae productos para mostrar
        if(data['success'] == 0){
            alerta({
                titulo : '¡No hay Productos!',
                mensaje : "No se han registrado productos",
                tipo_mensaje : "warning"
            })
        }else{
            showAllproductos(data['success']);
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

 /* Utilizamos el id del producto para generar una variable de session en php
    y persistir los datos para luego usarlos en la ventana de modificar productos */
const generarVariableSesion = async(id, url) => {
    try {
        const res = await fetch(`${url}?sesion_producto=${id}`);
        if(!res.ok) throw {status : res.status, statusText : res.statusText};
        const data = await(res.json());
        if(data['data'] != ""){
            //Redirigimos a la ventana de modificar productos;
            redirigir_A_modificar_productos();  
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

const redirigir_A_modificar_productos = () => {
    window.location = 'update_productos';
}

//Extraemos los datos de un producto
const buscar_producto = async (id_producto, url) => {

    try {
        const res =  await fetch(`${url}?consultar_producto_por_codigo=${id_producto}`);
        if(!res.ok) throw {status : res.status, statusText : res.statusText};
        const data = await res.json();
        if(data['success'] == 0){
            alerta({
                titulo : "¡Producto No Encontrado!",
                mensaje : "El Producto No Se Encuentra Registrado",
                tipo_mensaje :  "warning",
            });
            $searchProduct.value = "";
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
                showAllproductos(data["success"]);
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

    if($tabListProducts !== null){

        getAllDataProductos(url_productos);

        d.addEventListener('click', async ev => {

            if(ev.target.classList.contains('zmdi-more')){
                //Verificamos si el administrador tiene los privilegios para eliminar
                let permiso_accion = await comprobar_permiso_accion('modificar');
                if(permiso_accion){
                    generarVariableSesion(ev.target.dataset.id,url_sesiones);
                }else{
                    alert('No tiene los privilegios para realizar esta accion');
                }
                
            }

            if(ev.target === $buscador || ev.target === $buscador2){
                if($searchProduct.value !== ""){ 
                    //Validamos los datos ingresados
                    // if(!validarNumeros($searchProduct,$searchProduct.parentElement)){
                    //     return;
                    // }

                    buscar_producto($searchProduct.value,url_productos);
                }
            }
        });
    }
});