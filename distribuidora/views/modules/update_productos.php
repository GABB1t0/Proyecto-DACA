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
			<a href="registrar_productos" class="principal-tabs__a">Nuevo Producto</a>
			<a href="lista_productos" class="principal-tabs__a">Lista de Productos</a>
		</div>

        <div class="mdl-tabs__panel is-active" id="tabUpdateProduct">
			<div class="mdl-grid">
				<div class="mdl-cell mdl-cell--12-col">
					<div class="full-width panel mdl-shadow--2dp">
						<div class="full-width panel-tittle bg-primary text-center tittles">
							Modificar Producto
						</div>
						<div class="full-width panel-content">
							<form>
								<div class="mdl-grid">
									<div class="mdl-cell mdl-cell--12-col">
										<legend class="text-condensedLight"><i class="zmdi zmdi-border-color"></i> &nbsp; Información del Producto</legend><br>
									</div>
									<div class="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
										<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" id="label_codigo_producto">
											<input class="mdl-textfield__input" type="number" pattern="-?[0-9- ]*(\.[0-9]+)?" id="updateBarCode" readonly>
											<label class="mdl-textfield__label" for="updateBarCode">Código de Producto</label>
											<span class="mdl-textfield__error">Código de Producto Inválido</span>
										</div>
									</div>
									<div class="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
										<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" id="label_nombre_producto">
											<input class="mdl-textfield__input" type="text" pattern="-?[A-Za-z0-9áéíóúÁÉÍÓÚ ]*(\.[0-9]+)?" id="updateNameProduct">
											<label class="mdl-textfield__label" for="updateNameProduct">Nombre de Producto</label>
											<span class="mdl-textfield__error">Nombre del Producto Invalido</span>
										</div>
									</div>
                                    <div class="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
										<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" id="label_update_contenidoNeto">
											<input class="mdl-textfield__input" type="text" pattern="-?[A-Za-z0-9áéíóúÁÉÍÓÚ ]*(\.[0-9]+)?" id="update_contenidoNeto">
											<label class="mdl-textfield__label" for="update_contenidoNeto">Contenido Neto</label>
											<span class="mdl-textfield__error">Contenido Neto Inválido</span>
										</div>
									</div>
                                    <div class="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
										<div class="mdl-textfield mdl-js-textfield" id="label_estatus_producto">
											<select class="mdl-textfield__input" id="update_estatusProducto">
												<option value="" disabled="" selected="">Seleccionar estatus</option>
												<option value="1">Activo</option>
												<option value="2">Inactivo</option>
											</select>
										</div>
									</div>
									<div class="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
										<div class="mdl-textfield mdl-js-textfield" id="label_tipo_producto">
											<select class="mdl-textfield__input" id="update_tipo">
												<option value="" disabled="" selected="">Seleccionar tipo</option>
												<option value="1">Grabado</option>
												<option value="2">Excento</option>
											</select>
										</div>
									</div>
									<div class="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
										<div class="mdl-textfield mdl-js-textfield" id="label_imagen_producto">
											<input type="file" id="update_imagen_producto">
										</div>
									</div>
									<div class="mdl-cell mdl-cell--12-col">
										<legend class="text-condensedLight"><i class="zmdi zmdi-border-color"></i> &nbsp; Detalles de Venta</legend><br>
									</div>
                                    <div class="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
										<div class="mdl-textfield mdl-js-textfield" id="label_is_venta">
											<select class="mdl-textfield__input" id="update_is_venta">
												<option value="" disabled="" selected="">Seleccionar estado de venta</option>
												<option value="1">Venta</option>
												<option value="2">No Venta</option>
											</select>
										</div>
									</div>
									<div class="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
										<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" id="label_update_precio">
											<input class="mdl-textfield__input" type="text" pattern="-?[A-Za-z0-9áéíóúÁÉÍÓÚ ]*(\.[0-9]+)?" id="update_precio">
											<label class="mdl-textfield__label" for="update_precio">Precio del Producto</label>
											<span class="mdl-textfield__error">Precio no Válido</span>
										</div>
									</div>
								</div>
								<p class="text-center">
									<button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored bg-primary" id="btn-addProduct">
										<i class="zmdi zmdi-plus"></i>
									</button>
									<div class="mdl-tooltip" for="btn-addProduct">Modificar Product</div>
								</p>
							</form>
						</div>
					</div>
				</div>
			</div>
        <!-- Cerramos el tabNewProduct -->
		</div>
    
    </div>
<!-- Cerramos el Page content -->
</section>

<?php 
    include 'importScripts.php';
    echo '<script src="views/js/modificar_productos.js" type="module"></script>';
?>
