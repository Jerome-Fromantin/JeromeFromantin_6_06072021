// Récupération des données "photographes" du fichier JSON.
import {getPhotographer, getMediasByPhotographers} from "./services";

// Récupération des données dynamiques pour chaque média de la lightbox.
//import {MediaFactory} from "./mediaFactory";

// PAGE DE PHOTOGRAPHE
// Récupère dynamiquement l'id du photographe concerné.
let param = new URLSearchParams(window.location.search);
let thePhotographerId = param.get("id");

// PARTIE PRESENTATION DU PHOTOGRAPHE
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

// Récupère le formulaire caché pour la fonction suivante.
let formModal = document.getElementById("form_section");

// Partie gauche de la présentation : Le bouton de contact ouvre le formulaire.
function contactButton() {
  let buttonLink = document.createElement("a");
  buttonLink.href = "#";
  buttonLink.id = "dyn_photo_contact_link";
  buttonLink.setAttribute("aria-label", "Contact Me");
  buttonLink.onclick = function(event) {
    event.preventDefault();
    formModal.style.display = "block";
    showForm();                                             // Voir à la ligne 629.
  }
  let buttonSpan = document.createElement("span");
  buttonSpan.innerText = "Contactez-moi";
  buttonLink.appendChild(buttonSpan);
  return buttonLink;
}

// Montre la partie gauche de la présentation (texte et bouton) remplie dynamiquement.
function showLeftPart(photographer) {
  let sectionleft = document.querySelector("#photo_pres_text");
  let leftPart = fillLeftPart(photographer.name, photographer.city, photographer.country, photographer.tagline, photographer.tags);
  let contact = contactButton();
  sectionleft.appendChild(leftPart);
  sectionleft.appendChild(contact);
  showMobileContact(photographer.id);                        // Voir à la ligne 314.
  showLikesNPrice(photographer.id, photographer.price);      // Voir à la ligne 353.
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

let photographer = null;

// Montre la présentation entière remplie dynamiquement.
async function showPresent(id) {
  photographer = await getPhotographer(id);
  let presentation = document.querySelector("#photo_pres");
  showLeftPart(photographer);
  let imgPart = photoImg(photographer.portrait, photographer.name);
  presentation.appendChild(imgPart);
}
showPresent(thePhotographerId);

// PARTIE GALERIE DE PHOTOGRAPHIES
// Récupère la lightbox cachée pour la fonction suivante.
let lightbox = document.getElementById("lightbox_section");

// Récupère le header et le "main" à cacher pour la fonction suivante.
let photoHeader = document.getElementById("photo_header");
let photoMain = document.getElementById("photo_main");

// Chaque carte de la page de photographe : Récupère dynamiquement l'image pour le lien.
// Cliquer sur l'image (ou "Enter" avec focus) ferme le header et le "main" et ouvre la lightbox.
function photoPhotoLink(photographerId, image, title, likes, date, description, index) {
  let photoLink = document.createElement("a");
  photoLink.href = "#";
  photoLink.className = "dyn_photo_photoLink";
  photoLink.setAttribute("aria-label", "Photographie");
  photoLink.addEventListener("click", clickOpenImg);
  function clickOpenImg(e) {
    e.preventDefault();
    photoHeader.style.display = "none";
    photoMain.style.display = "none";
    lightbox.style.display = "block";
    showLightbox(photographerId, image, title, likes, date, description, index);      // Voir à la ligne 471.
  };
  photoLink.addEventListener("keydown", keyDownOpenImg);
  function keyDownOpenImg(e) {
    if (e.key == "Enter") {
      clickOpenImg(e);
    }
  };
  let photoLinkImg = document.createElement("img");
  photoLinkImg.src = "Images/Thumbnails/" + photographerId + "/" + image;
  photoLinkImg.className = "dyn_photo_img";
  photoLink.setAttribute("lang", "en");
  photoLink.setAttribute("alt", description);
  photoLink.appendChild(photoLinkImg);
  return photoLink;
}

// Chaque carte de la page de photographe : Récupère dynamiquement les données pour la ligne de description.
function photoCardDescr(title, likes) {
  let description = document.createElement("div");
  description.className = "photo_card_titleLikes";
  description.setAttribute("lang", "en");
  let descriptionTitle = document.createElement("span");
  descriptionTitle.innerText = title;
  descriptionTitle.className = "dyn_title";
  descriptionTitle.setAttribute("aria-label", "Titre de la photo");
  let descriptionLikes = document.createElement("span");
  descriptionLikes.className = "dyn_likes";
  descriptionLikes.setAttribute("aria-label", "Likes de la photo");
  let descriptionLikesNumber = document.createElement("span");
  descriptionLikesNumber.innerText = likes;
  descriptionLikesNumber.setAttribute("aria-label", "Nombre de likes");
  let descriptionLikesIcon = document.createElement("img");
  descriptionLikesIcon.src = "Images/Icone-coeur.png";
  descriptionLikesIcon.className = "icone";
  descriptionLikesIcon.addEventListener("click", () => {
    descriptionLikesNumber.innerText = Number(descriptionLikesNumber.innerText) + 1;
    let newTotal = document.getElementById("dyn_likes_number");
    newTotal.innerText = Number(newTotal.innerText) + 1;
  })
  descriptionLikes.setAttribute("alt", "Likes");
  description.appendChild(descriptionTitle);
  descriptionLikes.appendChild(descriptionLikesNumber);
  descriptionLikes.appendChild(descriptionLikesIcon);
  description.appendChild(descriptionLikes);
  return description;
}

// Organise en carte toutes les données médias précédemment récupérées.
function fillArticle(picture, index) {
  let fullArticle = document.createElement("article");
  fullArticle.className = "photo_card";
  let link = photoPhotoLink(picture.photographerId, picture.image, picture.title, picture.likes, picture.date, picture.description, index);
  let descr = photoCardDescr(picture.title, picture.likes);
  fullArticle.appendChild(link);
  fullArticle.appendChild(descr);
  return fullArticle;
}

// Variable utilisée pour contenir les médias.
let pictures = [];

// Montre toutes les cartes remplies dynamiquement.
async function showPhotos(id) {
  pictures = await getMediasByPhotographers(id);
  let section = document.querySelector(".photo_gallery");
  for (let picture of pictures) {
    let index = pictures.indexOf(picture);
    let article = fillArticle(picture, index);
    section.appendChild(article);
  }
}
showPhotos(thePhotographerId);

// LISTE DEROULANTE DE TRIS (POPULARITE, DATE, TITRE)
// Réalise les tris en fonction de chacune des 3 options.
async function showSortedPhotos(id) {
  pictures = await getMediasByPhotographers(id);
  let menuSort = document.getElementById("menuTri");
  menuSort.addEventListener("focus", function(event) {
    if (this.value == "likes") {
      event.preventDefault();
      pictures.sort((a, b) => b.likes - a.likes);
      let section = document.querySelector(".photo_gallery");
      section.innerText = "";
      for (let picture of pictures) {
        let index = pictures.indexOf(picture);
        let article = fillArticle(picture, index);
        section.appendChild(article);
      }
    }
    else if (this.value == "date") {
      event.preventDefault();
      pictures.sort((a, b) => a.date > b.date);
      let section = document.querySelector(".photo_gallery");
      section.innerText = "";
      for (let picture of pictures) {
        let index = pictures.indexOf(picture);
        let article = fillArticle(picture, index);
        section.appendChild(article);
      }
    }
    else {
      event.preventDefault();
      pictures.sort((a, b) => a.title > b.title);
      let section = document.querySelector(".photo_gallery");
      section.innerText = "";
      for (let picture of pictures) {
        let index = pictures.indexOf(picture);
        let article = fillArticle(picture, index);
        section.appendChild(article);
      }
    }
  });
  menuSort.addEventListener("change", function(event) {
    if (this.value == "likes") {
      event.preventDefault();
      pictures.sort((a, b) => b.likes - a.likes);
      let section = document.querySelector(".photo_gallery");
      section.innerText = "";
      for (let picture of pictures) {
        let index = pictures.indexOf(picture);
        let article = fillArticle(picture, index);
        section.appendChild(article);
      }
    }
    else if (this.value == "date") {
      event.preventDefault();
      pictures.sort((a, b) => a.date > b.date);
      let section = document.querySelector(".photo_gallery");
      section.innerText = "";
      for (let picture of pictures) {
        let index = pictures.indexOf(picture);
        let article = fillArticle(picture, index);
        section.appendChild(article);
      }
    }
    else {
      event.preventDefault();
      pictures.sort((a, b) => a.title > b.title);
      let section = document.querySelector(".photo_gallery");
      section.innerText = "";
      for (let picture of pictures) {
        let index = pictures.indexOf(picture);
        let article = fillArticle(picture, index);
        section.appendChild(article);
      }
    }
  });
}
showSortedPhotos(thePhotographerId);

// BOUTON DE CONTACT EN BAS EN VERSION MOBILE
// Récupère dynamiquement le lien de contact pour le bouton en version mobile.
function mobileContactButton() {
  let buttonLink = document.createElement("a");
  buttonLink.href = "#";
  buttonLink.id = "dyn_photo_contact_link_mobile";
  buttonLink.setAttribute("aria-label", "Contact Me");
  buttonLink.onclick = function(event) {
    event.preventDefault();
    formModal.style.display = "block";
  }
  let buttonSpan = document.createElement("span");
  buttonSpan.innerText = "Contactez-moi";
  buttonLink.appendChild(buttonSpan);
  return buttonLink;
}

// Montre la section remplie dynamiquement.
function showMobileContact() {
  let section = document.querySelector("#mobile_contact_parent");
  let mobileContact = mobileContactButton();                        // Voir à la ligne 298.
  section.appendChild(mobileContact);
}

// PARTIE "LIKES ET PRIX" EN BAS A DROITE
// Likes et prix : Récupère dynamiquement le nombre total de likes et le prix du photographe.
async function bottomRight(id, photographerPrice) {
  pictures = await getMediasByPhotographers(id);
  let valeurInitiale = 0;
  let totalLikes = pictures.reduce((accumulateur, valeurCourante) => accumulateur + valeurCourante.likes, valeurInitiale);

  let bottomRightDiv = document.createElement("div");
  bottomRightDiv.id = "likes_prix_child";
  let bottomRightLikes = document.createElement("span");
  bottomRightLikes.id = "dyn_likes";
  bottomRightLikes.setAttribute("aria-label", "Total des likes");
  let bottomRightLikesNumber = document.createElement("span");
  bottomRightLikesNumber.id = "dyn_likes_number";
  bottomRightLikesNumber.innerText = totalLikes;
  bottomRightLikesNumber.setAttribute("aria-label", "Nombre total des likes");
  let bottomRightLikesIcon = document.createElement("img");
  bottomRightLikesIcon.src = "Images/Icone-coeur-noir.png";
  bottomRightLikesIcon.className = "icone";
  bottomRightLikesIcon.id = "icone";
  bottomRightLikesIcon.setAttribute("alt", "Likes");
  let bottomRightPrice = document.createElement("span");
  bottomRightPrice.innerText = photographerPrice + "€ / jour";
  bottomRightPrice.className = "dyn_prix";
  bottomRightPrice.setAttribute("aria-label", "Prix du photographe");
  bottomRightLikes.appendChild(bottomRightLikesNumber);
  bottomRightLikes.appendChild(bottomRightLikesIcon);
  bottomRightDiv.appendChild(bottomRightLikes);
  bottomRightDiv.appendChild(bottomRightPrice);
  return bottomRightDiv;
}

// Montre la section remplie dynamiquement.
async function showLikesNPrice(id, photographerPrice) {
  let section = document.querySelector("#likes_prix");
  let likesNPrice = await bottomRight(id, photographerPrice);      // Voir à la ligne 322.
  section.appendChild(likesNPrice);
}

// FENETRE LIGHTBOX-MODAL
// Crée dynamiquement la lightbox pour chaque image.
function createLightbox(id, image, title, likes, date, description, index) {
  let lightboxMain = document.createElement("section");
  lightboxMain.id = "lightbox_main";
  lightboxMain.setAttribute("aria-label", "All the lightbox");

  let lightPrevLink = document.createElement("a");
  lightPrevLink.href = "#";
  lightPrevLink.className = "lightbox-icons";
  lightPrevLink.setAttribute("aria-label", "Previous image");
  lightPrevLink.addEventListener("click", clickPrev);
  function clickPrev() {
    lightboxNavigate(index - 1);
  };
  lightPrevLink.addEventListener("keydown", keyDownPrev);
  function keyDownPrev(e) {
    if (e.key == "Enter") {
      lightboxNavigate(index - 1);
    }
  };

  let lightPrevIcon = document.createElement("img");
  lightPrevIcon.src = "Images/Icone-fleche-gauche.png";
  lightPrevIcon.className = "lightbox-icon";
  lightPrevIcon.setAttribute("alt", "Previous icon");
  
  lightPrevLink.appendChild(lightPrevIcon);
  lightboxMain.appendChild(lightPrevLink);

  let lightImgAndTitle = document.createElement("section");
  lightImgAndTitle.id = "lightbox-imgAndTitle";
  lightImgAndTitle.setAttribute("aria-label", "Media and title");

  let lightboxMedia = document.createElement("img");
  lightboxMedia.src = "Images/" + id + "/" + image;
  lightboxMedia.id = "lightbox-img";
  lightboxMedia.setAttribute("alt", description);

  let lightboxTitle = document.createElement("p");
  lightboxTitle.id = "lightbox-parag";
  lightboxTitle.innerText = title;
  
  lightImgAndTitle.appendChild(lightboxMedia);
  lightImgAndTitle.appendChild(lightboxTitle);
  lightboxMain.appendChild(lightImgAndTitle);

  let lightNextLink = document.createElement("a");
  lightNextLink.href = "#";
  lightNextLink.className = "lightbox-icons";
  lightNextLink.setAttribute("aria-label", "Next image");
  lightNextLink.addEventListener("click", clickNext);
  function clickNext() {
    lightboxNavigate(index + 1);
  };
  lightNextLink.addEventListener("keydown", keyDownNext);
  function keyDownNext(e) {
    if (e.key == "Enter") {
      lightboxNavigate(index + 1);
    }
  };

  let lightNextIcon = document.createElement("img");
  lightNextIcon.src = "Images/Icone-fleche-droite.png";
  lightNextIcon.className = "lightbox-icon";
  lightNextIcon.setAttribute("alt", "Next icon");
  
  lightNextLink.appendChild(lightNextIcon);
  lightboxMain.appendChild(lightNextLink);

  let lightboxClose = document.createElement("a");
  lightboxClose.href = "#";
  lightboxClose.className = "lightbox-icons";
  lightboxClose.id = "lightbox_close";
  lightboxClose.setAttribute("aria-label", "Close dialog");
  lightboxClose.addEventListener("click", clickClose);
  function clickClose() {
    lightbox.style.display = "none";
    photoHeader.style.display = "block";
    photoMain.style.display = "block";
  };
  lightboxClose.addEventListener("keydown", keyDownClose);
  function keyDownClose(e) {
    if (e.key == "Enter") {
      clickClose();
    }
  };

  let lightCloseIcon = document.createElement("img");
  lightCloseIcon.src = "Images/Icone-croix.png";
  lightCloseIcon.className = "lightbox-icon";
  lightCloseIcon.setAttribute("alt", "Close button");

  lightboxClose.appendChild(lightCloseIcon);
  lightboxMain.appendChild(lightboxClose);

  return lightboxMain;
}

// Permet de naviguer dans la lightbox.
function lightboxNavigate(index) {
  if (index >= pictures.length) {
    index = 0;
  }
  if (index < 0) {
    index = pictures.length - 1;
  }
  let media = pictures[index];
  showLightbox(media.photographerId, media.image, media.title, media.likes, media.date, media.description, index);
}

// Montre la lightbox remplie dynamiquement.
function showLightbox(id, image, title, likes, date, description, index) {
  // A ce niveau, les bonnes données sont récupérées...
  let section = document.querySelector("#lightbox_section");
  section.innerText = "";
  let fullArticle = document.createElement("article");
  fullArticle.className = "home_card";
  //let pic = new MediaFactory("picture", pictures);
  //console.log(pic);                                                                 // SUPPRIMER
  //let movie = new MediaFactory("movie", pictures);
  //fullArticle.appendChild(pic.toHTML());
  //section.appendChild(movie.toHTML());
  //section.appendChild(fullArticle);
  //section.appendChild(fullArticle);
  section.appendChild(createLightbox(id, image, title, likes, date, description, index)); //mediafactory.tohtml
  //return section;
}

// FENETRE FORM-MODAL
// Crée dynamiquement le formulaire pour chaque photographe.
function createForm() {
  let formMain = document.createElement("form");
  formMain.id = "form_main";
  formMain.setAttribute("action", "");
  formMain.setAttribute("method", "POST");

  let formH1 = document.createElement("h1");
  formH1.id = "form_h1";
  formH1.innerHTML = "Contactez-moi<br>" + photographer.name;
  formH1.setAttribute("aria-label", "Contact me");
  
  formMain.appendChild(formH1);

  let divPrenom = document.createElement("div");
  divPrenom.className = "form_div";
  let labelPrenom = document.createElement("label");
  labelPrenom.id = "label_prenom";
  labelPrenom.innerText = "Prénom";
  labelPrenom.setAttribute("for", "prenom");
  labelPrenom.setAttribute("aria-label", "First name");
  let brPrenom = document.createElement("br");
  let inputPrenom = document.createElement("input");
  inputPrenom.id = "prenom";
  inputPrenom.type = "text";
  inputPrenom.setAttribute("aria-labelledby", "label_prenom");

  divPrenom.appendChild(labelPrenom);
  divPrenom.appendChild(brPrenom);
  divPrenom.appendChild(inputPrenom);
  formMain.appendChild(divPrenom);

  let divNom = document.createElement("div");
  divNom.className = "form_div";
  let labelNom = document.createElement("label");
  labelNom.id = "label_nom";
  labelNom.innerText = "Nom";
  labelNom.setAttribute("for", "nom");
  labelNom.setAttribute("aria-label", "Last name");
  let brNom = document.createElement("br");
  let inputNom = document.createElement("input");
  inputNom.id = "nom";
  inputNom.type = "text";
  inputNom.setAttribute("aria-labelledby", "label_nom");

  divNom.appendChild(labelNom);
  divNom.appendChild(brNom);
  divNom.appendChild(inputNom);
  formMain.appendChild(divNom);

  let divEmail = document.createElement("div");
  divEmail.className = "form_div";
  let labelEmail = document.createElement("label");
  labelEmail.id = "label_email";
  labelEmail.innerText = "Email";
  labelEmail.setAttribute("for", "email");
  labelEmail.setAttribute("aria-label", "Email");
  let brEmail = document.createElement("br");
  let inputEmail = document.createElement("input");
  inputEmail.id = "email";
  inputEmail.type = "email";
  inputEmail.setAttribute("aria-labelledby", "label_email");

  divEmail.appendChild(labelEmail);
  divEmail.appendChild(brEmail);
  divEmail.appendChild(inputEmail);
  formMain.appendChild(divEmail);

  let divMessage = document.createElement("div");
  divMessage.className = "form_div";
  let labelMessage = document.createElement("label");
  labelMessage.id = "label_message";
  labelMessage.innerText = "Votre message";
  labelMessage.setAttribute("for", "message");
  labelMessage.setAttribute("aria-label", "Your message");
  let brMessage = document.createElement("br");
  let inputMessage = document.createElement("textarea");
  inputMessage.id = "message";
  inputMessage.setAttribute("rows", "5");
  inputMessage.setAttribute("aria-labelledby", "label_message");

  divMessage.appendChild(labelMessage);
  divMessage.appendChild(brMessage);
  divMessage.appendChild(inputMessage);
  formMain.appendChild(divMessage);

  let divSubmit = document.createElement("div");
  divSubmit.className = "form_div";
  divSubmit.id = "form_submit";
  let submitLink = document.createElement("a");
  submitLink.id = "submit_button";
  submitLink.href = "";
  submitLink.innerText = "Envoyer";
  submitLink.setAttribute("aria-label", "Send");
  submitLink.addEventListener("click", clickSubmitForm);
  function clickSubmitForm(e) {
    e.preventDefault();
    console.log(inputPrenom.value);
    console.log(inputNom.value);
    console.log(inputEmail.value);
    console.log(inputMessage.value);
  };
  submitLink.addEventListener("keydown", keyDownSubmitForm);
  function keyDownSubmitForm(e) {
    if (e.key == "Enter") {
      clickSubmitForm(e);
    }
  };

  divSubmit.appendChild(submitLink);
  formMain.appendChild(divSubmit);

  let closeLink = document.createElement("a");
  closeLink.id = "form_close";
  closeLink.href = "";
  closeLink.setAttribute("aria-label", "Close Contact form");
  let closeLinkImg = document.createElement("img");
  closeLinkImg.id = "form_close_icon";
  closeLinkImg.src = "Images/Icone-croix-blanche.png";
  closeLinkImg.setAttribute("alt", "Close button");
  closeLink.addEventListener("click", clickCloseForm);
  function clickCloseForm(e) {
    e.preventDefault();
    formModal.style.display = "none";
  };
  closeLink.addEventListener("keydown", keyDownCloseForm);
  function keyDownCloseForm(e) {
    if (e.key == "Enter") {
      e.preventDefault();
      formModal.style.display = "none";
    }
  };

  closeLink.appendChild(closeLinkImg);
  formMain.appendChild(closeLink);

  return formMain;
};

// Montre le formulaire rempli dynamiquement.
function showForm() {
  let section = document.querySelector("#form_section");
  section.innerText = "";
  let formulaire = createForm(); // Voir à la ligne 490.                                              // MODIFIER
  section.appendChild(formulaire);
}