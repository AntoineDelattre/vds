"use strict";

/**
 * Proposer les différentes actions possibles sur les liens :
 *     l'ajout d'un lien
 *     La modification d'un lien
 *     La suppression d'un lien
 *     Activer ou désactiver un lien
 */


window.onload = init

/**
 * initialisation des gestionnaire d'événement
 */
function init() {
    lesCartes.innerHTML = "";

    // chargement des clubs
    $.ajax({
        url: "ajax/getlesliens.php",
        type: 'post',
        dataType: "json",
        success: afficher,
        error: reponse => console.error(reponse.responseText)
    });

    pied.style.visibility = 'visible';
}


// affichage des données retournées
function afficher(data) {
    let row = document.createElement('div');
    row.classList.add("row");

    for (const element of data) {
        let col = document.createElement('div');
        col.classList.add("col-xl-3", "col-lg-4", "col-md-6", "col-12");

        let carte = document.createElement('div');
        carte.classList.add('card', 'mx-auto');

        // Génération de l'entête de la carte
        let header = document.createElement('div');
        header.classList.add('card-header');
        header.innerText = element.nom;
        header.style.height = "50px";

        // génération de l'icône de suppression avec un alignement à droite
        let btnSupprime = document.createElement('i');
        btnSupprime.classList.add("bi", "bi-x", "fs-2", "text-danger", "float-end");
        btnSupprime.title = 'Supprimer le lien';
        new bootstrap.Tooltip(btnSupprime, {placement: 'bottom'});
        btnSupprime.onclick = () => Std.confirmer(() => supprimer(element));

        header.appendChild(btnSupprime);
        carte.appendChild(header);

        // Génération du corp de la carte
        let corps = document.createElement('div');
        corps.classList.add("card-body", "text-center");
        let img = document.createElement('img');
        img.src = '../data/logolien/' + element.logo;
        img.style.width = "100px";
        img.style.height = "100px";
        img.alt = "";
        img.title = element.logo;
        corps.appendChild(img);
        carte.appendChild(corps);

        // Génération du pied de la carte
        let pied = document.createElement('div');
        pied.classList.add('card-footer');
        pied.innerText = element.url;

        // Génération de l'icone pour rendre actif le lien
        let btnActif = document.createElement('i');
        btnActif.title = 'Rend le lien actif ou non';
        btnActif.value = element.actif;
        if (btnActif.value === 1)
            btnActif.classList.add("bi", "bi-eye", "fs-4", "text-danger", "float-end");
        else if (btnActif.value === 0)
            btnActif.classList.add("bi", "bi-eye-slash", "fs-4", "text-danger", "float-end");
        new bootstrap.Tooltip(btnActif, {placement: 'bottom'});
        btnActif.onclick = () => modifierActif(element);

        pied.appendChild(btnActif);
        carte.appendChild(pied);

        col.appendChild(carte);
        col.style.paddingTop = "20px";

        row.appendChild(col);

        lesCartes.appendChild(row);
    }
}

/**
 * Lance la modification côté serveur
 * @param {string} element  lien actif à modifier
 */
function modifierActif(element) {
    $.ajax({
        url: 'ajax/modifieractif.php',
        type: 'POST',
        data: {
            id: element.id,
            actif: element.actif
        },
        dataType: 'json',
        error: reponse => {
            msg.innerHTML = Std.genererMessage(reponse.responseText)
        },
        success: init
    });
}

/**
 * Lance la suppression côté serveur
 * @param {string} element  logo à supprimer
 */
function supprimer(element) {
    $.ajax({
        url: 'ajax/supprimer.php',
        type: 'POST',
        data: {
            id: element.id,
            nomlogo: element.logo
        },
        dataType: 'json',
        error: reponse => {
            msg.innerHTML = Std.genererMessage(reponse.responseText)
        },
        success: init
    });
}