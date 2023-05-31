<?php 

    require_once "./conexion.php";
    include "../controllers/validaciones.php";
    
    $conexion = conexion();

    /**
     * Funcion retorna un objeto con los datos del pedido de la tabla pedido. Recibe como parametro el codigo del pedido (String).
     */
    function extraer_datos_tabla_pedido($codigo_pedido){
        global $conexion;

        try{
            $datos = mysqli_query($conexion, "SELECT * FROM pedido where id_pedido = '$codigo_pedido'");
            if(mysqli_num_rows($datos) > 0){
                $datos = mysqli_fetch_all($datos,MYSQLI_ASSOC);
                return $datos;
                exit();
            }else{
                return false;
            }
        }catch(mysqli_sql_exception $error){
                echo json_encode(["success" => "ha ocurrido un error ".$error]);
        }
    }

    /**
     * Funcion retorna un objeto con los datos del pedido de la tabla pedido_productos. Como parametro recibe el codigo del pedido (String).
     */
    function extraer_datos_tabla_pedido_productos($codigo_pedido){
        global $conexion;

        try{
            $datos = mysqli_query($conexion, "SELECT * FROM pedido_productos where id_pedido = '$codigo_pedido'");
            if(mysqli_num_rows($datos) > 0){
                $datos = mysqli_fetch_all($datos,MYSQLI_ASSOC);
                return $datos;
                exit();
            }else{
                return false;
            }
        }catch(mysqli_sql_exception $error){
                echo json_encode(["success" => "ha ocurrido un error ".$error]);
        }
    }


    if(isset($_GET['extraer_datos_pedido'])){

        $codigo_pedido = $_GET['extraer_datos_pedido'];

        //validamos e codigo del pedido
         if(!validarNumeros($codigo_pedido)){
            echo json_encode(['success' => ['Formato de codigo de pedido incorrecto','codigo_pedido']]);
            return;
        }
        
        //extraemos los datos de la tabla pedido
        $datos_tabla_pedidos = extraer_datos_tabla_pedido($codigo_pedido);
        //evaluamos si hubo coincidencias durante la consulta
        if($datos_tabla_pedidos){
            //extraemos los datos de la tabla pedido_productos
            $datos_tabla_pedidos_productos = extraer_datos_tabla_pedido_productos($codigo_pedido);

            $array_respuestas = array();

            array_push($array_respuestas,$datos_tabla_pedidos);
            array_push($array_respuestas,$datos_tabla_pedidos_productos);

            echo json_encode(['success' => $array_respuestas]);
        }else{
            echo json_encode(['success' => 0]);
        }
    }

    if(isset($_GET['modificar_estatus_pedido'])){
        global $conexion;

        $id_pedido= $_GET['modificar_estatus_pedido'];

        try{
            $data = mysqli_query($conexion,"UPDATE pedido SET  
                pagado = 1
                WHERE id_pedido = '$id_pedido' 
            ");
            echo json_encode($data);
        }catch(mysqli_sql_exception $error){
            echo json_encode(["success" => "ha ocurrido un error ".$error]);
        }
    }

    