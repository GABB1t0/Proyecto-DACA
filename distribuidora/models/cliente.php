<?php

    require_once "conexion.php";

    $conexion = conexion();

    if(isset($_GET['obtener_datos_clientes'])){
        global $conexion;

        try{

            $data = mysqli_query($conexion,"SELECT * FROM cliente");
            if(mysqli_num_rows($data) > 0){
                $data = mysqli_fetch_all($data,MYSQLI_ASSOC);
                echo json_encode($data);
                exit();
            }else{
                echo json_encode(["success" => 0]);
            }

        }catch(mysqli_sql_exception $error){
            echo json_encode(["error" => "Ha ocurrido un error durante la busqueda".$error]);
        }        

    }

    //Obtener datos datos del cliente por medio del usuario
    if(isset($_GET["obtener_datos_cliente"])){
        global $conexion;

        $usuario_cliente = $_GET["obtener_datos_cliente"];

        try{

            $data = mysqli_query($conexion,"SELECT * FROM cliente WHERE usuario_cliente = '$usuario_cliente'");
            if(mysqli_num_rows($data) > 0){
                $data = mysqli_fetch_all($data,MYSQLI_ASSOC);
                echo json_encode($data);
                exit();
            }else{
                echo json_encode(["success" => 0]);
            }

        }catch(mysqli_sql_exception $error){
            echo json_encode(["error" => "Ha ocurrido un error durante la busqueda".$error]);
        }

    }

    //Obtener datos datos del cliente por medio del id
    if(isset($_GET["obtener_datos_cliente_por_id"])){
        global $conexion;

        $id_cliente = $_GET["obtener_datos_cliente_por_id"];

        try{
            $data = mysqli_query($conexion,"SELECT * FROM cliente WHERE id_cliente = '$id_cliente'");
            if(mysqli_num_rows($data) > 0){
                $data = mysqli_fetch_all($data,MYSQLI_ASSOC);
                echo json_encode($data);
                exit();
            }else{
                echo json_encode(["success" => 0]);
            }

        }catch(mysqli_sql_exception $error){
            echo json_encode(["error" => "Ha ocurrido un error durante la busqueda".$error]);
        }

    }