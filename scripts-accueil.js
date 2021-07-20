// Récupération des données "photographes" du fichier JSON.
import {getPhotographers} from "./services";
//console.log(photographers)

// PAGE D'ACCUEIL
// Chaque carte de la page d'accueil : Récupère dynamiquement l'image et le nom pour le lien.
function homePhotoLink(portrait, name, id) {
  let link = document.createElement("a");
  link.href = "photographer-page.html?id=" + id;
  link.className = "dyn_home_photoLink";
  link.setAttribute("aria-label", name);
  let linkImg = document.createElement("img");
  linkImg.src = "Images/ID_Photos/" + portrait;
  linkImg.className = "dyn_round_img";
  let linkH2 = document.createElement("h2");
  linkH2.innerText = name;
  linkH2.className = "dyn_home_h2";
  link.appendChild(linkImg);
  link.appendChild(linkH2);
  return link;
}

// Chaque carte de la page d'accueil : Récupère dynamiquement les données pour les 3 lignes de description.
function homeCardDescr(city, country, tagline, price) {
  let description = document.createElement("div");
  description.className = "dyn_home_card_descr";
  let descriptionPlace = document.createElement("p");
  descriptionPlace.innerText = city + ", " + country;
  descriptionPlace.className = "dyn_home_card_lieu";
  descriptionPlace.setAttribute("lang", "en");
  descriptionPlace.setAttribute("aria-label", city + ", " + country);
  let descriptionSlogan = document.createElement("p");
  descriptionSlogan.innerText = tagline;
  descriptionSlogan.className = "dyn_home_card_slogan";
  descriptionSlogan.setAttribute("aria-label", tagline);
  let descriptionPrix = document.createElement("p");
  descriptionPrix.innerText = price + "€/jour";
  descriptionPrix.className = "dyn_home_card_prix";
  descriptionPrix.setAttribute("aria-label", price);
  description.appendChild(descriptionPlace);
  description.appendChild(descriptionSlogan);
  description.appendChild(descriptionPrix);
  return description;
}

// Chaque carte de la page d'accueil : Récupère dynamiquement les données pour les tags.
function homeCardTags(tags) {
  let tagGroup = document.createElement("nav");
  tagGroup.className = "barnav";
  tagGroup.setAttribute("lang", "en");
  tagGroup.setAttribute("aria-label", "Catégories du photographe");
  for (let tag of tags) {
    let tagGroupLink = document.createElement("a");
    tagGroupLink.href = "#";
    tagGroupLink.className = "tag";
    tagGroupLink.id = "tag";
    tagGroupLink.setAttribute("aria-label", tag);
    let tagGroupSpan = document.createElement("span");
    tagGroupSpan.innerText = "#" + tag;
    tagGroupLink.appendChild(tagGroupSpan);
    tagGroup.appendChild(tagGroupLink);
  }
  return tagGroup;
}

// Organise en carte toutes les données précédemment récupérées.
function fillArticle(photographer) {
  let fullArticle = document.createElement("article");
  fullArticle.className = "home_card";
  let link = homePhotoLink(photographer.portrait, photographer.name, photographer.id)
  let descr = homeCardDescr(photographer.city, photographer.country, photographer.tagline, photographer.price)
  let tags = homeCardTags(photographer.tags);
  fullArticle.appendChild(link);
  fullArticle.appendChild(descr);
  fullArticle.appendChild(tags);
  return fullArticle;
}

// Montre toutes les cartes remplies dynamiquement.
async function show() {
  let photographers = await getPhotographers();
  let section = document.querySelector(".main_section");
  for (let photographer of photographers) {
    let article = fillArticle(photographer);
    section.appendChild(article);
  }
}

show();

/* Fonctions à venir pour pages dynamiques. 
function getURL() {
  alert("The URL of this page is : " + window.location.href);
}
// .href, .protocol, .host, .hostname, .port, .pathname, .search, .hash
function newDoc() {
  window.location.assign("https://w3schools.com")
}

function getName() {
  alert("Le nom du photographe est : " + photographers[0].name);
}*/

/* Query parameters */
/*
Ex : localhost:3000/?name=Jerome
Le "?" introduit le query param représenté par la clé "name"
qui a pour valeur "Jerome".

Pour y accéder ensuite, on utilise URLSearchParams() et la méthode get().
Ex:
//window.location.search = ?name=Jerome
let params = new URLSearchParams(window.location.search);
let userName = params.get("name");
console.log(userName); // Affiche "Jerome".

Avec plusieurs paramètres.
Ex : localhost:3000/?name=Jerome&age=50

Pour y accéder ensuite, on utilise la même méthode.
Ex:
//window.location.search = ?name=Jerome&age=50
let params = new URLSearchParams(window.location.search);
let userName = params.get("name");
let userAge = params.get("age");
console.log(userName); // Affiche "Jerome".
console.log(userAge); // Affiche "50".

Pour vérifier si une URL a certains paramètres ou non, il faut utiliser la méthode has().
params.has("name"); // true
params.has("place"); // false

Autres méthodes :
console.log(params.getAll("age")); // ["50"]
console.log(params.toString()); // "?name=Jerome&age=50"
console.log(params.append("active", "1")); // "?name=Jerome&age=50&active=1"

let keys = params.keys();
for (key of keys) {
  console.log(key);
}
// Affiche "name", "age", "active".

let values = params.values();
for (value of values) {
  console.log(value);
}
// Affiche "Jerome", "50", "1".

let entries = params.entries();
for (pair of entries) {
  console.log(pair[0], pair[1]);
}
// Affiche "["name", "Jerome"]", "["age", "50"]".
*/