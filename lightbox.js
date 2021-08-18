// LIGHTBOX
// Récupération des données "photographes" du fichier JSON.
import {getMediasByPhotographers} from "./services";

// Récupère les parties nécessaires pour les 2 fonctions "initLightPic" et "initLightVid".
let pictures = [];
let photoHeader = document.getElementById("photo_header");
let photoMain = document.getElementById("photo_main");
let lightSection = document.querySelector(".lightbox_section");

// Crée l'environnement pour la lightbox pour les images.
export const initLightPic = async (photographerId, image, video, title, likes, date, description, index) => {
    pictures = await getMediasByPhotographers(photographerId);
    photoHeader.style.display = "none";
    photoMain.style.display = "none";
    lightSection.style.display = "block";
    lightSection.classList.remove("lightbox_section");
    lightSection.classList.add("lightbox_section_on");
    showLightPic(photographerId, image, video, title, likes, date, description, index);
}

// Montre la lightbox pour les images quand elle est créée.
function showLightPic(photographerId, image, video, title, likes, date, description, index) {
    let section = document.querySelector(".lightbox_section_on");
    section.innerText = "";
    let lightPic = createLightPic(photographerId, image, video, title, likes, date, description, index);
    section.appendChild(lightPic);
}

// Crée la lightbox elle-même pour les images.
function createLightPic(id, image, video, title, likes, date, description, index) {
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
      lightSection.style.display = "none";
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

// Permet de naviguer dans les médias.
function lightboxNavigate(index) {
    if (index >= pictures.length) {
        index = 0;
    }
    if (index < 0) {
        index = pictures.length - 1;
    }

    let media = pictures[index];
    const {photographerId, image, video, title, likes, date, description} = media;

    if (video) {
        showLightVid(photographerId, image, video, title, likes, date, description, index);
    }
    else {
        showLightPic(photographerId, image, video, title, likes, date, description, index);
    }
}

// Crée l'environnement pour la lightbox pour les vidéos.
export const initLightVid = async (photographerId, image, video, title, likes, date, description, index) => {
    pictures = await getMediasByPhotographers(photographerId);
    photoHeader.style.display = "none";
    photoMain.style.display = "none";
    lightSection.style.display = "block";
    lightSection.classList.remove("lightbox_section");
    lightSection.classList.add("lightbox_section_on");
    showLightVid(photographerId, image, video, title, likes, date, description, index);
}

// Montre la lightbox pour les vidéos quand elle est créée.
function showLightVid(photographerId, image, video, title, likes, date, description, index) {
    let section = document.querySelector(".lightbox_section_on");
    section.innerText = "";
    let lightVid = createLightVid(photographerId, image, video, title, likes, date, description, index);
    section.appendChild(lightVid);
}

// Crée la lightbox elle-même pour les vidéos.
function createLightVid(id, image, video, title, likes, date, description, index) {
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
  
    let lightboxMedia = document.createElement("video");
    lightboxMedia.id = "lightbox-img";
    lightboxMedia.innerText = "Your browser does not support the video tag.";
    lightboxMedia.setAttribute("alt", description);
    lightboxMedia.setAttribute("controls", "");
  
    let lightboxMediaSrc = document.createElement("source");
    lightboxMediaSrc.src = "Images/" + id + "/" + video;
  
    let lightboxTitle = document.createElement("p");
    lightboxTitle.id = "lightbox-parag";
    lightboxTitle.innerText = title;
    
    lightboxMedia.appendChild(lightboxMediaSrc);
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
      lightSection.style.display = "none";
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