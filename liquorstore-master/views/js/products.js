import { helpHttp } from './ApiFetch.js';

const d = document;

const api =  helpHttp();

export const extraer_data_productos = async (url) => {
    const data = await api.get(url);
    return data; 
}

//Mostrar lista de productos
export const show_products = (data,template,lista) => {

    //Creamos un fragment 
    const $fragment = d.createDocumentFragment();

    if(data.length > 0){

        //Recorremos el array de datos
        data.forEach(element => {
            //Insertamos valores al template
            template.querySelector('.price').textContent = `$${element.precio}`;
            template.querySelector('.name').textContent = element.nombre_producto;
            template.querySelector('.sale').textContent = 'Sale';
            template.querySelector('.div-img').style.backgroundImage = `url('views/images/${element.url_image.substring(25)}')`;
            template.querySelector('.see_product').dataset.id = element.id_producto;
            template.querySelector('.shop_product').dataset.id = element.id_producto;
            template.querySelector('.botones').dataset.id = element.id_producto;
            let $clone = template.cloneNode(true);
            //Guardamos el nodo en el fragment
            $fragment.append($clone); 
        });

        //$lista_productos_home.innerHTML = "";
        lista.append($fragment);

    }else{

        //Limpiamos la lista
        lista.innerHTML = "";
    }
}