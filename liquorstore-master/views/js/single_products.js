import { url } from "./urls.js";
import { extraerDatosLocalStorage, crearItemLocalStorage, actualizarItemLocalStorage, buscarCoincidencia } from "./car.js";
import { helpHttp } from "./ApiFetch.js";
import { extraer_data_productos } from "./products.js";
import { parseToDoubleWithTwoDecimals } from "./utils.js";

const { get_sessiones, url_productos } = url;

const d = document,
$container_single_product = d.querySelector('#container_single_product'),
$fragment = d.createDocumentFragment(),
$container_product_single = d.querySelector('#container_product_single'),
$add_cart = d.querySelector('#add_cart'),
$quantity = d.querySelector('#quantity');

let id_producto;

const apiFetch = helpHttp();

$add_cart.addEventListener('click', e => {

  e.preventDefault();

  //Creamos prototipo objeto producto
  const producto = {
    id_producto : id_producto ,
    cantidad: Number($quantity.value),
  }

  //Primero verificamos que exista un item en el localStorage
  let ItemLocalstorage = extraerDatosLocalStorage('carrito');

  if(ItemLocalstorage !== false){ //Si existe, verificamos si el producto esta en el carrito

    //Verificamos si el producto ya se encuentra en el carrito
    let encontrado = buscarCoincidencia(ItemLocalstorage,id_producto);
      
    if(!encontrado){//Si no se encuentra, añadimos el producto con la cantidad seleccionada por el usuario
      
      ItemLocalstorage.push(producto);

      //Actualizamos el localStorage
      actualizarItemLocalStorage('carrito',ItemLocalstorage);

    }else{ //Si existe, actualizamos la cantidad del producto sumando la cantidad previa del producto con la cantidad proporcionada por el usuario
      
      //Obtenemos la data del producto a modificar
      let producto = ItemLocalstorage.filter(e => e.id_producto == id_producto);

      //Modificamos la cantidad
      producto[0].cantidad = Number(producto[0].cantidad) + Number($quantity.value);

      //Quitamos del array los datos desactualizados del producto
      let newData = ItemLocalstorage.filter(e => e.id_producto != id_producto);

      //Agregamos la data actualizada
      newData.push(producto[0]);

      //Actualizamos el localStorage
      actualizarItemLocalStorage('carrito',newData);

    }

  }else{ //Si no existe lo creamos, y añadimos el producto con la cantidad seleccionada por el usuario

    //Creamos array carrito
    const  car = [];

    //Agregamos el objeto producto al carrito
    car.push(producto);

    //Creamos el item en el localStorage
    crearItemLocalStorage('carrito', car);
  }

});

d.addEventListener('click', e => {

  //Aumentamos la cantidad de productos
  if(e.target.classList.contains('agregar')){
    e.preventDefault();
    $quantity.value = Number($quantity.value) + 1;
  }

  //Disminuimos la cantidad de productos
  if(e.target.classList.contains('disminuir')){
    e.preventDefault();

    if(Number($quantity.value) > 0){
      $quantity.value = Number($quantity.value) - 1;
    }
  }

});

const obtener_variable_session_producto = async (url) => {
    let resApi = await apiFetch.get(url);
    return resApi.success;
}

//Mostrar la informacion del producto
const show_data_product = (data) =>{
    $container_product_single.querySelector('.name').textContent = data.nombre_producto;
    $container_product_single.querySelector('.name_description').textContent = data.nombre_producto;
    d.querySelector('.container_single').querySelector('.producto_elegido').textContent = data.nombre_producto;
    $container_product_single.querySelector('.enlace').href = `views/images/${data.url_image.substring(25)}`;
    $container_product_single.querySelector('.img_product').src =  `views/images/${data.url_image.substring(25)}`;
    $container_product_single.querySelector('.span_price').textContent = `$${parseToDoubleWithTwoDecimals(Number(data.precio))}`;
    $container_product_single.querySelector('.amount_available').textContent = data.cantidad_disponible === null ? '0 Unidades disponibles' : `${data.cantidad_disponible} Unidades disponibles`;
}

d.addEventListener('DOMContentLoaded', async e => {

  id_producto = await obtener_variable_session_producto(`${get_sessiones}?extraer_id_producto_cliente=1`);

  console.log(id_producto);
  const data_product = await extraer_data_productos(`${url_productos}?consultar_producto=${id_producto}`);

  $quantity.value = 1;

  show_data_product(data_product.success[0]);
    
});