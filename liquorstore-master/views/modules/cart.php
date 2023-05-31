<?php 
	include "header.php";
	include "nav.php";
?>

<!-- Cart -->
<section class="hero-wrap hero-wrap-2" style="background-image: url('views/images/bg_2.jpg');" data-stellar-background-ratio="0.5">
    <div class="overlay"></div>
    <div class="container">
        <div class="row no-gutters slider-text align-items-end justify-content-center">
            <div class="col-md-9 ftco-animate mb-5 text-center">
          	    <p class="breadcrumbs mb-0"><span class="mr-2"><a href="index">Home <i class="fa fa-chevron-right"></i></a></span> <span>Cart <i class="fa fa-chevron-right"></i></span></p>
                <h2 class="mb-0 bread">My Cart</h2>
            </div>
        </div>
    </div>
</section>

<section class="ftco-section">
    <div class="container">
    	<div class="row">
    		<div class="table-wrap">
				<table class="table">
					<thead class="thead-primary">
                        <tr>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th style="text-align: center;">Quantity</th>
                            <th>total</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
					<tbody id="lista_productos_cart">
                        
					</tbody>
				</table>
			</div>
    	</div>

        <div class="row justify-content-end">
            <div class="col col-lg-5 col-md-6 mt-5 cart-wrap ftco-animate">
                <div class="cart-total mb-3">
                    <h3>Cart Totals</h3>
                    <p class="d-flex">
                        <span>Subtotal</span>
                        <span class="subtotal">$20.60</span>
                    </p>
                    <p class="d-flex">
                        <span>IVA</span>
                        <span class="iva">$0.00</span>
                    </p>
                    <!-- <p class="d-flex">
                        <span>Discount</span>
                        <span>$3.00</span>
                    </p> -->
                    <hr>
                    <p class="d-flex total-price">
                        <span>Total</span>
                        <span class="monto_total">$17.60</span>
                    </p>
                </div>
                <p class="text-center"><a href="checkout" class="btn btn-primary py-3 px-4" id="checkout">Proceed to Checkout</a></p>
            </div>
        </div>

    </div>
</section>
<!-- End Cart -->

<template id="template_lista_productos_cart">
    <tr class="alert" role="alert">
        <td>
            <!-- <label class="checkbox-wrap checkbox-primary">
                <input type="checkbox" checked>
                <span class="checkmark"></span>
            </label> -->
        </td>
        <td>
            <div class="img" style="background-image: url(views/images/prod-1.jpg);"></div>
        </td>
        <td>
            <div class="email">
                <span class="name">Jim Beam Kentucky Straight</span>
                <span>Fugiat voluptates quasi nemo, ipsa perferendis</span>
            </div>
        </td>
        <td class="price">$44.99</td>
        <!-- <td class="quantity">
            <div class="input-group">
                <input type="text" name="quantity" class="quantity form-control input-number"  min=1 max=100>
            </div>
        </td> -->

        <td class="quantity">
            <div class="input-group col-md-12 d-flex mb-3">
                <span class="input-group-btn mr-2">
                    <button type="button" class="quantity-left-minus btn disminuir"  data-type="minus" data-field="">
                        <i class="fa fa-minus disminuir"></i>
                    </button>
                </span>
                <input 
                    type="text" 
                    id="quantity" 
                    name="quantity" 
                    class="quantity form-control input-number" 
                    min=1 
                    max=100
                    style="text-align: center;"
                    readonly
                >
                <span class="input-group-btn mr-2">
                    <button type="button" class="quantity-right-plus btn btn agregar" data-type="plus" data-field="">
                        <i class="fa fa-plus agregar"></i>
                    </button>
                </span>
            </div>
        </td>
        <td class="total">$89.98</td>
        <td>
            <button type="button" class="close delete" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">
                    <i class="fa fa-close delete"></i>
                </span>
            </button>
        </td>
    </tr>
</template>

<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Lanzar demo de modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Título del modal</h5>
        <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
        <button type="button" class="close cerrar" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">
                    <i class="fa fa-close cerrar"></i>
                </span>
            </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary cerrar" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary">Guardar cambios</button>
      </div>
    </div>
  </div>
</div>

<?php
	include "footer.php";
	include "loader.php";
    include "importscripts.php";
    echo '<script src="views/js/car.js" type="module"></script>';
    echo '<script src="views/js/cart.js" type="module"></script>';
?>