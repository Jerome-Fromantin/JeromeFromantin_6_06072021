// Récupération des données du fichier JSON.
let {photographers} = await fetch("FishEyeData.json").then((res)=>res.json())
console.log(photographers);

// PAGE DE PHOTOGRAPHE
// Récupération de l'id du photographe concerné.
let param = new URLSearchParams(window.location.search);
let photographerId = param.get("id");

// A partir de l'id, récupération des données du photographe concerné.
function findPhotographer(data) {
  return data.id == photographerId;
}
let photographer = photographers.find(findPhotographer);
let photographerName = photographer.name;
let photographerCity = photographer.city;
let photographerCountry = photographer.country;
let photographerTagline = photographer.tagline;
let photographerTags = photographer.tags;
let photographerPortrait = photographer.portrait;

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
  let contact = contactButton(photographerId);
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
  //let textPart = showLeftPart(photographerName, photographerCity, photographerCountry, photographerTagline, photographerTags, photographerId);
  let imgPart = photoImg(photographerPortrait, photographerName);
  //presentation.appendChild(textPart);
  presentation.appendChild(imgPart);
}

showPresent();