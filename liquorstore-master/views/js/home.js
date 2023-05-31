import { extraer_data_productos, show_products } from "./products.js";
import { functions_car } from "./car.js";
import { helpHttp } from "./ApiFetch.js";
import { url } from "./urls.js";

const { url_productos, sessiones } = url; 

console.log(url_productos);

const d = document,
$lista_productos_home = d.querySelector('#lista_productos_home');

const apiFetch = helpHttp();

d.addEventListener('click', async e => {

    if(e.target.classList.contains('see_product')){
        e.preventDefault();
        
        //Crear variable de session para guardar el id del producto
        const resApi = await apiFetch.get(`${sessiones}?ver_producto=${e.target.parentElement.dataset.id}`); 

        if(resApi.success !== ""){
            window.location = 'products_single';
        }
    }

    if(e.target.classList.contains('shop_product')){
        e.preventDefault();

        functions_car.addCar(e.target.parentElement.dataset.id);
    }
});

d.addEventListener('DOMContentLoaded',  async e => {

    const data_products =  await extraer_data_productos(`${url_productos}?consultar_todos_productos_venta=1`);
    
    //Enlazamos el template HTML
    const template_productos = d.querySelector('#template_productos_home').content;

    //Mostramos los productos por pantalla
    show_products(data_products.success,template_productos,$lista_productos_home);
       
})