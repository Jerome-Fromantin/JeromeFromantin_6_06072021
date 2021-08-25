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
  let tags = new ArticlePartFactory("tags", photographer, showByTag);
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

// Récupère chacun des tags du haut en desktop et leur valeur pour la fonction suivante.
let topTags = document.querySelectorAll(".barnavTag");
let topTarget = null;
topTags.forEach((tag) => {
  tag.addEventListener("click", clickGetTag);
  function clickGetTag(el) {
    topTarget = el.currentTarget;
    let tagValue = topTarget.id;
    showByTag(tagValue);
  };
  tag.addEventListener("keydown", keyDownGetTag);
  function keyDownGetTag(el) {
    if (el.key == "Enter") {
      clickGetTag(el);
    }
  };
});

// Montre les photographes en fonction du tag choisi.
// Ce tag est soit dans la barre de navigation du haut en version desktop ou mobile,
// soit dans les cartes de photographes en dessous.
function showByTag(tag) {
  let photographersByTopTag = photographers.filter(function(element) {
    if (element.tags.includes(tag)) {
      return element;
    }
  });
  showPhotographers2(photographersByTopTag);
}

// Récupère chacun des tags du haut en mobile et leur valeur pour la fonction précédente.
let topTagsMob = document.querySelectorAll(".barnavTagMob");
let topTargetMob = null;
topTagsMob.forEach((tag) => {
  tag.addEventListener("click", clickGetTag);
  function clickGetTag(el) {
    topTargetMob = el.currentTarget;
    let tagValue = topTargetMob.id.split("M")[0];
    showByTag(tagValue);
  };
  tag.addEventListener("keydown", keyDownGetTag);
  function keyDownGetTag(el) {
    if (el.key == "Enter") {
      clickGetTag(el);
    }
  };
});