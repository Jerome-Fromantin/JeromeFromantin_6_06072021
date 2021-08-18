import {getMediasByPhotographers} from "./services";

let pictures = [];
let photoHeader = document.getElementById("photo_header");
let photoMain = document.getElementById("photo_main");
let lightbox = document.querySelector(".lightbox_section");

export const initLightbox = async (photographerId, image, title, likes, date, description, index) => {                    // LIGNE 474
    pictures = await getMediasByPhotographers(photographerId);
    
    photoHeader.style.display = "none";
    photoMain.style.display = "none";
    lightbox.style.display = "block";
    lightbox.classList.remove("lightbox_section");
    lightbox.classList.add("lightbox_section_on");
    showLightbox(photographerId, image, title, likes, date, description, index);
  }

  function showLightbox(photographerId, image, title, likes, date, description, index) {
    let section = document.querySelector(".lightbox_section_on");
    section.innerText = "";
    let lightboxFull = createLightbox(photographerId, image, title, likes, date, description, index);
    section.appendChild(lightboxFull);
  }

  function createLightbox(id, image, title, likes, date, description, index) {                     // COMMENTAIRES
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

  function lightboxNavigate(index) {
    if (index >= pictures.length) {
      index = 0;
    }
    if (index < 0) {
      index = pictures.length - 1;
    }
    let media = pictures[index];
    const {photographerId, image, title, likes, date, description} = media;
    showLightbox(photographerId, image, title, likes, date, description, index);
  }