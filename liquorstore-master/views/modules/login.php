<?php 
	include "header.php";
?>
<div class="row no-gutters" style="
    display: flex;
    justify-content: center;">
    <div class="col-md-7">
        <div class="contact-wrap w-100 p-md-5 p-4">
            <h3 class="mb-4">Iniciar Sesión </h3>
            <form id="loginForm" name="loginForm" class="contactForm">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="label" for="username">Usuario</label>
                            <input type="text" class="form-control" name="username" id="username" placeholder="Usuario">
                        </div>
                    </div>
                    <div class="col-md-6"> 
                        <div class="form-group">
                            <label class="label" for="password">Contraseña</label>
                            <input type="password" class="form-control" name="password" id="password" placeholder="Contraseña">
                        </div>
                    </div>
                    <!-- <div class="col-md-12">
                        <div class="form-group">
                            <label class="label" for="subject">Subject</label>
                            <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject">
                        </div>
                    </div> -->
                    <!-- <div class="col-md-12">
                        <div class="form-group">
                            <label class="label" for="#">Message</label>
                            <textarea name="message" class="form-control" id="message" cols="30" rows="4" placeholder="Message"></textarea>
                        </div>
                    </div> -->
                    <div class="col-md-12">
                        <div class="form-group">
                            <input type="submit" value="Continuar" class="btn btn-primary">
                            <div class="submitting"></div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <!-- <div class="col-md-5 order-md-first d-flex align-items-stretch">
        <div id="map" class="map"></div>
    </div> -->
</div>

<?php 
    include "importscripts.php";
    echo '<script src="views/js/login.js" type="module"></script>'
?>