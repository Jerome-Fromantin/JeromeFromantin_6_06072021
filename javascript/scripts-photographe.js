/* eslint-disable no-console */
// Récupération des données "photographes" du fichier JSON.
import { getPhotographer, getMediasByPhotographers } from './services';

// PAGE DE PHOTOGRAPHE
// Récupération des données dynamiques pour chaque média de la lightbox.
import MediaFactory from './mediaFactory';

// Récupère dynamiquement l'id du photographe concerné.
const param = new URLSearchParams(window.location.search);
const thePhotographerId = param.get('id');

// PARTIE PRESENTATION DU PHOTOGRAPHE
// Partie gauche de la présentation : Récupère dynamiquement le nom pour le h1.
function photoH1(photographerName) {
  const title = document.createElement('h1');
  title.innerText = photographerName;
  title.id = 'dyn_photo_h1';
  return title;
}

// Partie gauche de la présentation :
// Récupère dynamiquement les données pour les 2 lignes de description.
function photoDescr(photographerCity, photographerCountry, photographerTagline) {
  const description = document.createElement('div');
  const descriptionPlace = document.createElement('p');
  descriptionPlace.innerText = `${photographerCity}, ${photographerCountry}`;
  descriptionPlace.id = 'dyn_photo_pres_lieu';
  descriptionPlace.setAttribute('lang', 'en');
  descriptionPlace.setAttribute('aria-label', `${photographerCity}, ${photographerCountry}`);
  const descriptionSlogan = document.createElement('p');
  descriptionSlogan.innerText = photographerTagline;
  descriptionSlogan.id = 'dyn_photo_pres_slogan';
  descriptionSlogan.setAttribute('aria-label', photographerTagline);
  description.appendChild(descriptionPlace);
  description.appendChild(descriptionSlogan);
  return description;
}

// Partie gauche de la présentation : Récupère dynamiquement les données pour les tags.
function photoTags(photographerTags) {
  const tagGroup = document.createElement('nav');
  tagGroup.id = 'dyn_photo_pres_barnav';
  tagGroup.setAttribute('lang', 'en');
  tagGroup.setAttribute('aria-label', 'Catégories du photographe');
  // eslint-disable-next-line no-restricted-syntax
  for (const photographerTag of photographerTags) {
    const tagGroupLink = document.createElement('a');
    tagGroupLink.href = '#';
    tagGroupLink.className = 'photo_pres_tag';
    tagGroupLink.setAttribute('aria-label', photographerTag);
    const tagGroupspan = document.createElement('span');
    tagGroupspan.innerText = `#${photographerTag}`;
    tagGroupLink.appendChild(tagGroupspan);
    tagGroup.appendChild(tagGroupLink);
  }
  return tagGroup;
}

// Organise toutes les données précédemment récupérées.
function fillLeftPart(photographerName, photographerCity, photographerCountry,
  photographerTagline, photographerTags) {
  const leftPart = document.createElement('section');
  leftPart.id = 'photo_pres_leftText';
  const title = photoH1(photographerName);
  const descr = photoDescr(photographerCity, photographerCountry, photographerTagline);
  const tags = photoTags(photographerTags);
  leftPart.appendChild(title);
  leftPart.appendChild(descr);
  leftPart.appendChild(tags);
  return leftPart;
}

// Récupère le formulaire caché et définit "photographer".
const formModal = document.getElementById('form_section');
let photographer = null;

// FENETRE FORM-MODAL
// Crée dynamiquement le formulaire pour chaque photographe.
function createForm() {
  const formMain = document.createElement('form');
  formMain.id = 'form_main';
  formMain.setAttribute('action', '');
  formMain.setAttribute('method', 'POST');

  const formH1 = document.createElement('h1');
  formH1.id = 'form_h1';
  formH1.innerHTML = `Contactez-moi<br>${photographer.name}`;
  formH1.setAttribute('aria-label', 'Contact me');

  formMain.appendChild(formH1);

  const divPrenom = document.createElement('div');
  divPrenom.className = 'form_div';
  const labelPrenom = document.createElement('label');
  labelPrenom.id = 'label_prenom';
  labelPrenom.innerText = 'Prénom';
  labelPrenom.setAttribute('for', 'prenom');
  labelPrenom.setAttribute('aria-label', 'First name');
  const brPrenom = document.createElement('br');
  const inputPrenom = document.createElement('input');
  inputPrenom.id = 'prenom';
  inputPrenom.type = 'text';
  inputPrenom.setAttribute('aria-labelledby', 'label_prenom');

  divPrenom.appendChild(labelPrenom);
  divPrenom.appendChild(brPrenom);
  divPrenom.appendChild(inputPrenom);
  formMain.appendChild(divPrenom);

  const divNom = document.createElement('div');
  divNom.className = 'form_div';
  const labelNom = document.createElement('label');
  labelNom.id = 'label_nom';
  labelNom.innerText = 'Nom';
  labelNom.setAttribute('for', 'nom');
  labelNom.setAttribute('aria-label', 'Last name');
  const brNom = document.createElement('br');
  const inputNom = document.createElement('input');
  inputNom.id = 'nom';
  inputNom.type = 'text';
  inputNom.setAttribute('aria-labelledby', 'label_nom');

  divNom.appendChild(labelNom);
  divNom.appendChild(brNom);
  divNom.appendChild(inputNom);
  formMain.appendChild(divNom);

  const divEmail = document.createElement('div');
  divEmail.className = 'form_div';
  const labelEmail = document.createElement('label');
  labelEmail.id = 'label_email';
  labelEmail.innerText = 'Email';
  labelEmail.setAttribute('for', 'email');
  labelEmail.setAttribute('aria-label', 'Email');
  const brEmail = document.createElement('br');
  const inputEmail = document.createElement('input');
  inputEmail.id = 'email';
  inputEmail.type = 'email';
  inputEmail.setAttribute('aria-labelledby', 'label_email');

  divEmail.appendChild(labelEmail);
  divEmail.appendChild(brEmail);
  divEmail.appendChild(inputEmail);
  formMain.appendChild(divEmail);

  const divMessage = document.createElement('div');
  divMessage.className = 'form_div';
  const labelMessage = document.createElement('label');
  labelMessage.id = 'label_message';
  labelMessage.innerText = 'Votre message';
  labelMessage.setAttribute('for', 'message');
  labelMessage.setAttribute('aria-label', 'Your message');
  const brMessage = document.createElement('br');
  const inputMessage = document.createElement('textarea');
  inputMessage.id = 'message';
  inputMessage.setAttribute('rows', '5');
  inputMessage.setAttribute('aria-labelledby', 'label_message');

  divMessage.appendChild(labelMessage);
  divMessage.appendChild(brMessage);
  divMessage.appendChild(inputMessage);
  formMain.appendChild(divMessage);

  const divSubmit = document.createElement('div');
  divSubmit.className = 'form_div';
  divSubmit.id = 'form_submit';
  const submitLink = document.createElement('a');
  submitLink.id = 'submit_button';
  submitLink.href = '';
  submitLink.innerText = 'Envoyer';
  submitLink.setAttribute('aria-label', 'Send');
  function clickSubmitForm(e) {
    e.preventDefault();
    console.log(inputPrenom.value);
    console.log(inputNom.value);
    console.log(inputEmail.value);
    console.log(inputMessage.value);
  }
  submitLink.addEventListener('click', clickSubmitForm);
  function keyDownSubmitForm(e) {
    if (e.key === 'Enter') {
      clickSubmitForm(e);
    }
  }
  submitLink.addEventListener('keydown', keyDownSubmitForm);

  divSubmit.appendChild(submitLink);
  formMain.appendChild(divSubmit);

  const closeLink = document.createElement('a');
  closeLink.id = 'form_close';
  closeLink.href = '';
  const closeLinkImg = document.createElement('img');
  closeLinkImg.id = 'form_close_icon';
  closeLinkImg.src = 'Images/Icone-croix-blanche.png';
  closeLinkImg.setAttribute('alt', 'Close Contact form');
  function clickCloseForm(e) {
    e.preventDefault();
    formModal.style.display = 'none';
  }
  closeLink.addEventListener('click', clickCloseForm);
  function keyDownCloseForm(e) {
    if (e.keyCode === 27) {
      clickCloseForm(e);
    }
  }
  closeLink.addEventListener('keydown', keyDownCloseForm);

  closeLink.appendChild(closeLinkImg);
  formMain.appendChild(closeLink);

  return formMain;
}

// Montre le formulaire rempli dynamiquement.
function showForm() {
  const section = document.querySelector('#form_section');
  section.innerText = '';
  section.setAttribute('role', 'dialog');
  section.setAttribute('aria-labelledby', 'form_h1');
  const formulaire = createForm();
  // createForm() se trouve en ligne 80.
  section.appendChild(formulaire);
}

// Partie gauche de la présentation : Le bouton de contact ouvre le formulaire.
function contactButton() {
  const buttonLink = document.createElement('a');
  buttonLink.href = '#';
  buttonLink.id = 'dyn_photo_contact_link';
  buttonLink.setAttribute('aria-label', 'Contact Me');
  function clickOpenForm(e) {
    e.preventDefault();
    formModal.style.display = 'block';
    showForm();
    // showForm se trouve en ligne 217.
  }
  buttonLink.addEventListener('click', clickOpenForm);
  function keyDownOpenForm(e) {
    if (e.key === 'Enter') {
      clickOpenForm(e);
    }
  }
  buttonLink.addEventListener('keydown', keyDownOpenForm);

  const buttonSpan = document.createElement('span');
  buttonSpan.innerText = 'Contactez-moi';
  buttonLink.appendChild(buttonSpan);
  return buttonLink;
}

// BOUTON DE CONTACT EN BAS EN VERSION MOBILE
// Récupère dynamiquement le lien de contact pour le bouton en version mobile.
function mobileContactButton() {
  const buttonLink = document.createElement('a');
  buttonLink.href = '#';
  buttonLink.id = 'dyn_photo_contact_link_mobile';
  buttonLink.setAttribute('aria-label', 'Contact Me');
  // eslint-disable-next-line func-names
  buttonLink.onclick = function (event) {
    event.preventDefault();
    formModal.style.display = 'block';
    showForm();
    // showForm se trouve en ligne 217.
  };
  const buttonSpan = document.createElement('span');
  buttonSpan.innerText = 'Contactez-moi';
  buttonLink.appendChild(buttonSpan);
  return buttonLink;
}

// Montre la section remplie dynamiquement.
function showMobileContact() {
  const section = document.querySelector('#mobile_contact_parent');
  const mobileContact = mobileContactButton();
  // mobileContactButton() se trouve en ligne 255.
  section.appendChild(mobileContact);
}

// Variable globale utilisée pour contenir les médias.
let pictures = [];

// PARTIE "LIKES ET PRIX" EN BAS A DROITE
// Likes et prix : Récupère dynamiquement le nombre total de likes et le prix du photographe.
async function bottomRight(id, photographerPrice) {
  pictures = await getMediasByPhotographers(id);
  const valeurInitiale = 0;
  const totalLikes = pictures.reduce((accumulateur, valeurCourante) => accumulateur
  + valeurCourante.likes, valeurInitiale);

  const bottomRightDiv = document.createElement('div');
  bottomRightDiv.id = 'likes_prix_child';
  const bottomRightLikes = document.createElement('span');
  bottomRightLikes.id = 'dyn_likes';
  bottomRightLikes.setAttribute('aria-label', 'Total des likes');
  const bottomRightLikesNumber = document.createElement('span');
  bottomRightLikesNumber.id = 'dyn_likes_number';
  bottomRightLikesNumber.innerText = totalLikes;
  bottomRightLikesNumber.setAttribute('aria-label', 'Nombre total des likes');
  const bottomRightLikesIcon = document.createElement('img');
  bottomRightLikesIcon.src = 'Images/Icone-coeur-noir.png';
  bottomRightLikesIcon.className = 'icone';
  bottomRightLikesIcon.id = 'icone';
  bottomRightLikesIcon.setAttribute('alt', 'Likes');
  const bottomRightPrice = document.createElement('span');
  bottomRightPrice.innerText = `${photographerPrice}€ / jour`;
  bottomRightPrice.className = 'dyn_prix';
  bottomRightPrice.setAttribute('aria-label', 'Prix du photographe');
  bottomRightLikes.appendChild(bottomRightLikesNumber);
  bottomRightLikes.appendChild(bottomRightLikesIcon);
  bottomRightDiv.appendChild(bottomRightLikes);
  bottomRightDiv.appendChild(bottomRightPrice);
  return bottomRightDiv;
}

// Montre la section remplie dynamiquement.
async function showLikesNPrice(id, photographerPrice) {
  const section = document.querySelector('#likes_prix');
  const likesNPrice = await bottomRight(id, photographerPrice);
  // bottomRight() se trouve en ligne 286.
  section.appendChild(likesNPrice);
}

// Montre la partie gauche de la présentation (texte et bouton) remplie dynamiquement.
// eslint-disable-next-line no-shadow
function showLeftPart(photographer) {
  const sectionleft = document.querySelector('#photo_pres_text');
  const leftPart = fillLeftPart(photographer.name, photographer.city, photographer.country,
    photographer.tagline, photographer.tags);
  const contact = contactButton();
  sectionleft.appendChild(leftPart);
  sectionleft.appendChild(contact);
  showMobileContact(photographer.id);
  // showMobileContact() se trouve en ligne 274.
  showLikesNPrice(photographer.id, photographer.price);
  // showLikesNPrice() se trouve en ligne 318.
}

// Partie droite de la présentation : Récupère dynamiquement le nom de l'image.
function photoImg(photographerPortrait, photographerName) {
  const image = document.createElement('img');
  image.src = `Images/ID_Photos/${photographerPortrait}`;
  image.className = 'dyn_round_img';
  image.id = 'dyn_photo_round_img';
  image.setAttribute('alt', photographerName);
  return image;
}

// Montre la présentation entière remplie dynamiquement.
async function showPresent(id) {
  photographer = await getPhotographer(id);
  const presentation = document.querySelector('#photo_pres');
  showLeftPart(photographer);
  const imgPart = photoImg(photographer.portrait, photographer.name);
  presentation.appendChild(imgPart);
}
showPresent(thePhotographerId);

// PARTIE GALERIE DE PHOTOGRAPHIES
// Montre toutes les cartes remplies dynamiquement, triées par défaut par "Popularité".
async function showPhotos(id) {
  pictures = await getMediasByPhotographers(id);
  pictures.sort((a, b) => b.likes - a.likes);
  const section = document.querySelector('.photo_gallery');
  // eslint-disable-next-line no-restricted-syntax
  for (const picture of pictures) {
    const index = pictures.indexOf(picture);
    const mediaType = picture.video ? 'vid' : 'pic';
    const article = new MediaFactory(mediaType, picture, index);
    section.appendChild(article.toHTML());
  }
}
showPhotos(thePhotographerId);

// LISTE DEROULANTE DE TRIS (POPULARITE, DATE, TITRE)
// Réalise les tris en fonction de chacune des 3 options.
async function showSortedPhotos(id) {
  pictures = await getMediasByPhotographers(id);
  const menuSort = document.getElementById('menuTri');
  // eslint-disable-next-line func-names
  menuSort.addEventListener('focus', function (event) {
    if (this.value === 'likes') {
      event.preventDefault();
      pictures.sort((a, b) => b.likes - a.likes);
      const section = document.querySelector('.photo_gallery');
      section.innerText = '';
      // eslint-disable-next-line no-restricted-syntax
      for (const picture of pictures) {
        const index = pictures.indexOf(picture);
        const mediaType = picture.video ? 'vid' : 'pic';
        const article = new MediaFactory(mediaType, picture, index);
        section.appendChild(article.toHTML());
      }
    }
    if (this.value === 'date') {
      event.preventDefault();
      pictures.sort((a, b) => (a.date > b.date ? 1 : -1));
      const section = document.querySelector('.photo_gallery');
      section.innerText = '';
      // eslint-disable-next-line no-restricted-syntax
      for (const picture of pictures) {
        const index = pictures.indexOf(picture);
        const mediaType = picture.video ? 'vid' : 'pic';
        const article = new MediaFactory(mediaType, picture, index);
        section.appendChild(article.toHTML());
      }
    }
    if (this.value === 'title') {
      event.preventDefault();
      pictures.sort((a, b) => (a.title > b.title ? 1 : -1));
      const section = document.querySelector('.photo_gallery');
      section.innerText = '';
      // eslint-disable-next-line no-restricted-syntax
      for (const picture of pictures) {
        const index = pictures.indexOf(picture);
        const mediaType = picture.video ? 'vid' : 'pic';
        const article = new MediaFactory(mediaType, picture, index);
        section.appendChild(article.toHTML());
      }
    }
  });
  // eslint-disable-next-line func-names
  menuSort.addEventListener('change', function (event) {
    if (this.value === 'likes') {
      event.preventDefault();
      pictures.sort((a, b) => b.likes - a.likes);
      const section = document.querySelector('.photo_gallery');
      section.innerText = '';
      // eslint-disable-next-line no-restricted-syntax
      for (const picture of pictures) {
        const index = pictures.indexOf(picture);
        const mediaType = picture.video ? 'vid' : 'pic';
        const article = new MediaFactory(mediaType, picture, index);
        section.appendChild(article.toHTML());
      }
    }
    if (this.value === 'date') {
      event.preventDefault();
      pictures.sort((a, b) => (a.date > b.date ? 1 : -1));
      const section = document.querySelector('.photo_gallery');
      section.innerText = '';
      // eslint-disable-next-line no-restricted-syntax
      for (const picture of pictures) {
        const index = pictures.indexOf(picture);
        const mediaType = picture.video ? 'vid' : 'pic';
        const article = new MediaFactory(mediaType, picture, index);
        section.appendChild(article.toHTML());
      }
    }
    if (this.value === 'title') {
      event.preventDefault();
      pictures.sort((a, b) => (a.title > b.title ? 1 : -1));
      const section = document.querySelector('.photo_gallery');
      section.innerText = '';
      // eslint-disable-next-line no-restricted-syntax
      for (const picture of pictures) {
        const index = pictures.indexOf(picture);
        const mediaType = picture.video ? 'vid' : 'pic';
        const article = new MediaFactory(mediaType, picture, index);
        section.appendChild(article.toHTML());
      }
    }
  });
}
showSortedPhotos(thePhotographerId);
