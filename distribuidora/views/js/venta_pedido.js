/**
 *  Flujo del programa
 * 
 *  Por medio de la cedula del cliente, se busca el pedido que tenga a su nombre (El pedido debe tener el estatus por pagar ) (listo)
 * En caso de ser encontrado el pedido, se debe mostrar en pantalla los datos que incluye todos los productos relacionados con sus repectivas cantidades (listo)
 * En caso contrario debe mostrar un alerta indicando que el pedido no esta disponible o no esta registrado (listo)
 * No esta permitido agregarle mas productos al pedido una vez se este cancelando. (listo)
 * Guardar los datos de la venta (en proceso)
 * Actualizar los campos de cantidad disponible y cantidad apartada de los productos afectados de la base de datos
 * Modificar el estatus del pedido a "pagado"
 */

import { url } from "./urls.js";
import { alerta } from "./utils.js";
import { validarCamposVacios } from "./validaciones.js";

const { url_productos, url_pedido, url_ventas } = url;

const d = document,
$venta_productos_pedido = d.querySelector('#venta_productos_pedido'),
$btn_add_list = d.querySelector('#btn-add-list'),
$lista_pedido_productos = d.querySelector('#lista_pedido_productos'),
$btn_registrar_venta_pedido = d.querySelector('#btn-registrar-venta_pedido'),
$fragment_list = d.createDocumentFragment();
let data_productos;
let cliente_pedido;
const productos_seleccionados = [];

//Mostramos los productos seleccionados
const show_lista_productos = (lista_productos_seleccionados) => {

    //enlazamos el template creado en el HTML
    const $items_lista_productos = d.querySelector('#items_lista_productos').content;

    if(lista_productos_seleccionados.length > 0){

        lista_productos_seleccionados.forEach(elemento => {
            //Insertamos los datos en el template
            $items_lista_productos.querySelector('.id').dataset.id = elemento['cod_producto'];
            $items_lista_productos.querySelector('.name_producto').textContent = elemento['nombre_producto'];
            $items_lista_productos.querySelector('.cod_producto').textContent = elemento['cod_producto'];
            $items_lista_productos.querySelector('.stock').textContent = elemento['cantidad'];
            $items_lista_productos.querySelector('.price').textContent = elemento['precio'];
            $items_lista_productos.querySelector('.tipo').textContent = elemento['grabado_excento'] == 1 ? 'G' : "E";
            $items_lista_productos.querySelector('.zmdi-more').dataset.id = elemento['cod_producto'];
            //guardamos una copia de la estrutura actual del template en la variable $node
            let $clone = $items_lista_productos.cloneNode(true);
            //Guardamos el nodo en el fragment
            $fragment_list.append($clone);
        });
        
        //Limpiamos la lista
        $lista_pedido_productos.innerHTML = "";
        //Insertamos el fragment en la listas
        $lista_pedido_productos.append($fragment_list);
    }else{
        $lista_pedido_productos.innerHTML = "";
    }
}

//Preparamos los datos antes de mostrar por pantalla
const ordenar_datos = (datos_pedido) => {

    //Recuperamos los id de los productos relacionados al pedido
    let id_productos = datos_pedido.map( e => e.producto);
    
    //Recuperamos los datos de los productos relacionados a la compra por medio de los id recuperados anteriormente
    let datos_productos = [];

    data_productos.forEach((element) => {
        id_productos.forEach((e) => {
            if(element.id_producto === e){
                datos_productos.push( element);
            }
        })
    });

    //Ordenar de menor a mayor los productos utilizando el id
    data_productos = data_productos.sort((a,b) => a.id_producto - b.id_producto);
    datos_pedido = datos_pedido.sort((a,b) => a.id_producto - b.id_producto);

    //Insertamos los datos de los productos relacionados al pedido en la lista de productos seleccionados
    datos_productos.forEach((element,index) => {

        let producto_seleccionado = {
            id_producto : element.id_producto,
            cod_producto : element.codigo_producto,
            nombre_producto : element.nombre_producto,
            cantidad : datos_pedido[index]['cantidad_productos'],
            precio : element.precio,
            grabado_excento: element.grabado_excento,
        }

        productos_seleccionados.push(producto_seleccionado);

    });

    console.log(productos_seleccionados)
    //Mostramos los productos seleccionados
    show_lista_productos(productos_seleccionados)

}

//Extraemos la data de todos los productos registrados con estatus venta
const extraerDatosProductos = async (url) => {

    try {
        const res =  await fetch(`${url}?consultar_todos_productos_venta=1`);
        if(!res.ok) throw {status : res.status, statusText : res.statusText};
        const data = await res.json();
        //console.log(data)
        data_productos = data["success"]; //Guardamos los datos de los productos
    } catch (error) {
        console.log(error);
        let titulo = error.status || "Error";
        let mensaje = error.statusText || "Ocurrio un error, Contacte al Administrador";
        alerta({
            titulo,
            mensaje,
            tipo_mensaje:"error"
        });
    }
}

//Buscar datos del pedido
const buscar_datos_pedido = async(codigo_pedido,url) => {

    try {
        const res = await fetch(`${url}?extraer_datos_pedido=${codigo_pedido}`);
        if(!res.ok) throw {status : res.status, statusText : res.statusText};
        const data = await res.json();
        
        if(data['success'] == 0){
            alerta({
                titulo : "Pedido no se encuentra registrado",
                tipo_mensaje: 'warning',
            });
        }else{

            //En caso de fallar la validacion en el backend se envia un alerta
            if(typeof data['success'][0] === "string"){
                alerta({
                    titulo: "Error",
                    mensaje : data["success"][0],
                    tipo_mensaje: "error",
                });
                data['success'][1] !== '' ? d.querySelector(`#${data['success'][1]}`).parentElement.classList.add('is-invalid') : "";
                data['success'][1] !== '' ? d.querySelector(`#${data['success'][1]}`).parentElement.classList.add('is-dirty') : "" 
            }

            //En caso de que se haya encontrado el pedido
            if(Object.getPrototypeOf(data['success'][0]) === Array.prototype){
                
                //obtenemos los datos de la tabla pedido
                let data_pedido = data.success[0][0];

                //Verificamos si el pedido esta cancelado
                if(data_pedido.pagado == 1){
                    alerta({
                        titulo : "El pedido ya fue cancelado",
                        tipo_mensaje: "warning",
                    })
                }else{

                    //Recuperamos el id del cliente
                    cliente_pedido = data.success[0][0].cliente;

                    //Preparamos los datos antes mostrar por pantalla
                    ordenar_datos(data.success[1]);
                }
            }
        }
    } catch (error) {
        console.log(error);
        let titulo = error.status || "Error";
        let mensaje = error.statusText || "Ocurrio un error, Contacte al Administrador";
        alerta({
            titulo,
            mensaje,
            tipo_mensaje:"error"
        });
    }
}

//buscamos los datos de un conjunto de productos seleccionados
const buscar_productos_especificos = async (productos,url) => {

    let body = {
        method : 'POST',
        body : JSON.stringify(productos),
    }

    try {
        let res = await fetch(`${url}?consultar_datos_productos=1`,body);
        if(!res.ok) throw {status : res.status, statusText : res.statusText};
        let data = await res.json();
        return data['success'];
    } catch (error) {
        console.log(error);
        let titulo = error.status || "Error";
        let mensaje = error.statusText || "Ocurrio un error, Contacte al Administrador";
        alerta({
            titulo,
            mensaje,
            tipo_mensaje:"error"
        });
    }
}

//Comprobamos si la cantidad disponible de un producto es suficiente para satisfacer la cantidad solicitada
const comprobar_disponibilidad_producto = async (productos) => {

    let array_id_productos = productos.map(e=> e.id_producto);

    //Extraemos nuevamente los datos de los productos seleccionados, con el fin de tener lo mas actualizada posible la cantidad disponible de cada producto
    let res = await buscar_productos_especificos({data : array_id_productos},url_productos);
    let data_productos = res.map(element => element.success[0]);

    //Ordenar de menor a mayor los productos utilizando el id
    data_productos = data_productos.sort((a,b) => a.id_producto - b.id_producto);
    productos = productos.sort((a,b) => a.id_producto - b.id_producto);

    let cantidad_actualizada = [];

    productos.forEach((element, index) => {

        let nueva_cantidad= {
            id_producto : element.id_producto,
            cantidad_apartada : Number(data_productos[index].cantidad_apartada) - Number(element.cantidad),
            cantidad_disponible : Number(data_productos[index].cantidad_disponible) - Number(element.cantidad)
        };

        cantidad_actualizada.push(nueva_cantidad);

    });

    return cantidad_actualizada;
}

//Guardamos datos de la compra (Tabla compra_productos)
const save_venta_productos = async(datos,url) => {

    const body = {
        method : 'POST',
        body : JSON.stringify(datos) 
    }

    try {
        const res = await fetch(`${url}?recibir_datos_venta_pedido=1`,body);
        if(!res.ok) throw {status : res.status, statusText : res.statusText};
        const data = await res.json();
        console.log(data)
        return data;

    } catch (error) {   
        console.log(error);
        let titulo = error.status || "Error";
        let mensaje = error.statusText || "Ocurrio un error, Contacte al Administrador";
        alerta({
            titulo,
            mensaje,
            tipo_mensaje:"error"
        });
    }
}

//Modificamos el estatus del pedido
const modificar_estatus_pedido = async (codigo_pedido,url) => {

    try {
        const res = await fetch(`${url}?modificar_estatus_pedido=${codigo_pedido}`);
        if(!res.ok) throw {status : res.status, statusText : res.statusText};
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log(error);
        let titulo = error.status || "Error";
        let mensaje = error.statusText || "Ocurrio un error, Contacte al Administrador";
        alerta({
            titulo,
            mensaje,
            tipo_mensaje: "error"
        }); 
    }

}

//Guardamos las nueva cantidade disponible y cantidad apartada de los productos afectados
const saveCantidadesDisponibles = async(datos_productos,url) => {
    
    const body = {
        method : 'POST',
        body : JSON.stringify(datos_productos)
    };

    try {
        const res = await fetch(`${url}?modificar_cantidad_disponible_producto_pedido=1`,body);
        if(!res.ok) throw {status : res.status, statusText : res.statusText};
        const data = await res.json();
        if(data['success'] == 1){
            let res = await modificar_estatus_pedido(d.querySelector('#codigo_pedido').value,url_pedido);
            console.log(res);
            if(res){
                alerta({
                    titulo : "Venta ha sido registrada exitosamente",
                    tipo_mensaje : "success",
                    callback : ()=>{
                        window.location = "ventas";  
                      },
                      bool: true
                });
            }
        }else if(data['success'] == 0){
            alerta({
                titulo : "Ha ocurrido un error durante el registro",
                tipo_mensaje : "error"
            })
        }
    } catch (error) {
        console.log(error);
        let titulo = error.status || "Error";
        let mensaje = error.statusText || "Ocurrio un error, Contacte al Administrador";
        alerta({
            titulo,
            mensaje,
            tipo_mensaje: "error"
        });
    }
}

//Main
d.addEventListener('DOMContentLoaded', async e => {

    if($venta_productos_pedido !== null){
        await extraerDatosProductos(url_productos);
        
        d.addEventListener('click', async ev => {

           
            if(ev.target === $btn_add_list){
                ev.preventDefault();
                ev.stopPropagation();

                let codigo_pedido = d.querySelector('#codigo_pedido');

                //validar codigo de pedido

                //Buscamos los datos del pedido
                await buscar_datos_pedido(codigo_pedido.value,url_pedido);
            }

            if(ev.target === $btn_registrar_venta_pedido){
                
                ev.preventDefault();
                ev.stopPropagation();

                //verificamos si la lista de productos se encuentra vacia
                if(productos_seleccionados.length === 0){
                    alerta({
                        titulo : "Debe ingresar productos a la lista",
                        tipo_mensaje : "warning"
                    });
                    return;
                }

                let nueva_cantidad = await comprobar_disponibilidad_producto(productos_seleccionados);
                //Obtenemos la fecha actual
                let today = new Date();
                let fecha_actual = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;  
                
                //Registramos la venta
                let venta_registrada = await save_venta_productos(
                {
                    fecha_actual,
                    cliente : cliente_pedido,
                    productos_seleccionados
                },url_ventas);

                //actualizamos las cantidad disponible y la cantidad apartada de los productos afectados en la venta
                if(venta_registrada){
                    saveCantidadesDisponibles({datos_productos : nueva_cantidad},url_productos);
                }
            }
        });
    }
});

