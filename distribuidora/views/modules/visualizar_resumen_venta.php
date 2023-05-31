<?php 
	session_start();
	if(!isset($_SESSION['user_admin'])){
		echo "<script>window.location='index';</script>";
	}	
?>

<?php include "views/modules/notification_area.php"?>
<?php include "views/modules/nav.php" ?>
<?php include "views/modules/page_content.php"?>

	<div class="full-width divider-menu-h"></div>
		<div class="mdl-grid">
			<div class="mdl-cell mdl-cell--12-col">
				<div class="full-width panel mdl-shadow--2dp">
					<div class="full-width panel-tittle bg-primary text-center tittles">
						Datos de la venta
					</div>
					<div class="full-width panel-content" id="visualizar_venta">
						<form>
							<div class="mdl-grid">
								<div class="mdl-cell mdl-cell--12-col">
		                            <legend class="text-condensedLight"><i class="zmdi zmdi-border-color"></i> &nbsp; Datos de la Venta</legend><br>
		                        </div>
								<div class="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
									<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" id="label_numero_factura">
										<input class="mdl-textfield__input" type="text" pattern="-?[A-Za-z0-9]*(\.[0-9]+)?" id="numero_factura" readonly>
										<label class="mdl-textfield__label" for="numero_factura">Número de Factura</label>
										<span class="mdl-textfield__error">Número de Factura Invalida</span>
									</div>
								</div>
								<div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
									<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" id="label_fecha_venta">
										<input class="mdl-textfield__input" type="date" id="venta" readonly>
										<label class="mdl-textfield__label" for="venta">Fecha</label>
										<span class="mdl-textfield__error">Fecha Inválido</span>
									</div>
								</div>
								<div class="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
									<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" id="label_cliente">
										<input class="mdl-textfield__input" type="text" pattern="-?[A-Za-z0-9áéíóúÁÉÍÓÚ ]*(\.[0-9]+)?" id="cliente" readonly>
										<label class="mdl-textfield__label" for="cliente">Cliente</label>
										<span class="mdl-textfield__error">Cliente Inválido</span>
									</div>
								</div>
								<div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
									<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" id="label_monto_venta">
										<input class="mdl-textfield__input" type="number" id="monto_venta" readonly>
										<label class="mdl-textfield__label" for="monto_venta">Monto Total de la Venta</label>
										<span class="mdl-textfield__error">Monto Total de la Venta Inválido</span>
									</div>
								</div>
								<!-- <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
									<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
										<input class="mdl-textfield__input" type="date" id="fecha_compra" readonly>
										<label class="mdl-textfield__label" for="fecha_compra" style="display: none;" id="">Fecha Ingreso</label>
										<span class="mdl-textfield__error">Fecha Inválida</span>
									</div>
								</div> -->
								
								
							</div>
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
													<th>Código</th>
													<th>Cantidad</th>
													<th>Precio</th>
												</tr>
											</thead>
											<tbody id="lista_visualizar_resumen_ventas"></tbody>
										</table>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	<!-- Cerramos el Page content -->
</section>

<template id="template_items_productos_resumen_venta">
	<tr>
		<td class="mdl-data-table__cell--non-numeric name_producto">Product Name</td>
		<td class="cod_producto">Product Code</td>
		<td class="stock">7</td>
		<td class="price">$77</td>
		</td>
	</tr>
</template>

<?php 
    include 'importScripts.php';
    echo '<script src="views/js/visualizar_resumen_venta.js" type="module"></script>';
?>
