<?php

    Class Modelo_links{

        public function modelo_links($links){
            $module = null;

            if($links === "main" ||
                $links === "products" ||
                $links === "products_single" ||
                $links === "cart" ||
                $links === "checkout" ||
                $links === "blog" ||
                $links === "blog_single" ||
                $links === "contact" ||
                $links === "about" ||
                $links === "login" ||
                $links === "registrar_usuario"){

                $module = "views/modules/".$links.".php";

            }else if($links === "index" ){
               
                $module = "views/modules/main.php";

            }else{
                $module = "views/modules/main.php";
            }

            return $module;
            
        }
        
    }