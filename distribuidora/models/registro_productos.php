<?php

    require_once "conexion.php";
    include "../controllers/validaciones.php";

    $conexion = conexion();

    // Obtener los datos del formulario
    $codigo_producto = $_POST['BarCode'];
    $nombre_producto = $_POST['NameProduct'];
    $imagen = $_FILES['imagen_producto'];
    $contenido_neto = $_POST['contenidoNeto'];
    $estatus_producto = $_POST['estatusProducto'];
    $tipo = $_POST['tipo'];

    $arrayInputs = array();

    array_push($arrayInputs,$codigo_producto);
    array_push($arrayInputs,$nombre_producto);
    array_push($arrayInputs,$contenido_neto);
    array_push($arrayInputs,$tipo);
    array_push($arrayInputs,$estatus_producto);
                  

    //Validamos los campos vacios
    if(!validarCamposVacios($arrayInputs)){
        echo json_encode(['success' => ['No debe dejar Campos Vacios','']]);
        return;
    }

    //Verificamos que el codigo de producto, precio, tipo, categoria contengan solo numeros (Positivos)
    if(!validarNumeros($codigo_producto)){
        echo json_encode(['success' => ['Formato de Código de Producto incorrecto','BarCode']]);
        return;
    }

    if(!validarExpresion($nombre_producto)){
        echo json_encode(['success' => ['Formato de nombre de Producto incorrecto','NameProduct']]);
        return;
    }
    
    if(!validarNumeros($contenido_neto)){
        echo json_encode(['success' => ['Formato de contenido neto incorrecto','contenidoNeto']]);
        return;
    }

    if(!validarNumeros($tipo)){
        echo json_encode(['success' => ['Formato de tipo incorrecto','tipo']]);
        return;
    }

    if(!validarNumeros($estatus_producto)){
        echo json_encode(['success' => ['Formato de estatus del producto incorrecto','estatusProducto']]);
        return;
    }

    //PROCESAMOS LA IMAGEN
    $imagen_temporal = $_FILES['imagen_producto']['tmp_name'];
    $nombre_imagen = $_FILES['imagen_producto']['name'];
    $ruta_destino = '../views/assets/img-temp/'. $nombre_imagen;

    $imagen_guardada = move_uploaded_file($imagen_temporal, $ruta_destino);
      
    //verificamos que la imagen se guardo en la carpeta de imagenes temporales
    if(!$imagen_guardada){
        echo json_encode(['success' => ['Imagen no se pudo subir correctamente al servidor','']]);
        return;
    }

    //Guardamos los datos en la base de datos
    try{

        $data = mysqli_query($conexion,"INSERT INTO productos 
        (
            codigo_producto,
            nombre_producto,
            contenido_neto,
            estatus,
            grabado_excento,
            url_image,
            categoria,
            descripcion_producto
        )
        VALUES 
        (
            '$codigo_producto',
            '$nombre_producto',
            '$contenido_neto',
            '$estatus_producto',
            '$tipo',
            '$ruta_destino',
            '1',
            'Excelente licor'
        )"
        );
        echo json_encode(['success'  => 1]);
    }catch(mysqli_sql_exception $error){
        echo json_encode(["success" => "ha ocurrido un error ".$error]);
    }
?>