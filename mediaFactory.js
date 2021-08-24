// Récupération de l'environnement de la lightbox pour pouvoir l'ouvrir.
import {initLightPic, initLightVid} from "./lightbox";

// Cette classe utilise 2 instances d'autres classes afin de construire la lightbox pour chaque média.
export class MediaFactory {
  constructor (type, data, index) {
    if (!data) {
      throw new Error("Vous avez oublié des éléments !");
    }
    switch (type) {
      case "pic":
        return new PicFactory(data, index);
      case "vid":
        return new VidFactory(data, index);
      default:
        throw new Error("Type de données non reconnu !");
    }
  }
}

// Cette classe concerne les médias "image".
class PicFactory {
  pic = null;
  constructor (data, index) {
    this.pic = this.fillArticle(data, index);
  }

  // Dans chaque page photographe, organise en article les différents éléments.
  fillArticle(picture, index) {
    let fullArticle = document.createElement("article");
    fullArticle.className = "photo_card";
    let link = this.photoPhotoLink(picture.photographerId, picture.image, picture.video, picture.title, picture.likes, picture.date, picture.description, index);
    let descr = this.photoCardDescr(picture.title, picture.likes);
    fullArticle.appendChild(link);
    fullArticle.appendChild(descr);
    return fullArticle;
  }

  // Dans chaque page photographe, crée chaque lien contenant une image.
  // Le clic (ou la touche "Entrée" avec focus) ouvre la lightbox.
  photoPhotoLink(photographerId, image, video, title, likes, date, description, index) {
    let photoLink = document.createElement("a");
    photoLink.href = "";
    photoLink.className = "dyn_photo_photoLink";
    photoLink.setAttribute("aria-label", "Photographie");
    photoLink.addEventListener("click", clickOpenImg);
    function clickOpenImg(e) {
      e.preventDefault();
      initLightPic(photographerId, image, video, title, likes, date, description, index);
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
    photoLinkImg.setAttribute("lang", "en");
    photoLinkImg.setAttribute("alt", description);
    photoLink.appendChild(photoLinkImg);
    return photoLink;
  }

  // Dans chaque page photographe, crée la description en dessous de chaque image.
  photoCardDescr(title, likes) {
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
    descriptionLikesIcon.setAttribute("alt", "Likes");
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

  toHTML() {
    return this.pic;
  }
}

// Cette classe concerne les médias "vidéo".
class VidFactory {
  movie = null;
  constructor (data, index) {
    this.movie = this.fillArticle(data, index)
  }

  // Dans chaque page photographe, organise en article les différents éléments.
  fillArticle(picture, index) {
    let fullArticle = document.createElement("article");
    fullArticle.className = "photo_card";
    let link = this.photoPhotoLink(picture.photographerId, picture.image, picture.video, picture.title, picture.likes, picture.date, picture.description, index);
    let descr = this.photoCardDescr(picture.title, picture.likes);
    fullArticle.appendChild(link);
    fullArticle.appendChild(descr);
    return fullArticle;
  }

  // Dans chaque page photographe, crée chaque lien contenant une image.
  // Le clic (ou la touche "Entrée" avec focus) ouvre la lightbox.
  photoPhotoLink(photographerId, image, video, title, likes, date, description, index) {
    let photoLink = document.createElement("a");
    photoLink.href = "";
    photoLink.className = "dyn_photo_photoLink";
    photoLink.setAttribute("aria-label", "Photographie");
    photoLink.addEventListener("click", clickOpenImg);
    function clickOpenImg(e) {
      e.preventDefault();
      initLightVid(photographerId, image, video, title, likes, date, description, index);
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
    photoLinkImg.setAttribute("lang", "en");
    photoLinkImg.setAttribute("alt", description);
    photoLink.appendChild(photoLinkImg);
    return photoLink;
  }

  // Dans chaque page photographe, crée la description en dessous de chaque image.
  photoCardDescr(title, likes) {
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
    descriptionLikesIcon.setAttribute("alt", "Likes");
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

  toHTML() {
    return this.movie;
  }
}