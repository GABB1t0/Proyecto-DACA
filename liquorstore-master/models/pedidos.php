<?php 

    require_once "./conexion.php";
    include "../controllers/validaciones.php";
    $conexion = conexion();

    //Registrar datos en la tabla pedidos
    function registrar_pedido($id_cliente,$fecha_pedido,){
        global $conexion;

        try{
            $data = mysqli_query($conexion,"INSERT INTO pedido 
                (
                    cliente,
                    fecha_pedido,
                    pagado
                )
            VALUES 
                (
                    '$id_cliente',
                    '$fecha_pedido',
                    '2'
                )"
            );
    
            return $data;

        }catch(mysqli_sql_exception $error){
            echo json_encode(["success" => "ha ocurrido un error ".$error]);
        }
    }

    //Registrar datos tabla pedidos_productos
    function registrar_pedido_productos($id_pedido,$id_producto,$cantidad){
        global $conexion;

        try{
            $data = mysqli_query($conexion,"INSERT INTO pedido_productos
                (
                    id_pedido,
                    producto,
                    cantidad_productos
                )
            VALUES 
                (
                    '$id_pedido',
                    '$id_producto',
                    '$cantidad'
                )"
            );
    
            return $data;

        }catch(mysqli_sql_exception $error){
            echo json_encode(["success" => "ha ocurrido un error ".$error]);
        }
    }

    //Obtener el id del pedido del ultimo pedido registrado por un cliente especifico
    function obtener_id_pedido($id_cliente){
        global $conexion;

        try {
            $datos = mysqli_query($conexion, "SELECT *
                FROM pedido
                WHERE cliente = '$id_cliente'
                ORDER BY id_pedido DESC
                LIMIT 1;");

            if(mysqli_num_rows($datos) > 0){
                $datos = mysqli_fetch_all($datos,MYSQLI_ASSOC);
                return $datos[0];
                exit();
            }else{
                return 0;
            }
        } catch (mysqli_sql_exception $error) {
            echo json_encode(["success" => "ha ocurrido un error ".$error]);
        }
    }

    if(isset($_GET['registrar_pedido'])){

        $data = json_decode(file_get_contents('php://input'));

        $cliente = $data->id_cliente;
        $fecha_pedido = $data->fecha_actual;
        $carrito = $data->data_carrito;

        //Registramos el pedido
        $is_pedido_registrado = registrar_pedido($cliente,$fecha_pedido);

        //Verificamos que se completo el registro
        if($is_pedido_registrado){

            //Obtenemos el id del pedido registrado
            $id_pedido = obtener_id_pedido($cliente);

            $is_registrado = false;

            for ($i=0; $i < count($carrito) ; $i++) { 
                
                $is_registrado = registrar_pedido_productos(
                    $id_pedido['id_pedido'],
                    $carrito[$i]->id_producto,
                    $carrito[$i]->cantidad,
                );

                //Detenemos el proceso, si ocurrio un fallo durante el registro anterior 
                if(!$is_registrado){
                    break;
                }
            }

            if($is_registrado){
                echo json_encode(['success' => 1]);
            }

        }else{
            echo json_encode(['success' => 0]);
        }
    }