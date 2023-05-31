<?php

    require_once "./conexion.php";
    include "../controllers/validaciones.php";
    $conexion = conexion();

    //Consultar los datos de los productos en venta
    if(isset($_GET["consultar_todos_productos_venta"])){
        global $conexion;
        try{
            $datos = mysqli_query($conexion, "SELECT * FROM productos WHERE en_Venta = 1");
            if(mysqli_num_rows($datos) > 0){
                $datos = mysqli_fetch_all($datos,MYSQLI_ASSOC);
                echo json_encode(["success" => $datos]);
                exit();
            }else{
                echo json_encode(["success" => 0]);
            }
        }catch(mysqli_sql_exception $error){
            echo json_encode(["success" => "ha ocurrido un error ".$error]);
        }
    }

    function buscar_producto($id_producto){
        global $conexion;
        try {
            $datos = mysqli_query($conexion, "SELECT * FROM productos WHERE id_producto = '$id_producto'");
            if(mysqli_num_rows($datos) > 0){
                $datos = mysqli_fetch_all($datos,MYSQLI_ASSOC);
                return $datos;
                exit();
            }else{
                return 0;
            }
        } catch (mysqli_sql_exception $error) {
            echo json_encode(["success" => "ha ocurrido un error ".$error]);
        }
    }

    //Consultar los datos de un producto especifico por medio del id de producto
    if(isset($_GET["consultar_producto"])){
        global $conexion;

        $id_producto = $_GET['consultar_producto'];

        //Realizamos la consulta
        $data = buscar_producto($id_producto);

        //Devolvemos los datos
        echo json_encode(['success' => $data]);
    }

    if(isset($_GET['consultar_productos'])){

        $data = json_decode(file_get_contents('php://input'));
        
        $array_data_productos = array();

        for ($i=0; $i < count($data); $i++) { 
            array_push($array_data_productos, buscar_producto($data[$i])[0]);
        }
        
        echo json_encode(['success' => $array_data_productos]);

    }