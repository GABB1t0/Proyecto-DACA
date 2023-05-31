import { extraer_data_local_storage, } from "./utils.js";

const d = document,
$login_usuario = d.querySelector('#login_usuario');

d.addEventListener('DOMContentLoaded', e => {

    let arrayDatos = extraer_data_local_storage();

    //Comprobamos si hay datos en localStorage
    if(arrayDatos !== null){
        $login_usuario.innerHTML = 'LOG OUT';
    }else{
        $login_usuario.innerHTML = 'LOG IN';
    }
});

