<?php 
	session_start();
	if(!isset($_SESSION['user_admin'])){
		echo "<script>window.location='index';</script>";
	}	
?>

<?php include "views/modules/notification_area.php"?>
<?php include "views/modules/nav.php" ?>
<?php include "views/modules/page_content.php"?>

	<div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
		
		<div class="mdl-tabs__tab-bar">
			<a href="compra" class="principal-tabs__a acceso">Nueva Compra</a>
			<a href="lista_compra" class="principal-tabs__a active acceso">Lista de Compras</a>
		</div>

        <div class="mdl-tabs__panel is-active" id="tabListCompra_total">
			<div class="mdl-grid">
				<div class="mdl-cell mdl-cell--4-col-phone mdl-cell--8-col-tablet mdl-cell--12-col-desktop">
					<form action="#">
						<div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
							<label class="mdl-button mdl-js-button mdl-button--icon" for="search_compra" id="buscador2">
								<i class="zmdi zmdi-search" id="buscador"></i>
							</label>
							<div class="mdl-textfield__expandable-holder">
								<input class="mdl-textfield__input" type="text" id="search_compra" placeholder="Ingrese número de factura">
								<label class="mdl-textfield__label"></label>
							</div>
						</div>
					</form>
					<nav class="full-width menu-categories">
						<ul class="list-unstyle text-center">
							<li><a href="lista_compra_disponible" class="principal-tabs__a acceso">Compras Disponibles</a></li>
							<li><a href="lista_compra_total" class="principal-tabs__a active acceso">Total Compras</a></li>
						</ul>
					</nav>
					<div class="full-width text-center" style="padding: 30px 0;" id="lista_compra_total">


					</div>
				</div>
			</div>
		<!-- Cerramos el tabListSuministros -->
        </div>
    </div>
	<!-- Cerramos el Page content -->
</section>

<template id="template-items-suministros-total">
	<div class="card">
		<div class="card-body">
			<small class="numero_factura"></small>
			<br>
			<small class="numero_control"></small>
			<br>
			<small class="name_proveedor"></small>
			<br>
			<small class="precio"></small>
			<br>
			<small class="fecha"></small>
			<br>
			<button class="btn btn-success">Visualizar</button>
		</div>
	</div>
</template>

<?php 
    include 'importScripts.php';
    echo '<script src="views/js/lista_compras_total.js" type="module"></script>';
?>
