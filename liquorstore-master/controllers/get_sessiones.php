<?php

if(isset($_GET['comprobar_session_cliente'])){
    session_start();
    if(isset($_SESSION['session_cliente'])){
        $session_cliente = $_SESSION['session_cliente'];
        echo json_encode(['success' => $session_cliente]);
    }else{
        echo json_encode(['success' => 0]);
    }
}

if(isset($_GET['extraer_id_producto_cliente'])){
    session_start();
    if(isset($_SESSION['id_producto_cliente'])){
        $id_producto = $_SESSION['id_producto_cliente'];
        echo json_encode(['success' => $id_producto]);
    }else{
        echo json_encode(['success' => 0]);
    }
}

