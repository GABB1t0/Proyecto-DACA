<?php 

    require_once "./conexion.php";
    include "../controllers/validaciones.php";
    
    $conexion = conexion();

    /**
     * Funcion registra datos en tabla ventas de la base de datos, solo recibe como parametros la fecha actual.Retorna true en el caso de que el registro sea exitoso, en caso contrario retorna false.
    */
    function registrar_datos_tabla_venta($fecha_actual){
        global $conexion;

        try {
            $data = mysqli_query($conexion,"INSERT INTO ventas 
                (
                    fecha_venta
                )
                VALUES 
                (
                    '$fecha_actual'
                )"
            );
            return $data;
        } catch (mysqli_sql_exception $error) {
            echo json_encode(["success" => "ha ocurrido un error ".$error]);
        }
    }

    /**
     * Funcion registra datos en tabla ventas de la base de datos, solo recibe como parametros la fecha actual y cliente. Retorna true en el caso de que el registro sea exitoso, en caso contrario retorna false.
    */
    function registrar_datos_tabla_venta_pedido($fecha_actual,$cliente){
        global $conexion;

        try {
            $data = mysqli_query($conexion,"INSERT INTO ventas 
                (
                    fecha_venta,
                    cliente
                )
                VALUES 
                (
                    '$fecha_actual',
                    '$cliente'
                )"
            );
            return $data;
        } catch (mysqli_sql_exception $error) {
            echo json_encode(["success" => "ha ocurrido un error ".$error]);
        }
    }

    /**
     * Funcion retorna el id generado de la ultima venta registrada.
     */
    function recuperar_id_venta_generado(){
        global $conexion;

        try {
            $data = mysqli_query($conexion, "SELECT max(id_venta) as mayor FROM ventas");
            $data = mysqli_fetch_array($data);
            return $data;
        } catch (mysqli_sql_exception $error) {
            echo json_encode(["success" => "ha ocurrido un error ".$error]);
        }
    }

    /**
     * Funcion registra datos en tabla venta-productos de la base de datos, recibe como parametros el id de la ultima venta registrada, el producto asociado a la venta y la cantidad de dicho producto, retorna true en el caso de que el registro sea exitoso, en caso contrario retorna false.
     */
    function registrar_datos_tabla_venta_productos($id_venta,$producto,$cantidad){
        global $conexion;

        try {
            $data = mysqli_query($conexion,"INSERT INTO venta_productos 
                (
                    id_venta,
                    productos,
                    cantidad_productos
                )
                VALUES 
                (
                    '$id_venta',
                    '$producto',
                    '$cantidad'
                )"
            );
            return $data;
        } catch (mysqli_sql_exception $error) {
            echo json_encode(["success" => "ha ocurrido un error ".$error]);
        }
    }


    if(isset($_GET['recibir_datos_venta'])){
        $data = json_decode(file_get_contents('php://input'));
        $fecha_venta = $data->fecha_actual;
        $productos_seleccionados = $data->productos_seleccionados;

        //Registarmos los datos en la tabla ventas
        $registro_venta = registrar_datos_tabla_venta($fecha_venta);

        if($registro_venta){
            //Recuperamos el id generado al insertar un registro en la tabla ventas
            $id_venta = recuperar_id_venta_generado();
            
            //Registramos en la tabla ventas-productos los productos relacionados a la venta registrada en el paso anterior

            $registro_venta_productos;

            for ($i=0; $i < count($productos_seleccionados); $i++) { 
                $registro_venta_productos = registrar_datos_tabla_venta_productos($id_venta[0], $productos_seleccionados[$i]->id_producto, $productos_seleccionados[$i]->cantidad);
            }

            echo json_encode($registro_venta_productos);
        }
        
    }

    if(isset($_GET['recibir_datos_venta_pedido'])){
        $data = json_decode(file_get_contents('php://input'));
        $fecha_venta = $data->fecha_actual;
        $cliente = $data->cliente;
        $productos_seleccionados = $data->productos_seleccionados;

        //Registarmos los datos en la tabla ventas
        $registro_venta = registrar_datos_tabla_venta_pedido($fecha_venta,$cliente);

        if($registro_venta){
            //Recuperamos el id generado al insertar un registro en la tabla ventas
            $id_venta = recuperar_id_venta_generado();
            
            //Registramos en la tabla ventas-productos los productos relacionados a la venta registrada en el paso anterior

            $registro_venta_productos;

            for ($i=0; $i < count($productos_seleccionados); $i++) { 
                $registro_venta_productos = registrar_datos_tabla_venta_productos($id_venta[0], $productos_seleccionados[$i]->id_producto, $productos_seleccionados[$i]->cantidad);
            }

            echo json_encode($registro_venta_productos);
        }
        
    }