<?php 

    require_once "./conexion.php";
    include "../controllers/validaciones.php";
    $conexion = conexion();

    

    //Realizamos la autenticacion del usuario
    if(isset($_GET['verificar_session_usuario'])){
        global $conexion;
        $user_name = $_GET['user_name'];
        $password = $_GET['password'];
        $num_intentos = $_GET['num_intentos'];

        if(intval($num_intentos) > 2){
            //No permitimos el intento de sesion ya que se excedio el limite
            echo json_encode(['success' => [2]]);
            return;

        }else{

            //Validamos los datos

            // if(!validarExpresion($id_administrador)){
            //     echo json_encode(['success' => ['Formato del dato de busqueda incorrecto','']]);
            //     return;
            // }

            try {
                $datos = mysqli_query($conexion, "SELECT * FROM cliente WHERE usuario_cliente = '$user_name' and contrasenia = '$password'");
                if(mysqli_num_rows($datos) > 0){
                    $datos = mysqli_fetch_all($datos,MYSQLI_ASSOC);

                    //Creamos la variable de session
                    session_start();
                    $_SESSION['session_cliente'] = $datos;

                    echo json_encode(["success" => [$datos]]);
                    exit();
                }else{
                    echo json_encode(["success" => [0]]);
                }
            }catch(mysqli_sql_exception $error){
                echo json_encode(["success" => "ha ocurrido un error ".$error]);
            }
        }
    }

   

