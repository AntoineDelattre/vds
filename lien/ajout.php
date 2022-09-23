<?php
/**
 * Interface d'ajout d'un membre
 */

require '../include/initialisation.php';
require '../include/controleacces.php';
$titreFonction = "Nouveau lien";
require RACINE . '/include/head.php';
?>

<script src="ajout.js"></script>
<div class="border p-3 mt-3">
    <div id="msg" class="m-3"></div>
    <div class="row">
        <div class="col-md-6 col-12">
            <label for="nom" class="col-form-label">Nom </label>
            <input id="nom"
                   type="text"
                   class="form-control ctrl  "
                   required
                   maxlength='30'
                   pattern="^[A-Za-z]([A-Za-z ]*[A-Za-z])*$"
                   autocomplete="off">
            <div class='messageErreur'></div>
        </div>
        <div class="col-md-6 col-12">
            <label for="url" class="col-form-label">URL </label>
            <input id="url"
                   type="text"
                   class="form-control ctrl"
                   required
                   maxlength='50'
                   pattern="^[A-Za-z]([A-Za-z ]*[A-Za-z])*$"
                   autocomplete="off">
            <div class='messageErreur'></div>
        </div>
    </div>

    <br>

    <div class="row">
        <div class="col-md-6 col-12">
            Ajouter le logo
            <input type="file" id="logo" accept=".jpg, .png" style='display: none '>
            <div id="cible" class="upload"
                 data-bs-html="true"
                 style="height: 200px">

                <i class="bi-upload" style="font-size: 4rem"></i>
                <div>Cliquez ou déposer le document PDF ici</div>
            </div>
            Fichier téléchargé : <span id='messageCible'></span>
        </div>
        <div class="col-md-6 col-12">
            <label for="nomlogo" class="col-form-label">Nom du logo</label>
            <input id="nomlogo"
                   type="text"
                   class="form-control ctrl  "
                   required
                   maxlength='30'
                   pattern="^[A-Za-z0-9]*$"
                   autocomplete="off">
            <div class='messageErreur'></div>
        </div>
    </div>

    <br>

    <div class="form-check form-switch ">
        <input class="form-check-input" type="checkbox" id="visible" name="visible" checked>
        <label class="form-check-label" for="visible">Rendre le lien visible</label>
    </div>

    <div class="text-center">
        <button id='btnAjouter' class="btn btn btn-danger">Ajouter</button>
    </div>
</div>

<?php require RACINE . '/include/pied.php'; ?>


