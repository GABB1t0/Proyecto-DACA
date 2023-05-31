import { url } from "./urls.js";
import { helpHttp } from "./ApiFetch.js";

const { url_login } = url;

const d = document,
$loginForm = d.querySelector('#loginForm');

const guardar_usuario_cliente_local_storage = (datos) => {
    
    if(typeof(Storage) === "undefined"){
        return;
    }

    if(datos !== null || datos !== undefined){
        localStorage.setItem("datos_user_cliente",JSON.stringify(datos));
    }
}

let attempt_counter = 0;

$loginForm.addEventListener('submit', async e => {

    e.preventDefault();

    const { username, password } = e.target.elements;

    const usernameValue = username.value;
    const passwordValue = password.value;

    //Validar los datos 

    //Instaciamos La herramienta para realizar consultas
    const api = helpHttp();

    attempt_counter += 1;
    //Realizamos la consulta
    const res = await api.get(`${url_login}?verificar_session_usuario=1&user_name=${usernameValue}&password=${passwordValue}&num_intentos=${attempt_counter}`);

    console.log(res);

    if(res.success[0] == 0 ){
        console.log('datos erroneos');
    }else if(res.success[0] == 2){
        // Se recarga la pagina
        window.location = 'login';
    }else if(res.success !== Number){

        //Se comprobaron los datos

        //Se guardan los datos del usuario cliente en el localStorage
        guardar_usuario_cliente_local_storage(res.success[0]);
        //Se reinicia la variable contador
        attempt_counter = 0;
        //Redireccionamos al home
        window.location = 'main';
    }
});