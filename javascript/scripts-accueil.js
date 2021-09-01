/* eslint-disable no-use-before-define */
/* eslint-disable array-callback-return */
// Récupération des données "photographes" du fichier JSON.
import { getPhotographers } from './services';

// PAGE D'ACCUEIL
// Récupération des données dynamiques pour chaque carte de la page d'accueil.
import ArticlePartFactory from './articlePartFactory';

let photographers = [];

// Montre toutes les cartes remplies dynamiquement (1ère partie).
async function showPhotographers1() {
  photographers = await getPhotographers();
  // eslint-disable-next-line no-use-before-define
  showPhotographers2(photographers);
}
showPhotographers1();

// Montre toutes les cartes remplies dynamiquement (2ème partie).
// eslint-disable-next-line no-shadow
function showPhotographers2(photographers) {
  const section = document.querySelector('.main_section');
  section.innerText = '';
  // eslint-disable-next-line no-restricted-syntax
  for (const photographer of photographers) {
    const article = fillArticle(photographer);
    section.appendChild(article);
  }
}

// Montre les photographes en fonction du tag choisi.
// Ce tag est soit dans la barre de navigation du haut en version desktop ou mobile,
// soit dans les cartes de photographes en dessous.
function showByTag(tag) {
  // eslint-disable-next-line consistent-return
  const photographersByTopTag = photographers.filter((element) => {
    if (element.tags.includes(tag)) {
      return element;
    }
  });
  showPhotographers2(photographersByTopTag);
}

// Organise en carte toutes les données précédemment récupérées.
function fillArticle(photographer) {
  const fullArticle = document.createElement('article');
  fullArticle.className = 'home_card';
  const link = new ArticlePartFactory('link', photographer);
  const descr = new ArticlePartFactory('descr', photographer);
  const tags = new ArticlePartFactory('tags', photographer, showByTag);
  fullArticle.appendChild(link.toHTML());
  fullArticle.appendChild(descr.toHTML());
  fullArticle.appendChild(tags.toHTML());
  return fullArticle;
}

// Récupère chacun des tags du haut en desktop et leur valeur pour la fonction suivante.
const topTags = document.querySelectorAll('.barnavTag');
let topTarget = null;
topTags.forEach((tag) => {
  tag.addEventListener('click', clickGetTag);
  function clickGetTag(el) {
    topTarget = el.currentTarget;
    const tagValue = topTarget.id;
    showByTag(tagValue);
  }
  tag.addEventListener('keydown', keyDownGetTag);
  function keyDownGetTag(el) {
    if (el.key === 'Enter') {
      clickGetTag(el);
    }
  }
});

// Récupère chacun des tags du haut en mobile et leur valeur pour la fonction précédente.
const topTagsMob = document.querySelectorAll('.barnavTagMob');
let topTargetMob = null;
topTagsMob.forEach((tag) => {
  tag.addEventListener('click', clickGetTag);
  function clickGetTag(el) {
    topTargetMob = el.currentTarget;
    const tagValue = topTargetMob.id.split('M')[0];
    showByTag(tagValue);
  }
  tag.addEventListener('keydown', keyDownGetTag);
  function keyDownGetTag(el) {
    if (el.key === 'Enter') {
      clickGetTag(el);
    }
  }
});
