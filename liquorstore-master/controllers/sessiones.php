<?php

    if(isset($_GET['ver_producto'])){
        session_start();
        $_SESSION['id_producto_cliente'] = $_GET['ver_producto'];
        echo json_encode(["success" => "variable de sesion creada = ".$_SESSION['id_producto_cliente']]);  
    }