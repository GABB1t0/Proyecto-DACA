<?php 
	include "header.php";
	include "nav.php";
?>


<!-- Checkout -->
<section class="hero-wrap hero-wrap-2" style="background-image: url('views/images/bg_2.jpg');" data-stellar-background-ratio="0.5">
    <div class="overlay"></div>
    <div class="container">
        <div class="row no-gutters slider-text align-items-end justify-content-center">
            <div class="col-md-9 ftco-animate mb-5 text-center">
                <p class="breadcrumbs mb-0"><span class="mr-2"><a href="index">Home <i class="fa fa-chevron-right"></i></a></span> <span>Checkout <i class="fa fa-chevron-right"></i></span></p>
                <h2 class="mb-0 bread">Checkout</h2>
            </div>
        </div>
    </div>
</section>

<section class="ftco-section">
    <div class="container">
    	<div class="row justify-content-center">
            <div class="col-xl-10 ftco-animate">
                
            <!-- Tabla de productos -->
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
                            <th>IVA</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
					<tbody id="lista_productos_checkout">
                        
					</tbody>
				</table>
			</div>
                

                <div class="row mt-5 pt-3 d-flex">
                    <div class="col-md-6 d-flex">
                        <div class="cart-detail cart-total p-3 p-md-4">
                            <h3 class="billing-heading mb-4">Cart Total</h3>
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
                    </div>

                    <div class="col-md-6">
                        <div class="cart-detail p-3 p-md-4">
                            <h3 class="billing-heading mb-4">Métodos de Pago</h3>
                            <div class="form-group">
                                <div class="col-md-12">
                                    <div class="radio">
                                        <label><input type="radio" name="optradio" class="mr-2"> Transferencia Bancaria</label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-12">
                                    <div class="radio">
                                        <label><input type="radio" name="optradio" class="mr-2"> 
                                        Pago Movil</label>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="form-group">
                                <div class="col-md-12">
                                    <div class="radio">
                                        <label><input type="radio" name="optradio" class="mr-2"> Paypal</label>
                                    </div>
                                </div>
                            </div> -->
                            <div class="form-group">
                                <div class="col-md-12">
                                    <div class="checkbox">
                                        <label><input type="checkbox" value="" class="mr-2" name="terminos"> I have read and accept the terms and conditions</label>
                                    </div>
                                </div>
                            </div>
                            <p><a href="#"class="btn btn-primary py-3 px-4" id="registrar_pedido">Place an order</a></p>
                        </div>
                    </div>
	            </div>
            </div> <!-- .col-md-8 -->
        </div>
    </div>
 </section>
 <!-- END Checkout -->

 <template id="template_lista_productos_checkout">
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
        <td class="quantity">
            <div class="input-group">
                <input 
                    type="text" 
                    name="quantity" 
                    class="quantity form-control input-number" 
                    min=1 
                    max=100
                    readonly
                    style="text-align: center;"
                >
            </div>
        </td>

        <!-- <td class="quantity">
            <div class="input-group col-md-12 d-flex mb-3">
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
            </div>
        </td> -->
        <td class="total">$89.98</td>
        <td class="table-iva">$89.98</td>
    </tr>
</template>


 <?php
	include "footer.php";
	include "loader.php";
    include "importscripts.php";
    echo '<script src="views/js/car.js" type="module"></script>';
    echo '<script src="views/js/checkout.js" type="module"></script>';
?>