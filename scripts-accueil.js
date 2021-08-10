// Récupération des données "photographes" du fichier JSON.
import {getPhotographers} from "./services";

// Récupération des données "photographes triés par tags".
// CES IMPORTS DEVRONT ETRE MODIFIES !!!
import {getPhotographersByTag1, getPhotographersByTag2, getPhotographersByTag3, getPhotographersByTag4} from "./services";
import {getPhotographersByTag5, getPhotographersByTag6, getPhotographersByTag7, getPhotographersByTag8} from "./services";

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
async function showPhotographers() {
  let photographers = await getPhotographers();
  let section = document.querySelector(".main_section");
  for (let photographer of photographers) {
    let article = fillArticle(photographer);
    section.appendChild(article);
  }
}

showPhotographers();

// IL FAUDRA RASSEMBLER LES 8 FONCTIONS SUIVANTES EN UNE SEULE !!!
// Montre toutes les cartes remplies dynamiquement en fonction du tag "Portrait".
async function showByTag1() {
  let photographers = await getPhotographersByTag1();
  let section = document.querySelector(".main_section");
  let tag1 = document.getElementById("portraitTag");
  tag1.onclick = function(event) {
    event.preventDefault();
    section.innerText = "";
    for (let photographer of photographers) {
      let article = fillArticle(photographer);
      section.appendChild(article);
    }
  }
}
showByTag1();

// Montre toutes les cartes remplies dynamiquement en fonction du tag "Art".
async function showByTag2() {
  let photographers = await getPhotographersByTag2();
  let section = document.querySelector(".main_section");
  let tag2 = document.getElementById("artTag");
  tag2.onclick = function(event) {
    event.preventDefault();
    section.innerText = "";
    for (let photographer of photographers) {
      let article = fillArticle(photographer);
      section.appendChild(article);
    }
  }
}
showByTag2();

// Montre toutes les cartes remplies dynamiquement en fonction du tag "Fashion".
async function showByTag3() {
  let photographers = await getPhotographersByTag3();
  let section = document.querySelector(".main_section");
  let tag3 = document.getElementById("fashionTag");
  tag3.onclick = function(event) {
    event.preventDefault();
    section.innerText = "";
    for (let photographer of photographers) {
      let article = fillArticle(photographer);
      section.appendChild(article);
    }
  }
}
showByTag3();

// Montre toutes les cartes remplies dynamiquement en fonction du tag "Architecture".
async function showByTag4() {
  let photographers = await getPhotographersByTag4();
  let section = document.querySelector(".main_section");
  let tag4 = document.getElementById("archiTag");
  tag4.onclick = function(event) {
    event.preventDefault();
    section.innerText = "";
    for (let photographer of photographers) {
      let article = fillArticle(photographer);
      section.appendChild(article);
    }
  }
}
showByTag4();

// Montre toutes les cartes remplies dynamiquement en fonction du tag "Travel".
async function showByTag5() {
  let photographers = await getPhotographersByTag5();
  let section = document.querySelector(".main_section");
  let tag5 = document.getElementById("travelTag");
  tag5.onclick = function(event) {
    event.preventDefault();
    section.innerText = "";
    for (let photographer of photographers) {
      let article = fillArticle(photographer);
      section.appendChild(article);
    }
  }
}
showByTag5();

// Montre toutes les cartes remplies dynamiquement en fonction du tag "Sport".
async function showByTag6() {
  let photographers = await getPhotographersByTag6();
  let section = document.querySelector(".main_section");
  let tag6 = document.getElementById("sportTag");
  tag6.onclick = function(event) {
    event.preventDefault();
    section.innerText = "";
    for (let photographer of photographers) {
      let article = fillArticle(photographer);
      section.appendChild(article);
    }
  }
}
showByTag6();

// Montre toutes les cartes remplies dynamiquement en fonction du tag "Animals".
async function showByTag7() {
  let photographers = await getPhotographersByTag7();
  let section = document.querySelector(".main_section");
  let tag7 = document.getElementById("animalsTag");
  tag7.onclick = function(event) {
    event.preventDefault();
    section.innerText = "";
    for (let photographer of photographers) {
      let article = fillArticle(photographer);
      section.appendChild(article);
    }
  }
}
showByTag7();

// Montre toutes les cartes remplies dynamiquement en fonction du tag "Events".
async function showByTag8() {
  let photographers = await getPhotographersByTag8();
  let section = document.querySelector(".main_section");
  let tag8 = document.getElementById("eventsTag");
  tag8.onclick = function(event) {
    event.preventDefault();
    section.innerText = "";
    for (let photographer of photographers) {
      let article = fillArticle(photographer);
      section.appendChild(article);
    }
  }
}
showByTag8();

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