// Récupération des données "photographes" du fichier JSON.
import {getPhotographers} from "./services";
import {getPhotographersByTags} from "./services";

// PAGE D'ACCUEIL
// Récupération des données dynamiques pour chaque carte de la page d'accueil.
import {ArticlePartFactory} from "./articlePartFactory";

// Organise en carte toutes les données précédemment récupérées.
function fillArticle(photographer) {
  let fullArticle = document.createElement("article");
  fullArticle.className = "home_card";
  let link = new ArticlePartFactory("link", photographer);
  let descr = new ArticlePartFactory("descr", photographer);
  let tags = new ArticlePartFactory("tags", photographer);
  fullArticle.appendChild(link.toHTML());
  fullArticle.appendChild(descr.toHTML());
  fullArticle.appendChild(tags.toHTML());
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

// Montre toutes les cartes remplies dynamiquement en fonction des tags.
async function showByTags() {
  let photographers = await getPhotographersByTags();
  console.log(photographers);                              // Donne un tableau vide...
  let section = document.querySelector(".main_section");
  let tags = document.querySelectorAll(".barnavTag");
  tags.onclick = function(event) {
    event.preventDefault();
    for (let photographer of photographers) {
      let article = fillArticle(photographer);
      section.appendChild(article);
    }
  }
}

showByTags();

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