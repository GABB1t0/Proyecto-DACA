<?php include "views/modules/notification_area.php"?>
<?php include "views/modules/nav.php" ?>
<?php include "views/modules/page_content.php"?>


	<div class="full-width divider-menu-h"></div>
		<div class="mdl-grid" id="inventario">
			<div class="mdl-cell mdl-cell--4-col-phone mdl-cell--8-col-tablet mdl-cell--12-col-desktop">
				<div class="full-width panel-tittle bg-primary text-center tittles">
					Inventario
				</div>	
				<div class="table-responsive">
					<table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp full-width table-responsive">
						<thead>
							<tr>
								<th class="mdl-data-table__cell--non-numeric">Nombre de Producto</th>
								<th class="mdl-data-table__cell--non-numeric">Código de Producto</th>
								<th class="mdl-data-table__cell--non-numeric">Existencias</th>
								<th class="">Precio</th>
								<th class="">Contenido neto</th>
							</tr>
						</thead>
						<tbody id="lista_productos_inventario"></tbody>
					</table>
				</div>
			</div>
		</div>
		<p class="text-center">
			<button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored bg-primary ejecutar" id="btn-update_inventario">
				<i class="zmdi zmdi-plus ejecutar"></i>
			</button>
			<div class="mdl-tooltip" for="btn-update_inventario">Actualizar Inventario</div>
		</p>
		<div>
			<br><br>
		</div>
</section>

<template id="template_items_productos_inventario">
	<tr>
		<td class="mdl-data-table__cell--non-numeric name_product">Product Name</td>
		<td class="mdl-data-table__cell--non-numeric cod_product">Product Code</td>
		<td class="mdl-data-table__cell--non-numeric stock" style="padding-right: 8px ;">7</td>
		<td class=" price">$77</td>
		<td class="contenido_neto"></td>
	</tr>
</template>

<?php 
    include 'importScripts.php';
    echo '<script src="views/js/inventario.js" type="module"></script>';
?>
