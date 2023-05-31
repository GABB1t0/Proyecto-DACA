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
        <a href="lista_cliente" class="principal-tabs__a">Lista de Clientes</a>
    </div>

	<div class="full-width divider-menu-h"></div>
		<div class="mdl-grid">
			<div class="mdl-cell mdl-cell--12-col">
				<div class="full-width panel mdl-shadow--2dp">
					<div class="full-width panel-tittle bg-primary text-center tittles">
						Datos del Cliente
					</div>
					<div class="full-width panel-content" id="visualizar_cliente">
						<form>
							<div class="mdl-grid">
								<div class="mdl-cell mdl-cell--12-col">
		                            <legend class="text-condensedLight"><i class="zmdi zmdi-border-color"></i> &nbsp; Datos del Cliente</legend><br>
		                        </div>
								<div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
									<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" id="label_rif_empresa">
										<input class="mdl-textfield__input" type="number" pattern="-?[0-9]*(\.[0-9]+)?" id="rif_empresa" readonly>
										<label class="mdl-textfield__label" for="rif_empresa">Rif de Empresa</label>
										<span class="mdl-textfield__error">Rif de Empresa Inválido</span>
									</div>
								</div>
								<div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
									<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" id="label_nombre_empresa">
										<input class="mdl-textfield__input" type="text" pattern="-?[A-Za-z0-9áéíóúÁÉÍÓÚ ]*(\.[0-9]+)?" id="nombre_empresa" readonly>
										<label class="mdl-textfield__label" for="nombre_empresa">Nombre Empresa</label>
										<span class="mdl-textfield__error">Nombre Empresa Inválido</span>
									</div>
								</div>
								<div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
									<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" id="label_ubicacion">
										<input class="mdl-textfield__input" type="text" id="ubicacion" readonly>
										<label class="mdl-textfield__label" for="ubicacion">Ubicación</label>
										<span class="mdl-textfield__error">Ubicación Inválida</span>
									</div>
								</div>
								<div class="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
									<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" id="label_usuario_cliente">
									<input class="mdl-textfield__input" type="text" id="usuario_cliente" readonly>
										<label class="mdl-textfield__label" for="usuario_cliente">Usuario Cliente</label>
										<span class="mdl-textfield__error">Usuario Cliente Inválido</span>
									</div>
								</div>
								<div class="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
									<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" id="label_contrasenia_cliente">
										<input class="mdl-textfield__input" type="text" id="contrasenia_cliente" readonly>
										<label class="mdl-textfield__label" for="contrasenia_cliente">Contraseña Cliente</label>
										<span class="mdl-textfield__error">Contraseña Cliente Inválida</span>
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

<template id="template_items_lista_productos">
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
    echo '<script src="views/js/visualizar_cliente.js" type="module"></script>';
?>

