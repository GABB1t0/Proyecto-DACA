<?php 
	session_start();
	if(!isset($_SESSION['user_admin'])){
		echo "<script>window.location='index';</script>";
	}	
?>

<?php include "views/modules/notification_area.php"?>
<?php include "views/modules/nav.php" ?>
<?php include "views/modules/page_content.php"?>

	<div class="mdl-tabs__tab-bar">
		<a href="ventas" class="principal-tabs__a">Venta local</a>
		<a href="venta_pedido" class="principal-tabs__a active">Venta por Pedido</a>
	</div>

	<div class="full-width divider-menu-h"></div>
		<div class="mdl-grid">
			<div class="mdl-cell mdl-cell--12-col">
				<div class="full-width panel mdl-shadow--2dp">
					<div class="full-width panel-tittle bg-primary text-center tittles">
						Ventas
					</div>
					<div class="full-width panel-content" id="venta_productos_pedido">
						<form>
							<div class="mdl-grid">
								<div class="mdl-cell mdl-cell--12-col">
		                            <legend class="text-condensedLight"><i class="zmdi zmdi-border-color"></i> &nbsp; Datos de la venta</legend><br>
		                        </div>
								<div class="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
									<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" id="label-codigo_pedido">
										<input class="mdl-textfield__input" min=1 type="number" pattern="-?[0-9]*(\.[0-9]+)?" id="codigo_pedido">
										<label class="mdl-textfield__label" for="codigo_pedido">Código del Pedido</label>
										<span class="mdl-textfield__error">Código de Pedido Invalido</span>
									</div>
								</div>
							</div>
							<p class="text-center">
								<button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored bg-primary" id="btn-add-list" type="button">
									<i class="zmdi zmdi-plus"></i>
								</button>
								<div class="mdl-tooltip" for="btn-add-list">Agregar Producto a la Lista</div>
							</p>
							<div class="mdl-grid">
								<div class="mdl-cell mdl-cell--12-col">
		                            <legend class="text-condensedLight"><i class="zmdi zmdi-border-color"></i> &nbsp; Productos</legend><br>
		                        </div>
								<div class="mdl-cell mdl-cell--4-col-phone mdl-cell--8-col-tablet mdl-cell--12-col-desktop">
									<div class="table-responsive">
										<table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp full-width table-responsive">
											<thead>
											<tr>
													<th class="mdl-data-table__cell--non-numeric">Nombre Producto</th>
													<th style="text-align: center;">Código</th>
													<th style="text-align: center;">Cantidad</th>
													<th style="text-align: center;">Precio</th>
													<th style="text-align: center;">Grabado/Excento</th>
													<th style="text-align: center;">% Iva</th>
													<th>Eliminar</th>
												</tr>
											</thead>
											<tbody id="lista_pedido_productos"></tbody>
										</table>
									</div>
								</div>
							</div>
							<p class="text-center">
								<button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored bg-primary" id="btn-registrar-venta_pedido" type="button">
									<i class="zmdi zmdi-plus"></i>
								</button>
								<div class="mdl-tooltip" for="btn-registrar-venta_pedido">Registrar Venta</div>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	<!-- Cerramos el Page content -->
</section>

<template id="items_lista_productos">
	<tr class="id">
		<td class="mdl-data-table__cell--non-numeric name_producto">Product Name</td>
		<td class="cod_producto" style="text-align: center;">Product Code</td>
		<td class="stock" style="text-align: center;">7</td>
		<td class="price" style="text-align: center;">$77</td>
		<td class="tipo" style="text-align: center;" ></td>
		<td class="iva" style="text-align: center;" ></td>
		<td><button class="mdl-button mdl-button--icon mdl-js-button"><i class="zmdi zmdi-more"></i></button></td>
	</tr>
</template>

<?php 
    include 'importScripts.php';
    echo '<script src="views/js/venta_pedido.js" type="module"></script>';
?>