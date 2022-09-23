"use strict";

/**
 * Saisie d'un nouvel adhérent
 *     Contrôle des champs de saisie par expression régulière
 *         Tous les champs sont obligatoires
 */

window.onload = init;

// fichier téléversé
let leFichier = null;

/**
 * Mise en place des gestionnaire d'événement sur les différents composant de l'interface
 */
function init() {

    // limiter les caractères autorisés lors de la frappe sur le champ nom
    nom.onkeypress = (e) => /^[A-Za-z ]$/.test(e.key);
    nom.focus();

    url.onkeypress = (e) => /^[A-Za-z0-9/:.]$/.test(e.key);


    // Déclencher l'ouverture de l'explorateur de fichier lors d'un clic dans la zone cible
    cible.onclick = () => logo.click();

    // Lancer la fonction controlerFichier si un fichier a été sélectionné dans l'explorateur
    logo.onchange = () => {
        if (logo.files.length > 0) controlerFichier(logo.files[0])
    };

    // définition des gestionnaires d'événements pour déposer un fichier dans la cible
    cible.ondragover = (e) => e.preventDefault();
    cible.ondrop = (e) => {
        e.preventDefault();
        controlerFichier(e.dataTransfer.files[0]);
    }

    // Le bouton ajouter
    btnAjouter.onclick = ajouter;

    pied.style.visibility = 'visible';
}

// Contrôle le fichier sélectionné au niveau de son extension et de sa taille
function controlerFichier(file) {
    // effacer le message de la zone clble et initialiser la variable leFichier
    messageCible.innerHTML = "";
    messageCible.classList.remove('messageErreur');
    leFichier = null;

    // contrôle de la taille
    let taille = 1 * 300 * 300;
    if (file.size > taille) {
        messageCible.innerText = "La taille de l'image dépasse la taille autorisée"
        messageCible.classList.add("messageErreur");
        return false;
    }

    // contrôle de l'extension
    let lesExtensions = ['jpg', 'png'];
    // récupération de l'extension : découpons au niveau du '.' et prenons le dernier élement
    let eltFichier = file.name.split('.');
    let extension = eltFichier[eltFichier.length - 1].toLowerCase();
    if (lesExtensions.indexOf(extension) === -1) {
        messageCible.innerText = "Cette extension de fichier n'est pas acceptée";
        messageCible.classList.add("messageErreur");
        return false;
    }

    // affichage du nom du fichier téléversé et mémorisation du fichier dans la variable leFichier
    messageCible.innerText = file.name;
    leFichier = file;
}

function ajouter() {
    if (Std.donneesValides()) {
        // lancement de la demande d'ajout dans la base
        msg.innerHTML = "";
        $.ajax({
            url: 'ajax/ajouter.php',
            type: 'POST',
            data: {
                nom: nom.value,
                url: url.value,
                nomlogo: nomlogo.value,
                actif: actif.checked ? 1 : 0
            },
            dataType: 'json',
            error: reponse => {
                msg.innerHTML = Std.genererMessage(reponse.responseText)
            },
            success: function (data) {
                let parametre = {
                    type: 'success',
                    message: 'Ajout réalisé avec succès',
                    fermeture: 1,
                }
                Std.afficherMessage(parametre);
                Std.viderLesChamps()
            }
        })
    }
}

