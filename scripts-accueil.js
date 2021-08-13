// Récupération des données "photographes" du fichier JSON.
import {getPhotographers} from "./services";

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

let photographers = [];

// Montre toutes les cartes remplies dynamiquement (1ère partie).
async function showPhotographers1() {
  photographers = await getPhotographers();
  showPhotographers2(photographers);
}
showPhotographers1();

// Montre toutes les cartes remplies dynamiquement (2ème partie).
function showPhotographers2(photographers) {
  let section = document.querySelector(".main_section");
  section.innerText = "";
  for (let photographer of photographers) {
    let article = fillArticle(photographer);
    section.appendChild(article);
  }
}

// Récupère chacun des tags et leur valeur pour la fonction suivante.
let tags = document.querySelectorAll(".barnavTag");
let el = null;
let target = null;
tags.forEach((tag) => {
  tag.addEventListener("click", clickGetTag);
  function clickGetTag(el) {
    target = el.currentTarget;
    let tagValue = target.id;
    showByTag(tagValue);
  };
  tag.addEventListener("keydown", keyDownGetTag);
  function keyDownGetTag(e, el) {
    if (e.key == "Enter") {
      //clickGetTag(el);
      target = el.currentTarget;
      // A chaque appui sur "Entrée", la ligne ci-dessus provoque l'erreur "el is undefined"...
      let tagValue = target.id;
      showByTag(tagValue);
    }
  };
});

// Montre les photographes en fonction du tag choisi.
function showByTag(tag) {
  let photographersByTag = photographers.filter(function(element) {
    if (element.tags.includes(tag)) {
      return element;
    }
  });
  showPhotographers2(photographersByTag);
}

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