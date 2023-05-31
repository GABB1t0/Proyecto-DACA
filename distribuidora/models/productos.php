<?php

    require_once "conexion.php";
    include "../controllers/validaciones.php";

    $conexion = conexion();

    //Consultar los datos de los productos
    if(isset($_GET["consultar_todos_productos"])){
        global $conexion;
        try{
            $datos = mysqli_query($conexion, "SELECT * FROM productos");
            if(mysqli_num_rows($datos) > 0){
                $datos = mysqli_fetch_all($datos,MYSQLI_ASSOC);
                echo json_encode(["success"=>$datos]);
                exit();
            }else{
                echo json_encode(["success" => 0]);
            }
        }catch(mysqli_sql_exception $error){
            echo json_encode(["success" => "ha ocurrido un error ".$error]);
        }
        
    }

     //Consultar los datos de un producto especifico por medio del id de producto
     if(isset($_GET["consultar_producto"])){
        global $conexion;
        $id_producto = $_GET['consultar_producto'];

        if(!validarNumeros($id_producto)){
            echo json_encode(['success' => ['Formato del dato de busqueda incorrecto','']]);
            return;
        }

        try {
            $datos = mysqli_query($conexion, "SELECT * FROM productos WHERE id_producto = '$id_producto'");
            if(mysqli_num_rows($datos) > 0){
                $datos = mysqli_fetch_all($datos,MYSQLI_ASSOC);
                echo json_encode(["success" =>$datos]);
                exit();
            }else{
                echo json_encode(["success" => 0]);
            }
        } catch (mysqli_sql_exception $error) {
            echo json_encode(["success" => "ha ocurrido un error ".$error]);
        }
    }

    //Consultar los datos de un producto especifico por medio del codigo de producto
    if(isset($_GET["consultar_producto_por_codigo"])){
        global $conexion;
        $cod_producto = $_GET['consultar_producto_por_codigo'];

        if(!validarNumeros($cod_producto)){
            echo json_encode(['success' => ['Formato del dato de busqueda incorrecto','searchProduct']]);
            return;
        }

        try{
            $datos = mysqli_query($conexion, "SELECT * FROM productos WHERE codigo_producto = '$cod_producto'");
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

    //Consultar los datos de un producto especifico que este en venta por medio del codigo de producto
    if(isset($_GET["consultar_producto_venta"])){
        global $conexion;
        $cod_producto = $_GET['consultar_producto_venta'];

        if(!validarExpresion($cod_producto)){
            echo json_encode(['success' => ['Formato del dato de busqueda incorrecto','search_producto_venta']]);
            return;
        }

        try{
            $datos = mysqli_query($conexion, "SELECT * FROM productos WHERE codigo_producto = '$cod_producto' AND en_Venta = 1");
            if(mysqli_num_rows($datos) > 0){
                $datos = mysqli_fetch_all($datos,MYSQLI_ASSOC);
                echo json_encode(["success"=>$datos]);
                exit();
            }else{
                echo json_encode(["success" => 0]);
            }
        }catch(mysqli_sql_exception $error){
            echo json_encode(["success" => "ha ocurrido un error ".$error]);
        }
    }

    //Consultar para validar la existencia de un producto
    if(isset($_GET["validar_producto"])){
        global $conexion;
        $codigo_producto = $_GET['validar_producto'];

        if(!validarExpresion($codigo_producto)){
            echo json_encode(['success' => ['Formato del dato de busqueda incorrecto','BarCode']]);
            return;
        }

        try{
            $datos = mysqli_query($conexion, "SELECT * FROM productos WHERE codigo_producto = '$codigo_producto'");
            if(mysqli_num_rows($datos) > 0){
                $datos = mysqli_fetch_all($datos,MYSQLI_ASSOC);
                echo json_encode(["success" => 1]);
                exit();
            }else{
                echo json_encode(["success" => 0]);
            }
        }catch(mysqli_sql_exception $error){
            echo json_encode(["success" => "ha ocurrido un error ".$error]);
        }    
    }
        
    /**Funcion personalizada de buscar productos por medio del id_producto */
    function consultar_datos_productos($id_producto){
        global $conexion;
        
        try{
            $datos = mysqli_query($conexion, "SELECT * FROM productos WHERE id_producto = '$id_producto'");
            
            if(mysqli_num_rows($datos) > 0){
                $datos = mysqli_fetch_all($datos,MYSQLI_ASSOC);
                return(["success" => $datos]);
                exit();
            }else{
                return $datos;
            }

        }catch(mysqli_sql_exception $error){
            echo json_encode(["success" => "ha ocurrido un error ".$error]);
        }
    }

    if(isset($_GET['consultar_datos_productos'])){

        $data = json_decode(file_get_contents('php://input'));
        $id_productos = $data->data;

        $datos_productos = array();

        for($i = 0; $i < count($id_productos); $i++){
            array_push($datos_productos, consultar_datos_productos($id_productos[$i]));
        }

        echo json_encode(["success" => $datos_productos]);
    }

    function modificar_cantidad_disponible_producto($id_producto,$cantidad_disponible){
        global $conexion;

        if($id_producto != ""){

            try{
                $data = mysqli_query($conexion,"UPDATE productos SET  
                    cantidad_disponible = '$cantidad_disponible'
                    WHERE id_producto = '$id_producto' 
                ");
                return $data;
            }catch(mysqli_sql_exception $error){
                echo json_encode(["success" => "ha ocurrido un error ".$error]);
            }

        }else{
            echo json_encode(['success' => 0]);
        }

    }

    function modificar_cantidad_disponible_producto_pedido($id_producto,$cantidad_disponible,$cantidad_apartada){
        global $conexion;

        if($id_producto != ""){

            try{
                $data = mysqli_query($conexion,"UPDATE productos SET  
                    cantidad_disponible = '$cantidad_disponible',
                    cantidad_apartada = '$cantidad_apartada'
                    WHERE id_producto = '$id_producto' 
                ");
                return $data;
            }catch(mysqli_sql_exception $error){
                echo json_encode(["success" => "ha ocurrido un error ".$error]);
            }

        }else{
            echo json_encode(['success' => 0]);
        }

    }

    //Modificar la cantidad disponible de los Productos (ventas)
    if(isset($_GET['modificar_cantidad_disponible_producto'])){

        $data = json_decode(file_get_contents("php://input"));
        $datos_productos =  $data->datos_productos;
        
        $registro = false;

        for ($i=0; $i < count($datos_productos); $i++) { 
            $registro = modificar_cantidad_disponible_producto(
                $datos_productos[$i]->id_producto,
                $datos_productos[$i]->cantidad_disponible
            );
        }
        
        if($registro){
            echo json_encode(["success" => 1]);
        }else{
            echo json_encode(["success" => 0]);
        }
    }

    //Modificar la cantidad disponible de los Productos (ventas_pedido)
    if(isset($_GET['modificar_cantidad_disponible_producto_pedido'])){

        $data = json_decode(file_get_contents("php://input"));
        $datos_productos =  $data->datos_productos;
        
        $registro = false;

        for ($i=0; $i < count($datos_productos); $i++) { 
            $registro = modificar_cantidad_disponible_producto_pedido(
                $datos_productos[$i]->id_producto,
                $datos_productos[$i]->cantidad_disponible,
                $datos_productos[$i]->cantidad_apartada
            );
        }
        
        if($registro){
            echo json_encode(["success" => 1]);
        }else{
            echo json_encode(["success" => 0]);
        }
    }

    //Modificar  Productos
    if(isset($_GET['modificar_producto'])){

        $data = json_decode(file_get_contents("php://input"));
        $codigo_producto =  $data->codigo_producto;
        $nombre_producto = $data->nombre_producto;
        $contenido_neto = $data->contenido_neto;
        $estatus_producto = $data->estatus_producto;
        $is_venta = $data->is_venta;
        $precio = $data->precio;
        $tipo = $data->tipo;

        $arrayInputs = array();

        array_push($arrayInputs,$codigo_producto);
        array_push($arrayInputs,$nombre_producto);
        array_push($arrayInputs,$contenido_neto);
        array_push($arrayInputs,$tipo);
        array_push($arrayInputs,$estatus_producto);
        array_push($arrayInputs,$is_venta);
        array_push($arrayInputs,$precio);

        //Validamos los campos vacios
        if(!validarCamposVacios($arrayInputs)){
            echo json_encode(['success' => ['No debe dejar Campos Vacios','']]);
            return;
        }

        //Verificamos que el codigo de producto, precio, tipo, contenido neto, estado de venta, estatus contengan solo numeros (Positivos)
        if(!validarNumeros($codigo_producto)){
            echo json_encode(['success' => ['Formato de Código de Producto incorrecto','updateBarCode']]);
            return;
        }

        if(!validarExpresion($nombre_producto)){
            echo json_encode(['success' => ['Formato de nombre de Producto incorrecto','updateNameProduct']]);
            return;
        }
        
        if(!validarNumeros($contenido_neto)){
            echo json_encode(['success' => ['Formato de contenido neto incorrecto','update_contenidoNeto']]);
            return;
        }

        if(!validarNumeros($estatus_producto)){
            echo json_encode(['success' => ['Formato de estatus del producto incorrecto','update_estatusProducto']]);
            return;
        }

        if(!validarNumeros($is_venta)){
            echo json_encode(['success' => ['Formato de estatus de venta incorrecto','update_is_venta']]);
            return;
        }
        if(!validarNumeros($precio)){
            echo json_encode(['success' => ['Formato de precio del producto incorrecto','update_precio']]);
            return;
        }

        if(!validarNumeros($tipo)){
            echo json_encode(['success' => ['Formato de tipo incorrecto','update_tipo']]);
            return;
        }

        try{

            $data = mysqli_query($conexion,"UPDATE productos SET  
                nombre_producto = '$nombre_producto',
                contenido_neto = '$contenido_neto',
                en_Venta = '$is_venta',
                estatus = '$estatus_producto',
                precio = '$precio',
                grabado_excento = '$tipo'
                WHERE codigo_producto = '$codigo_producto' 
            ");
            echo json_encode(['success'  => 1]);
        }catch(mysqli_sql_exception $error){
            echo json_encode(["success" => ["ha ocurrido un error ".$error,]]);
        }
    } 
