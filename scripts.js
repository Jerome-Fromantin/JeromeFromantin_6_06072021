



/********** CONTENU DU PROJET PRECEDENT QUI N'A RIEN A VOIR !!! **********/
// Fonction de modification de la navigation selon la résolution.
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
  
// Eléments DOM.
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// Fonction d'écoute des clics sur boutons d'inscription pour la fonction suivante.
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Fonction d'apparition de la page modale : formulaire et fond bleuté.
function launchModal() {
  modalbg.style.display = "block";
}

// Fonction de validation du champ "prénom".
function validFirstName() {
  // On crée la variable qui récupère l'input du prénom.
  let firstName = document.getElementById("first");
  // On crée la variable "firstNameLength".
  // Cette variable est égale à la longueur du prénom entré auquel on a appliqué trim().
  // "trim()" est une fonction qui supprime les espaces en début et fin de chaîne.
  // Cela garantit qu'une chaîne contenant des espaces et 0 ou 1 lettre ne sera pas validée.
  let firstNameLength = ((firstName.value).trim()).length;
  // On crée la variable qui récupère l'élément qui servira de support aux messages d'erreur.
  let firstErr = document.getElementById("first-mess");
  // On crée la variable qui récupère le même élément support au message de validation.
  let firstVal = document.getElementById("first-mess");

  if (firstNameLength == 0) { // Si le prénom n'est pas rempli.
    // Le message s'écrit en rouge.
    firstErr.style.color = "#e54858";
    // On insère le message dans l'élément.
    firstErr.innerHTML = "<p>Veuillez écrire votre prénom.</p>"
    // On ajoute une bordure rouge au champ de saisie.
    first.style.border = "2px #e54858 solid";
    firstName.focus();
    return false;
  }
  // Sinon (si le prénom n'est pas vide), s'il a seulement 1 caractère ou plus de 20.
  else if (firstNameLength < 2 || firstNameLength > 20) {
    firstErr.style.color = "#e54858";
    firstErr.innerHTML = "<p>Veuillez écrire un prénom contenant entre 2 et 20 caractères inclus.</p>";
    first.style.border = "2px #e54858 solid";
    firstName.focus();
    return false;
  }
  else { // Sinon (si le prénom est valide).
    // Le message s'écrit en vert.
    firstVal.style.color = "#279e7a";
    firstVal.innerHTML = "<p>Votre prénom est validé !</p>";
    // On ajoute une bordure verte au champ de saisie.
    first.style.border = "2px #279e7a solid";
  }
  return true;
}

// Fonction de validation du champ "nom".
function validLastName() {
  let lastName = document.getElementById("last"); // Input du nom.
  let lastNameLength = ((lastName.value).trim()).length;
  let lastErr = document.getElementById("last-mess");
  let lastVal = document.getElementById("last-mess");

  if (lastNameLength == 0) { // Si le nom n'est pas rempli.
    lastErr.style.color = "#e54858";
    lastErr.innerHTML = "<p>Veuillez écrire votre nom.</p>";
    last.style.border = "2px #e54858 solid";
    lastName.focus();
    return false;
  }
  // Sinon (si le nom n'est pas vide), s'il a seulement 1 caractère ou plus de 30.
  else if (lastNameLength < 2 || lastNameLength > 30) {
    lastErr.style.color = "#e54858";
    lastErr.innerHTML = "<p>Veuillez écrire un nom contenant entre 2 et 30 caractères inclus.</p>";
    last.style.border = "2px #e54858 solid";
    lastName.focus();
    return false;
  }
  else { // Sinon (si le nom est valide).
    lastVal.style.color = "#279e7a";
    lastVal.innerHTML = "<p>Votre nom est validé !</p>";
    last.style.border = "2px #279e7a solid";
  }
  return true;
}

// Fonction de validation du champ "e-mail".
function validEmail() {
  let email = document.getElementById("email"); // Input de l'e-mail.
  let emailLength = ((email.value).trim()).length;
  let emailErr = document.getElementById("email-mess");
  let emailVal = document.getElementById("email-mess");
  
  if (emailLength == 0) { // Si l'e-mail n'est pas rempli.
    emailErr.style.color = "#e54858";
    emailErr.innerHTML = "<p>Veuillez écrire votre adresse e-mail.</p>";
    email.style.border = "2px #e54858 solid";
    email.focus();
    return false;
  }
  // Sinon (si l'e-mail n'est pas vide), s'il est valide selon la regex.
  else if (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.value)) {
    if (email.value == "test@mail.com") { // Mais si l'e-mail a cette valeur de test uniquement.
      emailErr.style.color = "#e54858";
      emailErr.innerHTML = "<p>Ceci est une adresse de test.</p>";
      email.style.border = "2px #e54858 solid";
      email.focus();
      return false;
    }
  // Explication de la syntaxe de la regex :
  // /^ : Ouverture de la regex.
  // [] : Tous les caractères à l'intérieur des crochets sont acceptés.
  // a-zA-Z0-9.!#$%&’*+/=?^_`{|}~- : minuscules de a à z et/ou majuscules de A à Z et/ou chiffres de 0 à 9
  // et/ou tous les caractères spéciaux écrits.
  // +@ : Les caractères précédents doivent être suivis d'une arobase.
  // [a-zA-Z0-9-] : Suivi de minuscules de a à z et/ou majuscules de A à Z et/ou chiffres de 0 à 9.
  // +(? : Le point d'interrogation indique que la parenthèse ouvrante peut être présente 0 à 1 fois.
  // \. : L'antislash est le caractère d'échappement pour le point qui doit être compris comme
  // caractère unique de l'e-mail et non comme l'ensemble signifiant "tous les caractères".
  // [a-zA-Z0-9-] : Suivi de minuscules de a à z et/ou majuscules de A à Z et/ou chiffres de 0 à 9.
  // +)* : L'astérisque indique que la parenthèse fermante peut être présente 0 à plusieurs fois.
  // $/ : Fermeture de la regex.

  // .test(email.value) est la fonction vérifiant que la valeur du champ "email" respecte la regex précédente.
    else { // Sinon (si l'e-mail est vraiment valide).
      emailVal.style.color = "#279e7a";
      emailVal.innerHTML = "<p>Votre adresse e-mail est validée !</p>";
      email.style.border = "2px #279e7a solid";
    }
    return true;
  }
  else { // Sinon (si l'e-mail est invalide).
    emailErr.style.color = "#e54858";
    emailErr.innerHTML = "<p>Veuillez écrire une adresse e-mail valide.</p>";
    email.style.border = "2px #e54858 solid";
    email.focus();
    return false;
  }
}

// Fonction de validation du champ "date de naissance".
function validBirthdate() {
  let birthdate = document.getElementById("birthdate"); // Input de la date de naissance.
  let birth = birthdate.value;
  let birthdateErr = document.getElementById("birthdate-mess");
  let birthdateVal = document.getElementById("birthdate-mess");

  // Récupération de la date du jour (jour - mois - année).
  let dateDuJour = new Date();

  /***** Variables pour la fonctionnalité de prise en compte de la majorité. *****/
  // Récupération du jour seulement pour le jour de majorité.
  //let jourMajorite = dateDuJour.getDate();
  // Récupération du mois seulement pour le mois de majorité.
  // "+ 1" est nécessaire car les mois vont de 0 à 11, pas de 1 à 12.
  //let moisMajorite = (dateDuJour.getMonth() + 1);
  // Récupération de l'année seulement pour l'année de majorité.
  // Il faut donc enlever 18 ans.
  //let anneeMajorite = (dateDuJour.getFullYear()-18);
  /***** Fin des variables. *****/

  // Récupération du jour seulement.
  let jourEnCours = dateDuJour.getDate();
  // Récupération du mois seulement.
  // "+ 1" est nécessaire car les mois vont de 0 à 11, pas de 1 à 12.
  let moisEnCours = (dateDuJour.getMonth() + 1);
  // Récupération de l'année seulement.
  let anneeEnCours = (dateDuJour.getFullYear());

  // La valeur du champ "date de naissance" est une chaîne de caractères au format "yyyy-MM-dd".
  // split("-") permet de couper cette chaîne à chaque caractère "-".
  // Ici, cela crée un tableau contenant 3 valeurs, [yyyy, MM, dd], récupéré par la variable.
  let splitBirth = birth.split("-");

  if (birth == "") { // Si la date de naissance n'est pas remplie.
    birthdateErr.style.color = "#e54858";
    birthdateErr.innerHTML = "<p>Veuillez indiquer votre date de naissance.</p>";
    birthdate.style.border = "2px #e54858 solid";
    birthdate.focus();
    return false;
  }
  // Sinon (si la date de naissance est remplie), si date antérieure au 1er janvier 1921.
  else if (birth < "1921-01-01") {
    birthdateErr.style.color = "#e54858";
    birthdateErr.innerHTML = "<p>Veuillez indiquer une année postérieure à 1920.</p>";
    birthdate.style.border = "2px #e54858 solid";
    birthdate.focus();
    return false;
  }
  // Sinon (si l'année de naissance est postérieure ou égale à 1921), si antérieur à l'année en cours.
  else if (splitBirth[0] < anneeEnCours) { // splitBirth[0] est la 1ère valeur du tableau, c'est l'année.
    birthdateVal.style.color = "#279e7a";
    birthdateVal.innerHTML = "<p>Votre date de naissance est validée !</p>";
    birthdate.style.border = "2px #279e7a solid";
    return true;
  }
  // Sinon (si postérieur ou égal à l'année en cours), si postérieur.
  else if (splitBirth[0] > anneeEnCours) {
    birthdateErr.style.color = "#e54858";
    birthdateErr.innerHTML = "<p>Votre date de naissance ne peut pas être postérieure à la date du jour.</p>";
    birthdate.style.border = "2px #e54858 solid";
    birthdate.focus();
    return false;
  }
  // Sinon (si égal à l'année en cours), si mois de naissance antérieur à mois en cours.
  else if (splitBirth[1] < moisEnCours) { // splitBirth[1] est la 2ème valeur du tableau, c'est le mois.
    birthdateVal.style.color = "#279e7a";
    birthdateVal.innerHTML = "<p>Votre date de naissance est validée !</p>";
    birthdate.style.border = "2px #279e7a solid";
    return true;
  }
  // Sinon (si postérieur ou égal au mois en cours), si postérieur.
  else if (splitBirth[1] > moisEnCours) {
    birthdateErr.style.color = "#e54858";
    birthdateErr.innerHTML = "<p>Votre date de naissance ne peut pas être postérieure à la date du jour.</p>";
    birthdate.style.border = "2px #e54858 solid";
    birthdate.focus();
    return false;
  }
  // Sinon (si égal au mois en cours), si jour de naissance antérieur à jour en cours.
  else if (splitBirth[2] < jourEnCours) { // splitBirth[2] est la 3ème valeur du tableau, c'est le jour.
    birthdateVal.style.color = "#279e7a";
    birthdateVal.innerHTML = "<p>Votre date de naissance est validée !</p>";
    birthdate.style.border = "2px #279e7a solid";
    return true;
  }
  // Sinon (si postérieur ou égal au jour en cours), si postérieur.
  else if (splitBirth[2] > jourEnCours) {
    birthdateErr.style.color = "#e54858";
    birthdateErr.innerHTML = "<p>Votre date de naissance ne peut pas être postérieure à la date du jour.</p>";
    birthdate.style.border = "2px #e54858 solid";
    birthdate.focus();
    return false;
  }
  // Sinon (si égal au jour en cours).
  else {
    birthdateVal.style.color = "#279e7a";
    birthdateVal.innerHTML = "<p>Votre date de naissance est validée !</p>";
    birthdate.style.border = "2px #279e7a solid";
  }
  return true;
  /***** Fonctionnalité de prise en compte de la majorité. *****/
  /*
  // Sinon (si l'année de naissance est postérieure ou égale à 1921), si antérieur à l'année de majorité (2003).
  else if (splitBirth[0] < anneeMajorite) { // splitBirth[0] est la 1ère valeur du tableau, c'est l'année.
    birthdateVal.style.color = "#279e7a";
    birthdateVal.innerHTML = "<p>Votre date de naissance est validée !</p>";
    birthdate.style.border = "2px #279e7a solid";
  }
  // Sinon (si postérieur ou égal à l'année de majorité), si postérieur.
  else if (splitBirth[0] > anneeMajorite) {
    birthdateErr.style.color = "#e54858";
    birthdateErr.innerHTML = "<p>Vous n'êtes pas majeur, vous ne pouvez vous inscrire.</p>";
    birthdate.style.border = "2px #e54858 solid";
    birthdate.focus();
    return false;
  }
  // Sinon (si égal à l'année de majorité), si mois de naissance antérieur à mois de majorité.
  else if (splitBirth[1] < moisMajorite) { // splitBirth[1] est la 2ème valeur du tableau, c'est le mois.
    birthdateVal.style.color = "#279e7a";
    birthdateVal.innerHTML = "<p>Majeur de l'année, votre date de naissance est validée !</p>";
    birthdate.style.border = "2px #279e7a solid";
  }
  // Sinon (si postérieur ou égal au mois de majorité), si postérieur.
  else if (splitBirth[1] > moisMajorite) {
    birthdateErr.style.color = "#e54858";
    birthdateErr.innerHTML = "<p>Vous serez majeur dans l'année, vous ne pouvez encore vous inscrire.</p>";
    birthdate.style.border = "2px #e54858 solid";
    birthdate.focus();
    return false;
  }
  // Sinon (si égal au mois de majorité), si jour de naissance antérieur à jour de majorité.
  else if (splitBirth[2] < jourMajorite) { // splitBirth[2] est la 3ème valeur du tableau, c'est le jour.
    birthdateVal.style.color = "#279e7a";
    birthdateVal.innerHTML = "<p>Majeur du mois, votre date de naissance est validée !</p>";
    birthdate.style.border = "2px #279e7a solid";
  }
  // Sinon (si postérieur ou égal au jour de majorité), si postérieur.
  else if (splitBirth[2] > jourMajorite) {
    birthdateErr.style.color = "#e54858";
    birthdateErr.innerHTML = "<p>Vous serez majeur dans le mois, vous ne pouvez encore vous inscrire.</p>";
    birthdate.style.border = "2px #e54858 solid";
    birthdate.focus();
    return false;
  }
  // Sinon (si égal au jour de majorité).
  else {
    birthdateVal.style.color = "#279e7a";
    birthdateVal.innerHTML = "<p>Majeur aujourd'hui, votre date de naissance est validée !</p>";
    birthdate.style.border = "2px #279e7a solid";
  }
  */
  /***** Fin de la fonctionnalité de prise en compte de la majorité. *****/
}

// Fonction de validation du champ "nombre de tournois".
function validNumberGames() {
  let quantity = document.getElementById("quantity"); // Input du nombre de tournois.
  let quantite = quantity.value;
  let quantityErr = document.getElementById("quantity-mess");
  let quantityVal = document.getElementById("quantity-mess");
  
  if (quantite == "") { // Si le nombre de tournois n'est pas rempli.
    quantityErr.style.color = "#e54858";
    quantityErr.innerHTML = "<p>Veuillez indiquer le nombre de tournois auxquels vous avez participé.</p>";
    quantity.style.border = "2px #e54858 solid";
    quantity.focus();
    return false;
  }
  // Sinon (si le nombre de tournois est rempli), s'il est inférieur à 0 ou supérieur ou égal à 100.
  else if (quantite < 0 || quantite >= 100) {
    quantityErr.style.color = "#e54858";
    quantityErr.innerHTML = "<p>Veuillez indiquer un nombre entre 0 et 99 inclus.</p>";
    quantity.style.border = "2px #e54858 solid";
    quantity.focus();
    return false;
  }
  else { // Sinon (si le nombre de tournois est valide).
    quantityVal.style.color = "#279e7a";
    quantityVal.innerHTML = "<p>Ce nombre est validé !</p>";
    quantity.style.border = "2px #279e7a solid";
  }
  return true;
}

// Fonction de validation du champ "choix des villes".
function validTowns() {
  let locations = document.getElementsByClassName("checkbox-town"); // Tous les inputs de villes.
  let locationsErr = document.getElementById("locations-mess");
  let locationsVal = document.getElementById("locations-mess");
  let quantity = document.getElementById("quantity"); // Input du nombre de tournois.
  let quantite = quantity.value;
  
  let checked = false;
  let townsChecked = 0; // Nombre de villes cochées initialisé à 0.
  // La boucle "for" vérifie si une ville est cochée et en compte le nombre.
  for (let location of locations) {
    checked = checked || location.checked
    if (location.checked) {
      townsChecked++;
    }
  }
  
  // Si aucune ville n'est cochée.
  if (townsChecked == 0) {
    if (quantite > 0) {
      locationsErr.style.color = "#e54858";
      locationsErr.innerHTML = "<p>Vous devez cocher au moins l'une des villes.</p>";
      return false;
    }
    else {
      locationsVal.style.color = "#279e7a";
      locationsVal.innerHTML = "<p>Vous n'avez participé à aucun tournoi, donc pas de ville à cocher.</p>";
    }
    return true;
  }

  // Si une seule ville est cochée.
  if (townsChecked == 1) {
    if (quantite == 0) {
      locationsVal.style.color = "#e54858";
      locationsVal.innerHTML = "<p>Vous n'avez participé à aucun tournoi, vous ne pouvez cocher de ville.</p>";
      return false;
    }
    else {
      locationsVal.style.color = "#279e7a";
      if (locations[0].checked) {
        // Pour l'ajout de variables dans une chaîne de caractères, utilisation de la syntaxe de ES6.
        locationsVal.innerHTML = `<p>Vous avez coché ${locations[0].value}, votre choix est validé !</p>`;
      }
      if (locations[1].checked) {
        locationsVal.innerHTML = `<p>Vous avez coché ${locations[1].value}, votre choix est validé !</p>`;
      }
      if (locations[2].checked) {
        locationsVal.innerHTML = `<p>Vous avez coché ${locations[2].value}, votre choix est validé !</p>`;
      }
      if (locations[3].checked) {
        locationsVal.innerHTML = `<p>Vous avez coché ${locations[3].value}, votre choix est validé !</p>`;
      }
      if (locations[4].checked) {
        locationsVal.innerHTML = `<p>Vous avez coché ${locations[4].value}, votre choix est validé !</p>`;
      }
      if (locations[5].checked) {
        locationsVal.innerHTML = `<p>Vous avez coché ${locations[5].value}, votre choix est validé !</p>`;
      }
    }
    return true;
  }

  // Si deux villes sont cochées.
  if (townsChecked == 2) {
    if (quantite < 2) {
      locationsVal.style.color = "#e54858";
      locationsVal.innerHTML = "<p>Vous ne pouvez cocher plus de villes que de tournois joués.</p>";
      return false;
    }
    else {
      locationsVal.style.color = "#279e7a";
      locationsVal.innerHTML = "<p>Vous avez coché deux villes, votre choix est validé !</p>";
    }
    return true;
  }

  // Si trois villes sont cochées.
  if (townsChecked == 3) {
    if (quantite < 3) {
      locationsVal.style.color = "#e54858";
      locationsVal.innerHTML = "<p>Vous ne pouvez cocher plus de villes que de tournois joués.</p>";
      return false;
    }
    else {
      locationsVal.style.color = "#279e7a";
      locationsVal.innerHTML = "<p>Vous avez coché trois villes, votre choix est validé !</p>";
    }
    return true;
  }

  // Si quatre villes sont cochées.
  if (townsChecked == 4) {
    if (quantite < 4) {
      locationsVal.style.color = "#e54858";
      locationsVal.innerHTML = "<p>Vous ne pouvez cocher plus de villes que de tournois joués.</p>";
      return false;
    }
    else {
      locationsVal.style.color = "#279e7a";
      locationsVal.innerHTML = "<p>Vous avez coché quatre villes, votre choix est validé !</p>";
    }
    return true;
  }

  // Si cinq villes sont cochées.
  if (townsChecked == 5) {
    if (quantite < 5) {
      locationsVal.style.color = "#e54858";
      locationsVal.innerHTML = "<p>Vous ne pouvez cocher plus de villes que de tournois joués.</p>";
      return false;
    }
    else {
      locationsVal.style.color = "#279e7a";
      locationsVal.innerHTML = "<p>Vous avez coché cinq villes, votre choix est validé !</p>";
    }
    return true;
  }
  
  // Si toutes les villes sont cochées.
  if (townsChecked == 6) {
    if (quantite < 6) {
      locationsVal.style.color = "#e54858";
      locationsVal.innerHTML = "<p>Vous ne pouvez cocher plus de villes que de tournois joués.</p>";
      return false;
    }
    else {
      locationsVal.style.color = "#279e7a";
      locationsVal.innerHTML = "<p>Vous avez coché toutes les villes, votre choix est validé !</p>";
    }
    return true;
  }
}

// Fonction de validation de la case "conditions d'utilisation".
function validUseConditions() {
  let sqCheckbox = document.getElementById("sq-checkbox1"); // Input de la case.
  let sqCheckboxErr = document.getElementById("sq-checkbox-mess");
  let sqCheckboxVal = document.getElementById("sq-checkbox-mess");

  if (sqCheckbox.checked == false) { // Si la case des conditions est décochée.
    sqCheckboxErr.style.color = "#e54858";
    sqCheckboxErr.innerHTML = "<p>Vous devez avoir lu et accepté les conditions d'utilisation.</p>";
    return false;
  }
  else { // Si la case des conditions est cochée.
    sqCheckboxVal.style.color = "#279e7a";
    sqCheckboxVal.innerHTML = "<p>Merci d'avoir lu et accepté les conditions d'utilisation.</p>";
  }
  return true;
}

// Fonction de validation des entrées du formulaire.
function validate() {
  if (!validFirstName()) {
    return false;
  }

  if (!validLastName()) {
    return false;
  }

  if (!validEmail()) {
    return false;
  }

  if (!validBirthdate()) {
    return false;
  }

  if (!validNumberGames()) {
    return false;
  }

  if (!validTowns()) {
    return false;
  }

  if (!validUseConditions()) {
    return false;
  }
  
  openValid();
  return false;
}

// Fonction d'écoute du clic sur bouton de fermeture du formulaire pour la fonction suivante.
let closeModalBtn = document.getElementById("close-modal-btn");
closeModalBtn.addEventListener('click', closeModal);

// Fonction de fermeture du modal (formulaire et fond bleuté).
function closeModal() {
  modalbg.style.display = "none";
}

// Fonction d'ouverture de la confirmation.
let validContent = document.getElementById("valid-content");
function openValid() {
  validContent.style.display = "block";
}

// Fonction d'écoute du clic sur bouton de fermeture de la confirmation pour la fonction suivante.
let closeValidBtn = document.getElementById("close-valid-btn");
closeValidBtn.addEventListener('click', closeValid);

// Fonction de fermeture de la confirmation seulement.
function closeValid() {
  validContent.style.display = "none";
}

// Fonction d'écoute du clic sur bouton de validation de la page de confirmation pour la fonction suivante.
let validCloseModalBtn = document.getElementById("valid-close-modal");
validCloseModalBtn.addEventListener('click', validCloseModal);

// Fonction de confirmation finale et fermeture du modal.
function validCloseModal() {
  modalbg.style.display = "none";
  validContent.style.display = "none";
  // Remise à 0 des entrées du formulaire.
  document.getElementById("reserve").reset();
  // Pour chaque champ, retour à la bordure de départ et vidage du message de validation.
  first.style.border = "0.8px solid #ccc";
  document.getElementById("first-mess").innerHTML = "";
  last.style.border = "0.8px solid #ccc";
  document.getElementById("last-mess").innerHTML = "";
  email.style.border = "0.8px solid #ccc";
  document.getElementById("email-mess").innerHTML = "";
  birthdate.style.border = "0.8px solid #ccc";
  document.getElementById("birthdate-mess").innerHTML = "";
  quantity.style.border = "0.8px solid #ccc";
  document.getElementById("quantity-mess").innerHTML = "";
  document.getElementById("locations-mess").innerHTML = "";
  document.getElementById("sq-checkbox-mess").innerHTML = "";
}