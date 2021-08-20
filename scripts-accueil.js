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
let target = null;
tags.forEach((tag) => {
  tag.addEventListener("click", clickGetTag);
  function clickGetTag(el) {
    console.log(el);
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