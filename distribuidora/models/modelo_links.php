<?php

    Class Modelo_links{

        public function modelo_links($links){
            $module = null;

            if($links === "home" || 
                $links === "registrar_administrador" ||
                $links === "lista_administradores" ||
                $links === "update_administrador" ||
                $links === "registrar_productos" ||
                $links === "lista_productos" ||
                $links === "lista_productos_venta" ||
                $links === "update_productos" ||
                $links === "compra" ||
                $links === "compra_productos" ||
                $links === "lista_compra_disponible" ||
                $links === "lista_compra_total" ||
                $links === "visualizar_compra" || 
                $links === "modificar_compra" ||
                $links === "modificar_compra_productos" ||
                $links === "inventario" ||
                $links === "lista_cliente" ||
                $links === "visualizar_cliente" ||
                $links === "ventas" ||
                $links === "venta_pedido" ||
                $links === "verificar_usuario" ||
                $links === "preguntas_seguridad" ||
                $links === "modificar_contrasenia_usuario" ||
                $links === "resumen_ventas" ||
                $links === "visualizar_resumen_venta"){

                $module = "views/modules/".$links.".php";

            }else if($links === "index" ){
               
                $module = "views/modules/login.php";

            }else{
                // session_start();
                // if(isset($_SESSION['user_admin'])){
                //     $module = "views/modules/main.php";
                // }else{
                //     $module = "views/modules/login.php";
                // }
                $module = "views/modules/login.php";
            }

            return $module;
            
        }
        
    }