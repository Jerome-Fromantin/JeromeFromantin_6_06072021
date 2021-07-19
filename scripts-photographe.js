// Récupération des données "photographes" du fichier JSON.
let {photographers} = await fetch("FishEyeData.json").then((res)=>res.json())
console.log(photographers);

// PAGE DE PHOTOGRAPHE
// Récupération de l'id du photographe concerné.
let param = new URLSearchParams(window.location.search);
let thePhotographerId = param.get("id");

// A partir de l'id, récupération des données du photographe concerné.
function findPhotographer(data) {
  return data.id == thePhotographerId;
}
let photographer = photographers.find(findPhotographer);
let photographerName = photographer.name;
let photographerCity = photographer.city;
let photographerCountry = photographer.country;
let photographerTagline = photographer.tagline;
let photographerTags = photographer.tags;
let photographerPortrait = photographer.portrait;
let photographerPrice = photographer.price;

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
  description.className = "dyn_photo_pres_descr"; // Classe inutilisée.
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

// Partie gauche de la présentation : Récupère dynamiquement le lien de contact pour le bouton.
function contactButton(photographerId) {
  let buttonLink = document.createElement("a");
  buttonLink.href = "contact.html?id=" + photographerId;
  buttonLink.id = "dyn_photo_contact_link";
  buttonLink.setAttribute("aria-label", "Contact Me");
  let buttonSpan = document.createElement("span");
  buttonSpan.innerText = "Contactez-moi";
  buttonLink.appendChild(buttonSpan);
  return buttonLink;
}

// Montre la partie gauche de la présentation (texte et bouton) remplie dynamiquement.
function showLeftPart() {
  let sectionleft = document.querySelector("#photo_pres_text");
  let leftPart = fillLeftPart(photographerName, photographerCity, photographerCountry, photographerTagline, photographerTags);
  let contact = contactButton(thePhotographerId);
  sectionleft.appendChild(leftPart);
  sectionleft.appendChild(contact);
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
function showPresent() {
  let presentation = document.querySelector("#photo_pres");
  showLeftPart();
  let imgPart = photoImg(photographerPortrait, photographerName);
  presentation.appendChild(imgPart);
}

showPresent();

// PARTIE GALERIE DE PHOTOGRAPHIES
// Récupération des données "médias" du fichier JSON.
let {media} = await fetch("FishEyeData.json").then((res)=>res.json())
console.log(media);

// Récupération par filtration des médias du photographe concerné.
function filterPictures(data) {
  return data.photographerId == thePhotographerId;
}
let pictures = media.filter(filterPictures);
console.log(pictures);

// Chaque carte de la page de photographe : Récupère dynamiquement l'image pour le lien.
function photoPhotoLink(photographerId, image) {
  let photoLink = document.createElement("a");
  photoLink.href = "#";
  photoLink.className = "dyn_photo_photoLink";
  photoLink.setAttribute("aria-label", "Photographie");
  let photoLinkImg = document.createElement("img");
  photoLinkImg.src = "Images/" + photographerId + "/" + image;
  photoLinkImg.className = "dyn_photo_img";
  photoLink.setAttribute("lang", "en");
  photoLink.setAttribute("alt", "Value");
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
  let link = photoPhotoLink(picture.photographerId, picture.image);
  let descr = photoCardDescr(picture.title, picture.likes);
  fullArticle.appendChild(link);
  fullArticle.appendChild(descr);
  return fullArticle;
}

// Montre toutes les cartes remplies dynamiquement.
function showPhotos() {
  let section = document.querySelector(".photo_photosLine");
  for (let picture of pictures) {
    let article = fillArticle(picture);
    section.appendChild(article);
  }
}

showPhotos();

// PARTIE "LIKES ET PRIX" EN BAS A DROITE
// Likes et prix : Récupère dynamiquement le nombre total de likes et le prix du photographe.
function bottomRight(/*totalLikes, */photographerPrice) {
  let bottomRightDiv = document.createElement("div");
  bottomRightDiv.id = "likes_prix2";                                     // A MODIFIER !!
  let bottomRightLikes = document.createElement("span");
  bottomRightLikes.className = "dyn_likes";
  bottomRightLikes.setAttribute("aria-label", "Total des likes");
  let bottomRightLikesNumber = document.createElement("span");
  bottomRightLikesNumber.innerText = "340";                          // VARIABLE "totalLikes" A DEFINIR !!
  console.log(bottomRightLikesNumber.innerText);
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
function showLikesNPrice() {
  let section = document.querySelector("#likes_prix");
  let likesNPrice = bottomRight(/*totalLikes, */photographerPrice);
  section.appendChild(likesNPrice);
}

showLikesNPrice();