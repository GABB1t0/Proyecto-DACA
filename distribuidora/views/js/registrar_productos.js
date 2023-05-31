import { url } from "./urls.js";
import { alerta } from "./utils.js";
import { validarNumeros, validarCamposVacios, validarExpresion, validarImagen } from "./validaciones.js";

const {url_productos,url_productos2} = url;

const d = document,
$tabNewProduct = d.querySelector('#tabNewProduct');

//////Guardar datos del producto /////////
const save_producto = async (data_productos, url) => {

    console.log(data_productos);

    const body = {
        method : 'POST',
        body : data_productos,
    }

    try {
        const res = await fetch(`${url}?registrar_producto=1`,body);
        if(!res.ok) throw {status: res.status, statusText: res.statusText};
        const data = await res.json();
        console.log(data);
        if(data['success'] == 1){
            alerta({
                titulo: "Registro Exitoso",
                mensaje : "El Producto se ha registrado Satisfactoriamente",
                tipo_mensaje: "success",
                callback : ()=>{
                    window.location = "lista_productos";  
                },
                bool: true
            });
        }else{
             //En caso de fallar la validacion en el backend se envia un alerta
            alerta({
                titulo: "Error",
                mensaje : data["success"][0],
                tipo_mensaje: "error",
            });
            data['success'][1] !== '' ? d.querySelector(`#${data['success'][1]}`).parentElement.classList.add('is-invalid') : "";
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

//Comprobamos si el codigo de producto ya se encuentra registrado
const isCodigoProductoRegistrado = async (codigo_producto, url) => {

    try {
        const res = await fetch(`${url}?validar_producto=${codigo_producto}`);
        if(!res.ok) throw {status: res.status, statusText:res.statusText};
        const data = await(res.json());
        if(data['success'] == 1){
            return data;
        }else{
            //En caso de fallar la validacion en el backend se envia un alerta
            if(typeof data['success'][0] === "string"){
                alerta({
                    titulo: "Error",
                    mensaje : data["success"][0],
                    tipo_mensaje: "error",
                });
                data['success'][1] !== '' ? d.querySelector(`#${data['success'][1]}`).parentElement.classList.add('is-invalid') : "";
                return data['success'] = 2;
            }
            return data['success'] = 0;
        }     
    } catch (error) {
        let titulo = error.status || "Error";
        let mensaje = error.statusText || "Ocurrio un error, Contacte al Administrador";
        alerta({
            titulo,
            mensaje,
            tipo_mensaje: "error"
        });
    }
}

d.addEventListener('DOMContentLoaded', async e => {

    if($tabNewProduct !== null){

        d.addEventListener('submit', async ev => {

            ev.preventDefault();
            ev.stopPropagation();

            //Extraemos los datos del formulario
            let codigo_producto = d.querySelector('#BarCode');
            let nombre_producto = d.querySelector('#NameProduct');
            let contenido_neto = d.querySelector('#contenidoNeto');
            let estatus_producto =  d.querySelector('#estatusProducto');
            let imagen_producto = d.querySelector('#imagen_producto');
            let tipo = d.querySelector('#tipo');

            let data_imagen = imagen_producto.files[0];

            let arrayInputs = [codigo_producto,nombre_producto,contenido_neto,estatus_producto];

             //Validamos datos del formulario
            if(!validarCamposVacios(arrayInputs) || !validarNumeros(codigo_producto) || !validarExpresion(nombre_producto) || !validarNumeros(estatus_producto) || !validarNumeros(tipo) ||
            !validarNumeros(contenido_neto) || !validarImagen(data_imagen)){
                return;
            }

            //Comprobamos si el codigo de producto ingresado ya se encuentra registrado
            let is_codigo_producto_registrado = await isCodigoProductoRegistrado(codigo_producto.value,url_productos);

            if(is_codigo_producto_registrado['success'] == 1 ){
                alerta({
                    titulo : 'Codigo de Producto ya se encuentra registrado',
                    tipo_mensaje : "error"
                });
                d.querySelector('#label_codigo_producto').classList.add('is-invalid');
                return;
            }else if(is_codigo_producto_registrado['success'] == 2){
                return;
            }

            const formData = new FormData();
            formData.append('BarCode',codigo_producto.value);
            formData.append('NameProduct',nombre_producto.value);
            formData.append('contenidoNeto',contenido_neto.value);
            formData.append('estatusProducto',estatus_producto.value);
            formData.append('imagen_producto',data_imagen);
            formData.append('tipo',tipo.value);
            
            save_producto(formData,url_productos2);
            
        }) ;
    }
});