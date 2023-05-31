<?php

    require_once "conexion.php";
    $conexion = conexion();

    class ObjetoVenta {

        public $idVenta;
        public $fechaVenta;
        public $montoVenta;
        public $cliente;
        public $productos = Array();
    
        public function __construct($idVenta, $fechaVenta, $montoVenta, $cliente, $productos)
        {
            $this->idVenta = $idVenta;
            $this->fechaVenta = $fechaVenta;
            $this->montoVenta = $montoVenta;
            $this->cliente = $cliente;
            array_push($this->productos, $productos);
        }
        public function getIdVenta()
        {
            return $this->idVenta;
        }
    
        public function getFechaVenta()
        {
            return $this->fechaVenta;
        }
    
        public function getMontoVenta()
        {
            return $this->montoVenta;
        }
    
        public function getCliente()
        {
            return $this->cliente;
        }
    
        public function getProductos()
        {
            return $this->productos;
        }

        public function addProduct($product){
            array_push($this->productos, $product);
        }
    }

    class Producto {
        
        public $cantidad;
        public $id_producto;
        public $nombre_producto;
        public $contenido_neto;
        public $precio;
    
        function __construct($cantidad, $id_producto,$nombre_producto,$contenido_neto,$precio)
        {
            $this->cantidad = $cantidad;
            $this->id_producto = $id_producto;
            $this->nombre_producto = $nombre_producto;
            $this->contenido_neto = $contenido_neto;
            $this->precio = $precio;
        }
    
        public function getCantidad()
        {
            return $this->cantidad;
        }
    
        public function getIdProducto()
        {
            return $this->id_producto;
        }

        public function getNombreProducto()
        {
            return $this->nombre_producto;
        }
    
        public function getContenidoNeto()
        {
            return $this->contenido_neto;
        }

        public function getPrecio()
        {
            return $this->precio;
        }
    }

    class Cliente{
        public $nombre_empresa;
        public $rif;
        public $usuario_cliente;


        function __construct($nombre_empresa,$rif,$usuario_cliente){
            $this->nombre_empresa = $nombre_empresa;
            $this->rif = $rif;
            $this->usuario_cliente = $usuario_cliente;
        }

        public function getNombreEmpresa()
        {
            return $this->nombre_empresa;
        }
    
        public function getRif()
        {
            return $this->rif;
        }

        public function getUsuarioCliente()
        {
            return $this->usuario_cliente;
        }
        

    }
    
    //Extraer datos de la venta por medio de la fecha
    function extraerDataVentas($fecha){
        global $conexion;

        try{

            $data = mysqli_query($conexion,"SELECT 
            ventas.id_venta, 
            rif,
            nombre_empresa,
            usuario_cliente, 
            precio_total_venta, 
            fecha_venta, 
            precio,
            nombre_producto,
            codigo_producto,
            contenido_neto,  
            cantidad_productos
            FROM ventas inner join venta_productos 
            on ventas.id_venta = venta_productos.id_venta
            inner join cliente
            on ventas.cliente = cliente.id_cliente
            inner join productos
            on venta_productos.productos = productos.id_producto
            WHERE fecha_venta = '$fecha'
            ORDER BY ventas.id_venta");

            if(mysqli_num_rows($data) > 0){
                $data = mysqli_fetch_all($data,MYSQLI_ASSOC);
                return $data;
                exit();
            }else{
                return [];
            }

        }catch(mysqli_sql_exception $error){
            echo json_encode(["error" => "Ha ocurrido un error durante la busqueda".$error]);
        } 

    }

    //Extraer datos de una venta especifica
    function extraerDataVenta($id_venta){
        global $conexion;

        try{

            $data = mysqli_query($conexion,"SELECT 
            ventas.id_venta, 
            rif,
            nombre_empresa,
            usuario_cliente, 
            precio_total_venta, 
            fecha_venta, 
            precio,
            nombre_producto,
            codigo_producto,
            contenido_neto,  
            cantidad_productos
            FROM ventas inner join venta_productos 
            on ventas.id_venta = venta_productos.id_venta
            inner join cliente
            on ventas.cliente = cliente.id_cliente
            inner join productos
            on venta_productos.productos = productos.id_producto
            WHERE ventas.id_venta = $id_venta
            ORDER BY ventas.id_venta");

            if(mysqli_num_rows($data) > 0){
                $data = mysqli_fetch_all($data,MYSQLI_ASSOC);
                return $data;
                exit();
            }else{
                return [];
            }

        }catch(mysqli_sql_exception $error){
            echo json_encode(["error" => "Ha ocurrido un error durante la busqueda".$error]);
        } 

    }

    function buscarObjetoPorPropiedad($array, $propiedad, $valor) {
        foreach ($array as $indice => $objeto) {
            if ($objeto->$propiedad === $valor) {
                return $indice;
            }
        }
        return false; // Si no se encuentra el objeto en el array
    }

    //Extraer datos de las ventas realizadas en una fecha especifica
    if(isset($_GET['extraerVentas'])){

        $fecha_ventas = $_GET['extraerVentas'];

        //Validar fecha
        //fuction validarFecha 

        //Extraemos los datos de las ventas que se realizaron en un fecha especifica
        $dataVentas = extraerDataVentas($fecha_ventas);

        $arrayObjetos = Array();

        for ($i=0; $i < count($dataVentas) ; $i++) { 
        
            //Verificamos si el arrayObjetos esta vacio
            if(count($arrayObjetos) === 0){
               
                // //CREAMOS UNA INSTANCIA DE LA CLASE PRODUCTOS Y PASAMOS VALORES
                $productos = new Producto(
                    $dataVentas[$i]['cantidad_productos'],
                    $dataVentas[$i]['codigo_producto'],
                    $dataVentas[$i]['nombre_producto'],
                    $dataVentas[$i]['contenido_neto'],
                    $dataVentas[$i]['precio']
                );

                    //CREAMOS UNA INSTANCIA DE LA CLASE CLIENTE Y PASAMOS VALORES

                $cliente = new Cliente(
                    $dataVentas[$i]['nombre_empresa'],
                    $dataVentas[$i]['rif'],
                    $dataVentas[$i]['usuario_cliente'],
                );
                    
                // //CREAMOS UNA INSTANCIA DE LA CLASE OBJETOVENTAS Y PASAMOS VALORES
                    
                $objeto = new ObjetoVenta(
                    $dataVentas[$i]['id_venta'],
                    $dataVentas[$i]['fecha_venta'],
                    $dataVentas[$i]['precio_total_venta'],
                    $cliente,
                    $productos
                );

                // //AGREGAMOS EL OBJETO AL ARRAYOBJETOS
                array_push($arrayObjetos,$objeto);

            }else{
                
                //Obtenemos el id de venta actual
                $id_venta_current = $dataVentas[$i]['id_venta'];
                
                //Buscamos un objeto dentro del array 'arrayObjetos' que tenga en su propiedad idVenta el mismo valor que el id_venta_current
                $encontrado = array_filter($arrayObjetos, function($objeto) use ($id_venta_current){
                    if($objeto->getIdVenta() === $id_venta_current){
                        return $objeto;
                    }
                });

                //Verificamos si hubo coincidencia
                if(!empty($encontrado)){

                    //CREAMOS UNA INSTANCIA DE LA CLASE PRODUCTOS Y PASAMOS VALORES
                    $productos = new Producto(
                        $dataVentas[$i]['cantidad_productos'],
                        $dataVentas[$i]['codigo_producto'],
                        $dataVentas[$i]['nombre_producto'],
                        $dataVentas[$i]['contenido_neto'],
                        $dataVentas[$i]['precio']
                    );

                    //Buscamos el indice del objeto que encontramos en el array 'arrayObjetos'
                    $indice = buscarObjetoPorPropiedad($arrayObjetos,'idVenta',$id_venta_current);

                    //Agregamos los nuevos productos a la propiedad productos del objeto 
                    $arrayObjetos[$indice]->addProduct($productos);

                }else{

                    //En el caso de que no existen el array 'arrayObjetos' un item con la propiedad idVenta con el mismo valor que el id_venta actual, creamos un nuevo objeto y lo insertamos al array

                    //CREAMOS UNA INSTANCIA DE LA CLASE PRODUCTOS Y PASAMOS VALORES
                    $productos = new Producto(
                        $dataVentas[$i]['cantidad_productos'],
                        $dataVentas[$i]['codigo_producto'],
                        $dataVentas[$i]['nombre_producto'],
                        $dataVentas[$i]['contenido_neto'],
                        $dataVentas[$i]['precio']
                    );
                        
                    //CREAMOS UNA INSTANCIA DE LA CLASE CLIENTE Y PASAMOS VALORES
                    $cliente = new Cliente(
                        $dataVentas[$i]['nombre_empresa'],
                        $dataVentas[$i]['rif'],
                        $dataVentas[$i]['usuario_cliente'],
                    );
                        
                    // //CREAMOS UNA INSTANCIA DE LA CLASE OBJETOVENTAS Y PASAMOS VALORES  
                    $objeto = new ObjetoVenta(
                        $dataVentas[$i]['id_venta'],
                        $dataVentas[$i]['fecha_venta'],
                        $dataVentas[$i]['precio_total_venta'],
                        $cliente,
                        $productos
                    );

                    // //AGREGAMOS EL OBJETO AL ARRAYOBJETOS
                    array_push($arrayObjetos,$objeto);
                }
            }
        }

        echo json_encode(['success' => $arrayObjetos]);
    }
    
    //Extraer datos de una venta especifica
    if(isset($_GET['extraerDatosVenta'])){

        $id_venta = $_GET['extraerDatosVenta'];

        //Extraemos los datos de una venta especifica
        $dataVentas = extraerDataVenta($id_venta);

        $arrayObjetos = Array();

        for ($i=0; $i < count($dataVentas) ; $i++) { 
        
            //Verificamos si el arrayObjetos esta vacio
            if(count($arrayObjetos) === 0){
               
                // //CREAMOS UNA INSTANCIA DE LA CLASE PRODUCTOS Y PASAMOS VALORES
                $productos = new Producto(
                    $dataVentas[$i]['cantidad_productos'],
                    $dataVentas[$i]['codigo_producto'],
                    $dataVentas[$i]['nombre_producto'],
                    $dataVentas[$i]['contenido_neto'],
                    $dataVentas[$i]['precio']
                );

                    //CREAMOS UNA INSTANCIA DE LA CLASE CLIENTE Y PASAMOS VALORES

                $cliente = new Cliente(
                    $dataVentas[$i]['nombre_empresa'],
                    $dataVentas[$i]['rif'],
                    $dataVentas[$i]['usuario_cliente'],
                );
                    
                // //CREAMOS UNA INSTANCIA DE LA CLASE OBJETOVENTAS Y PASAMOS VALORES
                    
                $objeto = new ObjetoVenta(
                    $dataVentas[$i]['id_venta'],
                    $dataVentas[$i]['fecha_venta'],
                    $dataVentas[$i]['precio_total_venta'],
                    $cliente,
                    $productos
                );

                // //AGREGAMOS EL OBJETO AL ARRAYOBJETOS
                array_push($arrayObjetos,$objeto);

            }else{
                
                //Obtenemos el id de venta actual
                $id_venta_current = $dataVentas[$i]['id_venta'];
                
                //Buscamos un objeto dentro del array 'arrayObjetos' que tenga en su propiedad idVenta el mismo valor que el id_venta_current
                $encontrado = array_filter($arrayObjetos, function($objeto) use ($id_venta_current){
                    if($objeto->getIdVenta() === $id_venta_current){
                        return $objeto;
                    }
                });

                //Verificamos si hubo coincidencia
                if(!empty($encontrado)){

                    //CREAMOS UNA INSTANCIA DE LA CLASE PRODUCTOS Y PASAMOS VALORES
                    $productos = new Producto(
                        $dataVentas[$i]['cantidad_productos'],
                        $dataVentas[$i]['codigo_producto'],
                        $dataVentas[$i]['nombre_producto'],
                        $dataVentas[$i]['contenido_neto'],
                        $dataVentas[$i]['precio']
                    );

                    //Buscamos el indice del objeto que encontramos en el array 'arrayObjetos'
                    $indice = buscarObjetoPorPropiedad($arrayObjetos,'idVenta',$id_venta_current);

                    //Agregamos los nuevos productos a la propiedad productos del objeto 
                    $arrayObjetos[$indice]->addProduct($productos);

                }else{

                    //En el caso de que no existen el array 'arrayObjetos' un item con la propiedad idVenta con el mismo valor que el id_venta actual, creamos un nuevo objeto y lo insertamos al array

                    //CREAMOS UNA INSTANCIA DE LA CLASE PRODUCTOS Y PASAMOS VALORES
                    $productos = new Producto(
                        $dataVentas[$i]['cantidad_productos'],
                        $dataVentas[$i]['codigo_producto'],
                        $dataVentas[$i]['nombre_producto'],
                        $dataVentas[$i]['contenido_neto'],
                        $dataVentas[$i]['precio']
                    );
                        
                    //CREAMOS UNA INSTANCIA DE LA CLASE CLIENTE Y PASAMOS VALORES
                    $cliente = new Cliente(
                        $dataVentas[$i]['nombre_empresa'],
                        $dataVentas[$i]['rif'],
                        $dataVentas[$i]['usuario_cliente'],
                    );
                        
                    // //CREAMOS UNA INSTANCIA DE LA CLASE OBJETOVENTAS Y PASAMOS VALORES  
                    $objeto = new ObjetoVenta(
                        $dataVentas[$i]['id_venta'],
                        $dataVentas[$i]['fecha_venta'],
                        $dataVentas[$i]['precio_total_venta'],
                        $cliente,
                        $productos
                    );

                    // //AGREGAMOS EL OBJETO AL ARRAYOBJETOS
                    array_push($arrayObjetos,$objeto);
                }
            }
        }

        echo json_encode(['success' => $arrayObjetos]);

    }

    

