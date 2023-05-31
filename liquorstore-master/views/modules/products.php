<?php 
	include "header.php";
	include "nav.php";
?>

<!-- Products -->
<section class="hero-wrap hero-wrap-2" style="background-image: url('views/images/bg_2.jpg');" data-stellar-background-ratio="0.5">
    <div class="overlay"></div>
    <div class="container">
        <div class="row no-gutters slider-text align-items-end justify-content-center">
            <div class="col-md-9 ftco-animate mb-5 text-center">
                <p class="breadcrumbs mb-0"><span class="mr-2"><a href="main">Home <i class="fa fa-chevron-right"></i></a></span> <span>Products <i class="fa fa-chevron-right"></i></span></p>
                <h2 class="mb-0 bread">Products</h2>
            </div>
        </div>
    </div>
</section>

<section class="ftco-section">
	<div class="container">
		<div class="row">
			
        <div class="col-md-9">
				<!-- <div class="row mb-4">
					<div class="col-md-12 d-flex justify-content-between align-items-center">
						<h4 class="product-select">Select Types of Products</h4>
						<select class="selectpicker" multiple>
                            <option>Brandy</option>
                            <option>Gin</option>
                            <option>Rum</option>
                            <option>Tequila</option>
                            <option>Vodka</option>
                            <option>Whiskey</option>
				        </select>
					</div>
				</div> -->
				
                <div class="row" id="lista_productos_all_products">
					
				</div>
						
                <div class="row mt-5">
		            <div class="col text-center">
		                <div class="block-27">
		                    <ul>
                                <li><a href="#">&lt;</a></li>
                                <li class="active"><span>1</span></li>
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                                <li><a href="#">4</a></li>
                                <li><a href="#">5</a></li>
                                <li><a href="#">&gt;</a></li>
		                    </ul>
		                </div>
		            </div>
		        </div>

			</div>

			<div class="col-md-3">
				<div class="sidebar-box ftco-animate">
                    <div class="categories">
                        <h3>Product Types</h3>
                        <ul class="p-0">
                            <li><a href="#">Brandy <span class="fa fa-chevron-right"></span></a></li>
                            <li><a href="#">Gin <span class="fa fa-chevron-right"></span></a></li>
                            <li><a href="#">Rum <span class="fa fa-chevron-right"></span></a></li>
                            <li><a href="#">Tequila <span class="fa fa-chevron-right"></span></a></li>
                            <li><a href="#">Vodka <span class="fa fa-chevron-right"></span></a></li>
                            <li><a href="#">Whiskey <span class="fa fa-chevron-right"></span></a></li>
                        </ul>
                    </div>
                </div>

                <div class="sidebar-box ftco-animate">
                    <h3>Recent Blog</h3>
                    <div class="block-21 mb-4 d-flex">
                        <a class="blog-img mr-4" style="background-image: url(views/images/image_1.jpg);"></a>
                        <div class="text">
                            <h3 class="heading"><a href="#">Even the all-powerful Pointing has no control about the blind texts</a></h3>
                            <div class="meta">
                                <div><a href="#"><span class="fa fa-calendar"></span> Apr. 18, 2020</a></div>
                                <div><a href="#"><span class="fa fa-comment"></span> 19</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="block-21 mb-4 d-flex">
                        <a class="blog-img mr-4" style="background-image: url(views/images/image_2.jpg);"></a>
                        <div class="text">
                            <h3 class="heading"><a href="#">Even the all-powerful Pointing has no control about the blind texts</a></h3>
                            <div class="meta">
                                <div><a href="#"><span class="fa fa-calendar"></span> Apr. 18, 2020</a></div>
                                <div><a href="#"><span class="fa fa-comment"></span> 19</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="block-21 mb-4 d-flex">
                        <a class="blog-img mr-4" style="background-image: url(views/images/image_3.jpg);"></a>
                        <div class="text">
                            <h3 class="heading"><a href="#">Even the all-powerful Pointing has no control about the blind texts</a></h3>
                            <div class="meta">
                                <div><a href="#"><span class="fa fa-calendar"></span> Apr. 18, 2020</a></div>
                                <div><a href="#"><span class="fa fa-comment"></span> 19</a></div>
                            </div>
                        </div>
                    </div>
                </div>
			</div>
		</div>
	</div>
</section>
<!-- End Products -->

<template id="template_productos_all_products">
    <div class="col-md-4 d-flex">
        <div class="product">
            <div class="img d-flex align-items-center justify-content-center div-img" style="background-image: url(images/prod-1.jpg);">
                <div class="desc">
                    <p class="meta-prod d-flex botones">
                        <a href="#" class="d-flex align-items-center justify-content-center shop_product"><span class="flaticon-shopping-bag shop_product"></span></a>
                        <!-- <a href="#" class="d-flex align-items-center justify-content-center"><span class="flaticon-heart"></span></a> -->
                        <a href="#" class="d-flex align-items-center justify-content-center see_product"><span class="flaticon-visibility see_product"></span></a>
                    </p>
                </div>
            </div>
            <div class="text text-center">
                <span class="sale">Sale</span>
                <span class="category">Brandy</span>
                <h2 class="name">Bacardi 151</h2>
                <span class="price">$49.00</span>
            </div>
        </div>
    </div>
</template>

<?php
	include "footer.php";
	include "loader.php";
	include "importscripts.php";
    echo '<script src="views/js/products.js" type="module"></script>';
    echo '<script src="views/js/car.js" type="module"></script>';
	echo '<script src="views/js/all_products.js" type="module"></script>';
?>