<?php 
	include "header.php";
	include "nav.php";
?>

<!-- Main -->
<div class="hero-wrap" style="background-image: url('views/images/bg_2.jpg');" data-stellar-background-ratio="0.5">
	<div class="overlay"></div>
	<div class="container">
		<div class="row no-gutters slider-text align-items-center justify-content-center">
			<div class="col-md-8 ftco-animate d-flex align-items-end">
				<div class="text w-100 text-center">
					<h1 class="mb-4">Good <span>Drink</span> for Good <span>Moments</span>.</h1>
					<p><a href="#" class="btn btn-primary py-2 px-4">Shop Now</a> <a href="#" class="btn btn-white btn-outline-white py-2 px-4">Read more</a></p>
				</div>
			</div>
		</div>
	</div>
</div>

<section class="ftco-intro">
	<div class="container">
		<div class="row no-gutters">
			<div class="col-md-4 d-flex">
				<div class="intro d-lg-flex w-100 ftco-animate">
					<div class="icon">
						<span class="flaticon-support"></span>
					</div>
					<div class="text">
						<h2>Online Support 24/7</h2>
						<p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
					</div>
				</div>
			</div>
			<div class="col-md-4 d-flex">
				<div class="intro color-1 d-lg-flex w-100 ftco-animate">
					<div class="icon">
						<span class="flaticon-cashback"></span>
					</div>
					<div class="text">
						<h2>Money Back Guarantee</h2>
						<p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
					</div>
				</div>
			</div>
			<div class="col-md-4 d-flex">
				<div class="intro color-2 d-lg-flex w-100 ftco-animate">
					<div class="icon">
						<span class="flaticon-free-delivery"></span>
					</div>
					<div class="text">
						<h2>Free Shipping &amp; Return</h2>
						<p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="ftco-section ftco-no-pb">
	<div class="container">
		<div class="row">
			<div class="col-lg-2 col-md-4 ">
				<div class="sort w-100 text-center ftco-animate">
					<div class="img" style="background-image: url(views/images/kind-1.jpg);"></div>
					<h3>Brandy</h3>
				</div>
			</div>
			<div class="col-lg-2 col-md-4 ">
				<div class="sort w-100 text-center ftco-animate">
					<div class="img" style="background-image: url(views/images/kind-2.jpg);"></div>
					<h3>Gin</h3>
				</div>
			</div>
			<div class="col-lg-2 col-md-4 ">
				<div class="sort w-100 text-center ftco-animate">
					<div class="img" style="background-image: url(views/images/kind-3.jpg);"></div>
					<h3>Rum</h3>
				</div>
			</div>
			<div class="col-lg-2 col-md-4 ">
				<div class="sort w-100 text-center ftco-animate">
					<div class="img" style="background-image: url(views/images/kind-4.jpg);"></div>
					<h3>Tequila</h3>
				</div>
			</div>
			<div class="col-lg-2 col-md-4 ">
				<div class="sort w-100 text-center ftco-animate">
					<div class="img" style="background-image: url(views/images/kind-5.jpg);"></div>
					<h3>Vodka</h3>
				</div>
			</div>
			<div class="col-lg-2 col-md-4 ">
				<div class="sort w-100 text-center ftco-animate">
					<div class="img" style="background-image: url(views/images/kind-6.jpg);"></div>
					<h3>Whiskey</h3>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="ftco-section">
	<div class="container">
		<div class="row justify-content-center pb-5">
			<div class="col-md-7 heading-section text-center ftco-animate">
				<span class="subheading">Our Delightful offerings</span>
				<h2>Tastefully Yours</h2>
			</div>
		</div>
		<div class="row" id='lista_productos_home'>
		<div class="col-md-3 d-flex">
		<div class="product ftco-animate">
			<div class="img d-flex align-items-center justify-content-center div-img" style="background-image: url('views/images/bg_2.jpg');">
				<div class="desc">
					<p class="meta-prod d-flex">
						<a href="#" class="d-flex align-items-center justify-content-center"><span class="flaticon-shopping-bag"></span></a>
						<a href="#" class="d-flex align-items-center justify-content-center"><span class="flaticon-heart"></span></a>
						<a href="#" class="d-flex align-items-center justify-content-center"><span class="flaticon-visibility"></span></a>
					</p>
				</div>
			</div>
			<div class="text text-center">
				<span class="sale">Sale</span>
				<span class="category">Brandy</span>
				<h2 class="name">Bacardi 151</h2>
				<span class="price">$69.00</span> 
			</div>
		</div>
	</div>
		</div>
		<div class="row justify-content-center">
			<div class="col-md-4">
				<a href="products" class="btn btn-primary d-block">View All Products <span class="fa fa-long-arrow-right"></span></a>
			</div>
		</div>
	</div>
</section>

<template id="template_productos_home">
<div class="col-md-3 d-flex">
	<div class="product">
		<div class="img d-flex align-items-center justify-content-center div-img" style="background-image: url('views/images/bg_2.jpg');">
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
			<span class="price">$69.00</span> 
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
	echo '<script src="views/js/home.js" type="module"></script>'
?>
