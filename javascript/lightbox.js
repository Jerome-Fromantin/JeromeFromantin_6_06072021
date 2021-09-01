// LIGHTBOX
// Récupération des données "photographes" du fichier JSON.
import { getMediasByPhotographers } from './services';

// Récupère les parties nécessaires pour les 2 fonctions "initLightPic" et "initLightVid".
let pictures = [];
const photoHeader = document.getElementById('photo_header');
const photoMain = document.getElementById('photo_main');
const lightSection = document.querySelector('.lightbox_section');

// Permet de naviguer dans les médias.
function lightboxNavigate(index) {
  const menuSort = document.getElementById('menuTri');
  if (menuSort.value === 'likes') {
    pictures.sort((a, b) => b.likes - a.likes);
    if (index >= pictures.length) {
      // eslint-disable-next-line no-param-reassign
      index = 0;
    }
    if (index < 0) {
      // eslint-disable-next-line no-param-reassign
      index = pictures.length - 1;
    }
  }
  if (menuSort.value === 'date') {
    pictures.sort((a, b) => (a.date > b.date ? 1 : -1));
    if (index >= pictures.length) {
      // eslint-disable-next-line no-param-reassign
      index = 0;
    }
    if (index < 0) {
      // eslint-disable-next-line no-param-reassign
      index = pictures.length - 1;
    }
  }
  if (menuSort.value === 'title') {
    pictures.sort((a, b) => (a.title > b.title ? 1 : -1));
    if (index >= pictures.length) {
      // eslint-disable-next-line no-param-reassign
      index = 0;
    }
    if (index < 0) {
      // eslint-disable-next-line no-param-reassign
      index = pictures.length - 1;
    }
  }

  const media = pictures[index];
  // eslint-disable-next-line object-curly-newline
  const { photographerId, image, video, title, likes, date, description } = media;

  if (video) {
    // eslint-disable-next-line no-use-before-define
    showLightVid(photographerId, image, video, title, likes, date, description, index);
  } else {
    // eslint-disable-next-line no-use-before-define
    showLightPic(photographerId, image, video, title, likes, date, description, index);
  }
}

// Crée la lightbox elle-même pour les images.
function createLightPic(id, image, video, title, likes, date, description, index) {
  const lightboxMain = document.createElement('section');
  lightboxMain.id = 'lightbox_main';
  lightboxMain.setAttribute('aria-label', 'Lightbox');

  const lightPrevLink = document.createElement('a');
  lightPrevLink.href = '';
  lightPrevLink.className = 'lightbox-icons';
  function clickPrev(e) {
    e.preventDefault();
    lightboxNavigate(index - 1);
  }
  lightPrevLink.addEventListener('click', clickPrev);
  function keyDownPrev(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      lightboxNavigate(index - 1);
    }
  }
  lightPrevLink.addEventListener('keydown', keyDownPrev);

  const lightPrevIcon = document.createElement('img');
  lightPrevIcon.src = 'Images/Icone-fleche-gauche.png';
  lightPrevIcon.className = 'lightbox-icon';
  lightPrevIcon.setAttribute('alt', 'Previous image');

  lightPrevLink.appendChild(lightPrevIcon);
  lightboxMain.appendChild(lightPrevLink);

  const lightImgAndTitle = document.createElement('section');
  lightImgAndTitle.id = 'lightbox-imgAndTitle';
  lightImgAndTitle.setAttribute('aria-label', 'Media and title');

  const lightboxMedia = document.createElement('img');
  lightboxMedia.src = `Images/${id}/${image}`;
  lightboxMedia.id = 'lightbox-img';
  lightboxMedia.setAttribute('alt', description);

  const lightboxTitle = document.createElement('p');
  lightboxTitle.id = 'lightbox-parag';
  lightboxTitle.innerText = title;

  lightImgAndTitle.appendChild(lightboxMedia);
  lightImgAndTitle.appendChild(lightboxTitle);
  lightboxMain.appendChild(lightImgAndTitle);

  const lightNextLink = document.createElement('a');
  lightNextLink.href = '';
  lightNextLink.className = 'lightbox-icons';
  function clickNext(e) {
    e.preventDefault();
    lightboxNavigate(index + 1);
  }
  lightNextLink.addEventListener('click', clickNext);
  function keyDownNext(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      lightboxNavigate(index + 1);
    }
  }
  lightNextLink.addEventListener('keydown', keyDownNext);

  const lightNextIcon = document.createElement('img');
  lightNextIcon.src = 'Images/Icone-fleche-droite.png';
  lightNextIcon.className = 'lightbox-icon';
  lightNextIcon.setAttribute('alt', 'Next image');

  lightNextLink.appendChild(lightNextIcon);
  lightboxMain.appendChild(lightNextLink);

  const lightboxClose = document.createElement('a');
  lightboxClose.href = '';
  lightboxClose.className = 'lightbox-icons';
  lightboxClose.id = 'lightbox_close';
  function clickClose(e) {
    e.preventDefault();
    lightSection.style.display = 'none';
    lightSection.classList.remove('lightbox_section_on');
    lightSection.classList.add('lightbox_section');
    photoHeader.style.display = 'flex';
    photoMain.style.display = 'flex';
  }
  lightboxClose.addEventListener('click', clickClose);
  function keyDownClose(e) {
    if (e.keyCode === 27) {
      clickClose(e);
    }
  }
  lightboxClose.addEventListener('keydown', keyDownClose);

  const lightCloseIcon = document.createElement('img');
  lightCloseIcon.src = 'Images/Icone-croix.png';
  lightCloseIcon.className = 'lightbox-icon';
  lightCloseIcon.setAttribute('alt', 'Close dialog');

  lightboxClose.appendChild(lightCloseIcon);
  lightboxMain.appendChild(lightboxClose);

  return lightboxMain;
}

// Montre la lightbox pour les images quand elle est créée.
function showLightPic(photographerId, image, video, title, likes, date, description, index) {
  const section = document.querySelector('.lightbox_section_on');
  section.innerText = '';
  const lightPic = createLightPic(photographerId, image, video, title, likes, date,
    description, index);
  section.appendChild(lightPic);
}

// Crée l'environnement pour la lightbox pour les images.
export const initLightPic = async (photographerId, image, video, title, likes, date,
  description, index) => {
  pictures = await getMediasByPhotographers(photographerId);
  photoHeader.style.display = 'none';
  photoMain.style.display = 'none';
  lightSection.style.display = 'block';
  lightSection.classList.remove('lightbox_section');
  lightSection.classList.add('lightbox_section_on');
  lightSection.setAttribute('role', 'dialog');
  showLightPic(photographerId, image, video, title, likes, date, description, index);
};

// Crée la lightbox elle-même pour les vidéos.
function createLightVid(id, image, video, title, likes, date, description, index) {
  const lightboxMain = document.createElement('section');
  lightboxMain.id = 'lightbox_main';
  lightboxMain.setAttribute('aria-label', 'All the lightbox');

  const lightPrevLink = document.createElement('a');
  lightPrevLink.href = '';
  lightPrevLink.className = 'lightbox-icons';
  function clickPrev(e) {
    e.preventDefault();
    lightboxNavigate(index - 1);
  }
  lightPrevLink.addEventListener('click', clickPrev);
  function keyDownPrev(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      lightboxNavigate(index - 1);
    }
  }
  lightPrevLink.addEventListener('keydown', keyDownPrev);

  const lightPrevIcon = document.createElement('img');
  lightPrevIcon.src = 'Images/Icone-fleche-gauche.png';
  lightPrevIcon.className = 'lightbox-icon';
  lightPrevIcon.setAttribute('alt', 'Previous image');

  lightPrevLink.appendChild(lightPrevIcon);
  lightboxMain.appendChild(lightPrevLink);

  const lightImgAndTitle = document.createElement('section');
  lightImgAndTitle.id = 'lightbox-imgAndTitle';
  lightImgAndTitle.setAttribute('aria-label', 'Media and title');

  const lightboxMedia = document.createElement('video');
  lightboxMedia.id = 'lightbox-img';
  lightboxMedia.innerText = 'Your browser does not support the video tag.';
  lightboxMedia.setAttribute('alt', description);
  lightboxMedia.setAttribute('controls', '');

  const lightboxMediaSrc = document.createElement('source');
  lightboxMediaSrc.src = `Images/${id}/${video}`;

  const lightboxTitle = document.createElement('p');
  lightboxTitle.id = 'lightbox-parag';
  lightboxTitle.innerText = title;

  lightboxMedia.appendChild(lightboxMediaSrc);
  lightImgAndTitle.appendChild(lightboxMedia);
  lightImgAndTitle.appendChild(lightboxTitle);
  lightboxMain.appendChild(lightImgAndTitle);

  const lightNextLink = document.createElement('a');
  lightNextLink.href = '#';
  lightNextLink.className = 'lightbox-icons';
  function clickNext(e) {
    e.preventDefault();
    lightboxNavigate(index + 1);
  }
  lightNextLink.addEventListener('click', clickNext);
  function keyDownNext(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      lightboxNavigate(index + 1);
    }
  }
  lightNextLink.addEventListener('keydown', keyDownNext);

  const lightNextIcon = document.createElement('img');
  lightNextIcon.src = 'Images/Icone-fleche-droite.png';
  lightNextIcon.className = 'lightbox-icon';
  lightNextIcon.setAttribute('alt', 'Next image');

  lightNextLink.appendChild(lightNextIcon);
  lightboxMain.appendChild(lightNextLink);

  const lightboxClose = document.createElement('a');
  lightboxClose.href = '';
  lightboxClose.className = 'lightbox-icons';
  lightboxClose.id = 'lightbox_close';
  function clickClose(e) {
    e.preventDefault();
    lightSection.style.display = 'none';
    lightSection.classList.remove('lightbox_section_on');
    lightSection.classList.add('lightbox_section');
    photoHeader.style.display = 'flex';
    photoMain.style.display = 'flex';
  }
  lightboxClose.addEventListener('click', clickClose);
  function keyDownClose(e) {
    if (e.keyCode === 27) {
      clickClose(e);
    }
  }
  lightboxClose.addEventListener('keydown', keyDownClose);

  const lightCloseIcon = document.createElement('img');
  lightCloseIcon.src = 'Images/Icone-croix.png';
  lightCloseIcon.className = 'lightbox-icon';
  lightCloseIcon.setAttribute('alt', 'Close dialog');

  lightboxClose.appendChild(lightCloseIcon);
  lightboxMain.appendChild(lightboxClose);

  return lightboxMain;
}

// Montre la lightbox pour les vidéos quand elle est créée.
function showLightVid(photographerId, image, video, title, likes, date, description, index) {
  const section = document.querySelector('.lightbox_section_on');
  section.innerText = '';
  const lightVid = createLightVid(photographerId, image, video, title, likes, date,
    description, index);
  section.appendChild(lightVid);
}

// Crée l'environnement pour la lightbox pour les vidéos.
export const initLightVid = async (photographerId, image, video, title, likes, date,
  description, index) => {
  pictures = await getMediasByPhotographers(photographerId);
  photoHeader.style.display = 'none';
  photoMain.style.display = 'none';
  lightSection.style.display = 'block';
  lightSection.classList.remove('lightbox_section');
  lightSection.classList.add('lightbox_section_on');
  lightSection.setAttribute('role', 'dialog');
  showLightVid(photographerId, image, video, title, likes, date, description, index);
};
