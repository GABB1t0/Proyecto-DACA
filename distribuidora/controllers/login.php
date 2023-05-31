<?php

// use function PHPSTORM_META\type;

    function accesar(){

        if(isset($_POST["userName"])){

            #preg_match = Realiza una comparacion con una expresion regular

            if(preg_match('/^[a-zA-Z0-9]+$/', $_POST["userName"]) &&
            preg_match('/^[a-zA-Z0-9]+$/', $_POST["password"])){

                #crypt() devolverá el hash de un string utilizando el algoritmo estándar basado en DES de Unix o algoritmos
                #alternativos que puedan estar disponibles en el sistema.

                #el encrypt lo voy a implementar despues de que cree el modulo registro administrador
                #$encrypt = crypt($_POST["password"], '$2a$07$asxx54ahjppf45sd87a5a4dDDGsystemdev$');

                $datosUser = array("user" => $_POST["userName"],
                            "password" => $_POST["password"]);

                #Realizamos una instacia de la clase LoginModels que se encuentra en paquete models
                
                #Llamamos al metodo entry para verificar si los datos de ingreso son correctos
                $answer = verificarDatosUsuario($datosUser['user'], $datosUser['password']);
                if($answer === null){
                    echo "<div class='alert alert-danger' style='text-align: center;'>Datos Incorrectos</div>";
                }else{

                    #Creamos ua variable de sesion para mantener los datos del usuario
                    session_start();
                    $_SESSION['user_admin'] = $datosUser['user'];
                    echo '
                    <script type="text/javascript">

                    const guardarUsuarioLocalStorage = (datos) => {

                        if(typeof(Storage) === "undefined"){
                            return;
                        }
                    
                        if(datos !== null || datos !== undefined){
                            localStorage.setItem("datos_user",JSON.stringify(datos));
                            window.location = "home";
                        }
                    }
                
                    guardarUsuarioLocalStorage('.json_encode($answer).')</script>'
                ;
                }
            }else{
                echo "<div class='alert alert-danger' style='text-align: center;'>No debe ingresar caracteres especiales</div>";
            }
        }

    }