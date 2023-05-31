import { url } from './urls.js';

const { get_sessiones, url_resumen_ventas } = url;

const d =  document,
$lista_visualizar_resumen_ventas = d.querySelector('#lista_visualizar_resumen_ventas'),
$fragment = d.createDocumentFragment();

const extraer_datos_venta = async (id_venta, url) => {
    try {
        const res = await fetch(`${url}?extraerDatosVenta=${id_venta}`);
        const data = await res.json();
        return data.success;
    } catch (error) {
        console.log(error);
    }
}

const extraer_id_venta = async(url) => {

    try {
        const res = await fetch(`${url}?extraer_id_resumen_venta=1`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }

}

const show_all_data_venta = (data) => {

    console.log(data)
    
    d.querySelector('#numero_factura').value = data.idVenta;
    d.querySelector('#numero_factura').parentElement.classList.add('is-dirty');
    d.querySelector('#cliente').value = data.cliente.nombre_empresa;
    d.querySelector('#cliente').parentElement.classList.add('is-dirty');
    d.querySelector('#venta').value = data.fechaVenta;
    d.querySelector('#venta').parentElement.classList.add('is-dirty');
    d.querySelector('#monto_venta').value = data.montoVenta;
    d.querySelector('#monto_venta').parentElement.classList.add('is-dirty');
    
    
    //enlazamos el template creado en el HTML
    const $template_items_productos_resumen_venta = d.querySelector('#template_items_productos_resumen_venta').content;

    if(data.productos.length > 0){

        data.productos.forEach(element => {
            //Insertamos los datos en el template
            $template_items_productos_resumen_venta.querySelector('.name_producto').textContent = element.nombre_producto;
            $template_items_productos_resumen_venta.querySelector('.cod_producto').textContent = element.id_producto;
            $template_items_productos_resumen_venta.querySelector('.stock').textContent = element.cantidad;
            $template_items_productos_resumen_venta.querySelector('.price').textContent = element.precio;
            let $node = d.importNode($template_items_productos_resumen_venta,true);
            //Guardamos el nodo en el fragment
            $fragment.append($node);
        }); 
        //Limpiamos la lista
        $lista_visualizar_resumen_ventas.innerHTML= "";
         //Insertamos el fragment en la lista
        $lista_visualizar_resumen_ventas.append($fragment);
    }else{
         //Limpiamos la lista
         $lista_visualizar_resumen_ventas.innerHTML= "";
    }
}

d.addEventListener('DOMContentLoaded', async e => {

    let id_venta = await extraer_id_venta(get_sessiones);
    let data_venta = await extraer_datos_venta(id_venta, url_resumen_ventas);
    show_all_data_venta(data_venta[0]);

})