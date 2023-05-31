<?php 

    //CERRAR SESION DE USUARIO CLIENTE
    if(isset($_GET['cerrarSesion'])){
        session_start();
        if(isset($_SESSION['session_cliente'])){
            session_destroy();
            echo json_encode(["success" => "Session borrada exitosamente"]);
        }
    }