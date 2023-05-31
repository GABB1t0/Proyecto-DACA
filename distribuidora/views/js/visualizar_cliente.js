import {url} from "./urls.js";

const {url_cliente, get_sessiones} = url;

const d = document,
$visualizar_cliente = d.querySelector('#visualizar_cliente');

const showCliente = (data) => {

    if(data.length > 0){

        data.forEach(element => {
            d.querySelector('#rif_empresa').value = element['rif'];
            d.querySelector('#label_rif_empresa').classList.add('is-dirty');

            d.querySelector('#nombre_empresa').value = element['nombre_empresa'];
            d.querySelector('#label_nombre_empresa').classList.add('is-dirty');

            d.querySelector('#ubicacion').value = element['ubicacion'];
            d.querySelector('#label_ubicacion').classList.add('is-dirty');

            d.querySelector('#usuario_cliente').value = element['usuario_cliente'];
            d.querySelector('#label_usuario_cliente').classList.add('is-dirty');

            d.querySelector('#contrasenia_cliente').value = element['contrasenia'];
            d.querySelector('#label_contrasenia_cliente').classList.add('is-dirty');
        });
    }
}

const obtener_datos_cliente = async(url,cliente) => {

    try {
        const res = await fetch(`${url}?obtener_datos_cliente_por_id=${cliente}`);
        const data = await res.json();
        if(data['success'] == 0){
            swal({
                title : "El Cliente No Se Encuentra Registrado",
                // text : "Los Datos del Administrador se ha Modificado Satisfactoriamente",
                type: "warning"
            },
            (isConfirm) => {
                if (isConfirm) {
                    window.location = "lista_cliente";
                }
            })
        }else{
            showCliente(data);
            //console.log(data)
        }
    } catch (error) {
        console.log(error);
    }

}

const extraerIdCliente = async(url) => {
    try {
        const res = await fetch(`${url}?extraer_id_cliente_session=1`);
        const data = await res.json();
        obtener_datos_cliente(url_cliente,data);
    } catch (error) {
        console.log(error);
    }
}

d.addEventListener('DOMContentLoaded', e=> {

    if($visualizar_cliente !== null){
        extraerIdCliente(get_sessiones);
    }

})