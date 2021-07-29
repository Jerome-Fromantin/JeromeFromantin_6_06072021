// Récupération des données "photographes" du fichier JSON.
import {getMediasByPhotographers, getPhotographer} from "./services";

// PAGE DE PHOTOGRAPHE
// Récupère dynamiquement l'id du photographe concerné.
let param = new URLSearchParams(window.location.search);
let thePhotographerId = param.get("id");

// PARTIE PRESENTATION DU PHOTOGRAPHE
// Partie gauche de la présentation : Récupère dynamiquement le nom pour le h1.
function photoH1(photographerName) {
  let title = document.createElement("h1");
  title.innerText = photographerName;
  title.id = "dyn_photo_h1";
  return title;
}

// Partie gauche de la présentation : Récupère dynamiquement les données pour les 2 lignes de description.
function photoDescr(photographerCity, photographerCountry, photographerTagline) {
  let description = document.createElement("div");
  let descriptionPlace = document.createElement("p");
  descriptionPlace.innerText = photographerCity + ", " + photographerCountry;
  descriptionPlace.id = "dyn_photo_pres_lieu";
  descriptionPlace.setAttribute("lang", "en");
  descriptionPlace.setAttribute("aria-label", photographerCity + ", " + photographerCountry);
  let descriptionSlogan = document.createElement("p");
  descriptionSlogan.innerText = photographerTagline;
  descriptionSlogan.id = "dyn_photo_pres_slogan";
  descriptionSlogan.setAttribute("aria-label", photographerTagline);
  description.appendChild(descriptionPlace);
  description.appendChild(descriptionSlogan);
  return description;
}

// Partie gauche de la présentation : Récupère dynamiquement les données pour les tags.
function photoTags(photographerTags) {
  let tagGroup = document.createElement("nav");
  tagGroup.id = "dyn_photo_pres_barnav";
  tagGroup.setAttribute("lang", "en");
  tagGroup.setAttribute("aria-label", "Catégories du photographe");
  for (let photographerTag of photographerTags) {
    let tagGroupLink = document.createElement("a");
    tagGroupLink.href = "#";
    tagGroupLink.className = "photo_pres_tag";
    tagGroupLink.setAttribute("aria-label", photographerTag);
    let tagGroupspan = document.createElement("span");
    tagGroupspan.innerText = "#" + photographerTag;
    tagGroupLink.appendChild(tagGroupspan);
    tagGroup.appendChild(tagGroupLink);
  }
  return tagGroup;
}

// Organise toutes les données précédemment récupérées.
function fillLeftPart(photographerName, photographerCity, photographerCountry, photographerTagline, photographerTags) {
  let leftPart = document.createElement("section");
  leftPart.id = "photo_pres_leftText";
  let title = photoH1(photographerName)
  let descr = photoDescr(photographerCity, photographerCountry, photographerTagline)
  let tags = photoTags(photographerTags);
  leftPart.appendChild(title);
  leftPart.appendChild(descr);
  leftPart.appendChild(tags);
  return leftPart;
}

// Récupère le formulaire caché pour la fonction suivante.
let formModal = document.getElementById("form_section");

// Partie gauche de la présentation : Le bouton de contact ouvre le formulaire.
function contactButton() {
  let buttonLink = document.createElement("a");
  buttonLink.href = "#";
  buttonLink.id = "dyn_photo_contact_link";
  buttonLink.setAttribute("aria-label", "Contact Me");
  buttonLink.onclick = function(event) {
    event.preventDefault();
    formModal.style.display = "block";
  }
  let buttonSpan = document.createElement("span");
  buttonSpan.innerText = "Contactez-moi";
  buttonLink.appendChild(buttonSpan);
  return buttonLink;
}

// Montre la partie gauche de la présentation (texte et bouton) remplie dynamiquement.
function showLeftPart(photographer) {
  let sectionleft = document.querySelector("#photo_pres_text");
  let leftPart = fillLeftPart(photographer.name, photographer.city, photographer.country, photographer.tagline, photographer.tags);
  let contact = contactButton();
  sectionleft.appendChild(leftPart);
  sectionleft.appendChild(contact);
  showMobileContact(photographer.id);
  showLikesNPrice(/*totalLikes, */thePhotographerId, photographer.price);
}

// Partie droite de la présentation : Récupère dynamiquement le nom de l'image.
function photoImg(photographerPortrait, photographerName) {
  let image = document.createElement("img");
  image.src = "Images/ID_Photos/" + photographerPortrait;
  image.className = "dyn_round_img";
  image.id="dyn_photo_round_img";
  image.setAttribute("aria-label", photographerName);
  return image;
}

// Montre la présentation entière remplie dynamiquement.
async function showPresent(id) {
  let photographer = await getPhotographer(id);
  let presentation = document.querySelector("#photo_pres");
  showLeftPart(photographer);
  let imgPart = photoImg(photographer.portrait, photographer.name);
  presentation.appendChild(imgPart);
}

showPresent(thePhotographerId);

// PARTIE GALERIE DE PHOTOGRAPHIES
// Récupère la lightbox cachée pour la fonction suivante.
let modal = document.getElementById("lightbox_section");
let lightboxImg = document.getElementById("lightbox-img");

// Récupère le header et le "main" à cacher pour la fonction suivante.
let photoHeader = document.getElementById("photo_header");
let photoMain = document.getElementById("photo_main");

// Chaque carte de la page de photographe : Récupère dynamiquement l'image pour le lien.
// Ceci ferme le header et le "main" et ouvre la lightbox.
function photoPhotoLink(photographerId, image, title, description) {
  let photoLink = document.createElement("a");
  photoLink.className = "dyn_photo_photoLink";
  photoLink.setAttribute("aria-label", "Photographie");
  let photoLinkImg = document.createElement("img");
  photoLinkImg.src = "Images/" + photographerId + "/" + image;
  photoLinkImg.className = "dyn_photo_img";
  photoLinkImg.onclick = function(event) {
    event.preventDefault();
    photoHeader.style.display = "none";
    photoMain.style.display = "none";
    modal.style.display = "block";
    lightboxImg.src = this.src;
  }
  photoLink.setAttribute("lang", "en");
  photoLink.setAttribute("alt", description);
  photoLink.appendChild(photoLinkImg);
  return photoLink;
}

// Chaque carte de la page de photographe : Récupère dynamiquement les données pour la ligne de description.
function photoCardDescr(title, likes) {
  let description = document.createElement("div");
  description.className = "photo_card_titleLikes";
  description.setAttribute("lang", "en");
  let descriptionTitle = document.createElement("span");
  descriptionTitle.innerText = title;
  descriptionTitle.className = "dyn_title";
  descriptionTitle.setAttribute("aria-label", "Titre de la photo");
  let descriptionLikes = document.createElement("span");
  descriptionLikes.className = "dyn_likes";
  descriptionLikes.setAttribute("aria-label", "Likes de la photo");
  let descriptionLikesNumber = document.createElement("span");
  descriptionLikesNumber.innerText = likes;
  descriptionLikesNumber.setAttribute("aria-label", "Nombre de likes");
  let descriptionLikesIcon = document.createElement("img");
  descriptionLikesIcon.src = "Images/Icone-coeur.png";
  descriptionLikesIcon.className = "icone";
  descriptionLikes.setAttribute("alt", "Likes");
  descriptionLikes.setAttribute("type", "input"); // type "input" ou type "button" ?
  description.appendChild(descriptionTitle);
  descriptionLikes.appendChild(descriptionLikesNumber);
  descriptionLikes.appendChild(descriptionLikesIcon);
  description.appendChild(descriptionLikes);
  return description;
}

// Organise en carte toutes les données médias précédemment récupérées.
function fillArticle(picture) {
  let fullArticle = document.createElement("article");
  fullArticle.className = "photo_card";
  let link = photoPhotoLink(picture.photographerId, picture.image, picture.title, picture.description);
  let descr = photoCardDescr(picture.title, picture.likes);
  fullArticle.appendChild(link);
  fullArticle.appendChild(descr);
  return fullArticle;
}

// Montre toutes les cartes remplies dynamiquement.
async function showPhotos(id) {
  let pictures = await getMediasByPhotographers(id);
  let section = document.querySelector(".photo_photosLine");
  for (let picture of pictures) {
    let article = fillArticle(picture);
    section.appendChild(article);
  }
}

showPhotos(thePhotographerId);

// BOUTON DE CONTACT EN BAS EN VERSION MOBILE
// Récupère dynamiquement le lien de contact pour le bouton en version mobile.
function mobileContactButton(photographerId) {
  let buttonLink = document.createElement("a");
  buttonLink.href = "#";
  buttonLink.id = "dyn_photo_contact_link_mobile";
  buttonLink.setAttribute("aria-label", "Contact Me");
  buttonLink.onclick = function(event) {
    event.preventDefault();
    formModal.style.display = "block";
  }
  let buttonSpan = document.createElement("span");
  buttonSpan.innerText = "Contactez-moi";
  buttonLink.appendChild(buttonSpan);
  return buttonLink;
}

// Montre la section remplie dynamiquement.
function showMobileContact(id) {
  let section = document.querySelector("#mobile_contact_parent");
  let mobileContact = mobileContactButton(id);
  section.appendChild(mobileContact);
}

// PARTIE "LIKES ET PRIX" EN BAS A DROITE
// Likes et prix : Récupère dynamiquement le nombre total de likes et le prix du photographe.
function bottomRight(/*totalLikes, */id, photographerPrice) {
  let bottomRightDiv = document.createElement("div");
  bottomRightDiv.id = "likes_prix_child";
  let bottomRightLikes = document.createElement("span");
  bottomRightLikes.id = "dyn_likes";
  bottomRightLikes.setAttribute("aria-label", "Total des likes");
  let bottomRightLikesNumber = document.createElement("span");
  bottomRightLikesNumber.id = "dyn_likes_number";
  bottomRightLikesNumber.innerText = "680*";                                     // VARIABLE "totalLikes" A DEFINIR !!
  bottomRightLikesNumber.setAttribute("aria-label", "Nombre total des likes");
  let bottomRightLikesIcon = document.createElement("img");
  bottomRightLikesIcon.src = "Images/Icone-coeur-noir.png";
  bottomRightLikesIcon.className = "icone";
  bottomRightLikesIcon.id = "icone";
  bottomRightLikesIcon.setAttribute("alt", "Likes");
  let bottomRightPrice = document.createElement("span");
  bottomRightPrice.innerText = photographerPrice + "€ / jour";
  bottomRightPrice.className = "dyn_prix";
  bottomRightPrice.setAttribute("aria-label", "Prix du photographe");
  bottomRightLikes.appendChild(bottomRightLikesNumber);
  bottomRightLikes.appendChild(bottomRightLikesIcon);
  bottomRightDiv.appendChild(bottomRightLikes);
  bottomRightDiv.appendChild(bottomRightPrice);
  return bottomRightDiv;
}

// Montre la section remplie dynamiquement.
async function showLikesNPrice(/*totalLikes, */id, price) {
  let pictures = await getMediasByPhotographers(id);
  console.log(pictures);                                                             // A SUPPRIMER !!
  let section = document.querySelector("#likes_prix");
  for (let picture of pictures) {
    let likesNPrice = bottomRight(picture.likes, /*totalLikes, */price, id);
    //console.log(picture.likes);                                                 //    A SUPPRIMER !!
    section.appendChild(likesNPrice);
  }
  let valeurInitiale = 0;
  let somme = pictures.reduce((accumulateur, valeurCourante) => accumulateur + valeurCourante.likes, valeurInitiale);
  console.log("somme :", somme);                                                //    A SUPPRIMER !!
}

// FENETRE LIGHTBOX-MODAL
// Crée dynamiquement la lightbox pour chaque image.
function createLightbox(photographerId, image, title, description) {
  let lightboxMain = document.createElement("section");
  lightboxMain.id = "lightbox_main";
  lightboxMain.setAttribute("aria-label", "All the lightbox");

  let lightPrevLink = document.createElement("a");
  lightPrevLink.href = "#";
  lightPrevLink.className = "lightbox-icons";
  lightPrevLink.setAttribute("aria-label", "Previous image");

  let lightPrevIcon = document.createElement("img");
  lightPrevIcon.src = "Images/Icone-fleche-gauche.png";
  lightPrevIcon.className = "lightbox-icon";
  lightPrevIcon.setAttribute("alt", "Previous icon");

  let lightImgAndTitle = document.createElement("section");
  lightImgAndTitle.id = "lightbox-imgAndTitle";
  lightImgAndTitle.setAttribute("aria-label", "Media and title");

  let lightboxMedia = document.createElement("img");
  //lightboxMedia.src = "Images/" + photographerId + "/" + image;
  lightboxMedia.id = "lightbox-img";
  lightboxMedia.setAttribute("alt", description);

  let lightboxTitle = document.createElement("p");
  lightboxTitle.id = "lightbox-parag";
  lightboxTitle.innerHTML = title;

  let lightNextLink = document.createElement("a");
  lightNextLink.href = "#";
  lightNextLink.className = "lightbox-icons";
  lightNextLink.setAttribute("aria-label", "Next image");

  let lightNextIcon = document.createElement("img");
  lightNextIcon.src = "Images/Icone-fleche-droite.png";
  lightNextIcon.className = "lightbox-icon";
  lightNextIcon.setAttribute("alt", "Next icon");

  let lightboxClose = document.createElement("span");
  lightboxClose.className = "lightbox-icons";
  lightboxClose.id = "lightbox_close";
  lightboxClose.setAttribute("aria-label", "Close dialog");

  let lightCloseIcon = document.createElement("img");
  lightCloseIcon.src = "Images/Icone-croix.png";
  lightCloseIcon.className = "lightbox-icon";
  lightCloseIcon.setAttribute("alt", "Close button");

  lightPrevLink.appendChild(lightPrevIcon);
  lightImgAndTitle.appendChild(lightboxMedia);
  lightImgAndTitle.appendChild(lightboxTitle);
  lightNextLink.appendChild(lightNextIcon);
  lightboxClose.appendChild(lightCloseIcon);
  lightboxMain.appendChild(lightPrevLink);
  lightboxMain.appendChild(lightImgAndTitle);
  lightboxMain.appendChild(lightNextLink);
  lightboxMain.appendChild(lightboxClose);
  return lightboxMain;
}

// Montre la lightbox remplie dynamiquement.
/*async */function showLightbox(photographerId, image, title, description) {
  //let pictures = await getMediasByPhotographers(id);
  //console.log(pictures);
  let section = document.querySelector("#lightbox_section");
  //for (let picture of pictures) {
    let main = createLightbox(photographerId, image, title, description);
    section.appendChild(main);
  //}
}

showLightbox(thePhotographerId);

// Récupère le "span" qui ferme la lightbox.
let span = document.getElementById("lightbox_close");

// Au clic, ferme la lightbox et réouvre le header et le "main".
span.onclick = function() {
  modal.style.display = "none";
  photoHeader.style.display = "block";
  photoMain.style.display = "block";
}

// FENETRE FORM-MODAL
// Récupère le "span" qui ferme le formulaire.
let formSpan = document.getElementById("form_close");

// Au clic, ferme le formulaire.
formSpan.onclick = function() {
  formModal.style.display = "none";
}

// Récupère le "span" qui envoie les données.
let submitButton = document.getElementById("submit_button");

// Au clic, envoie les contenus dans la console.
let firstName = document.getElementById("prenom");
let lastName = document.getElementById("nom");
let eMail = document.getElementById("email");
let mess = document.getElementById("message");
submitButton.onclick = function() {
  console.log(firstName.value);
  console.log(lastName.value);
  console.log(eMail.value);
  console.log(mess.value);
}