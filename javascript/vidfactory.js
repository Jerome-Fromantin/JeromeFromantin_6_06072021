import { initLightVid } from './lightbox';

// Cette classe concerne les médias "vidéo".
export default class VidFactory {
  constructor(data, index) {
    this.movie = this.fillArticle(data, index);
  }

  // Dans chaque page photographe, organise en article les différents éléments.
  fillArticle(picture, index) {
    const fullArticle = document.createElement('article');
    fullArticle.className = 'photo_card';
    const link = this.photoPhotoLink(picture.photographerId, picture.image, picture.video,
      picture.title, picture.likes, picture.date, picture.description, index);
    const descr = this.photoCardDescr(picture.title, picture.likes);
    fullArticle.appendChild(link);
    fullArticle.appendChild(descr);
    return fullArticle;
  }

  // Dans chaque page photographe, crée chaque lien contenant une image.
  // Le clic (ou la touche "Entrée" avec focus) ouvre la lightbox.
  // Le commentaire suivant désactive une règle de ES Lint.
  // eslint-disable-next-line class-methods-use-this
  photoPhotoLink(photographerId, image, video, title, likes, date, description, index) {
    const photoLink = document.createElement('a');
    photoLink.href = '';
    photoLink.className = 'dyn_photo_photoLink';
    photoLink.setAttribute('aria-label', 'Photographie');
    function clickOpenImg(e) {
      e.preventDefault();
      initLightVid(photographerId, image, video, title, likes, date, description, index);
    }
    photoLink.addEventListener('click', clickOpenImg);
    function keyDownOpenImg(e) {
      if (e.key === 'Enter') {
        clickOpenImg(e);
      }
    }
    photoLink.addEventListener('keydown', keyDownOpenImg);
    const photoLinkImg = document.createElement('img');
    photoLinkImg.src = `Images/Thumbnails/${photographerId}/${image}`;
    photoLinkImg.className = 'dyn_photo_img';
    photoLinkImg.setAttribute('lang', 'en');
    photoLinkImg.setAttribute('alt', description);
    photoLink.appendChild(photoLinkImg);
    return photoLink;
  }

  // Dans chaque page photographe, crée la description en dessous de chaque image.
  // Le commentaire suivant désactive une règle de ES Lint.
  // eslint-disable-next-line class-methods-use-this
  photoCardDescr(title, likes) {
    const description = document.createElement('div');
    description.className = 'photo_card_titleLikes';
    description.setAttribute('lang', 'en');
    const descriptionTitle = document.createElement('span');
    descriptionTitle.innerText = title;
    descriptionTitle.className = 'dyn_title';
    descriptionTitle.setAttribute('aria-label', 'Titre de la photo');
    const descriptionLikes = document.createElement('span');
    descriptionLikes.className = 'dyn_likes';
    descriptionLikes.setAttribute('aria-label', 'Likes de la photo');
    const descriptionLikesNumber = document.createElement('span');
    descriptionLikesNumber.innerText = likes;
    descriptionLikesNumber.setAttribute('aria-label', 'Nombre de likes');
    const descriptionLikesLink = document.createElement('a');
    descriptionLikesLink.href = '#';
    descriptionLikesLink.className = 'lien-coeur';
    descriptionLikesLink.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        descriptionLikesNumber.innerText = Number(descriptionLikesNumber.innerText) + 1;
        const newTotal = document.getElementById('dyn_likes_number');
        newTotal.innerText = Number(newTotal.innerText) + 1;
      }
    });
    const descriptionLikesIcon = document.createElement('img');
    descriptionLikesIcon.src = 'Images/Icone-coeur.png';
    descriptionLikesIcon.className = 'icone';
    descriptionLikesIcon.setAttribute('alt', 'Likes');
    descriptionLikesIcon.addEventListener('click', (e) => {
      e.preventDefault();
      descriptionLikesNumber.innerText = Number(descriptionLikesNumber.innerText) + 1;
      const newTotal = document.getElementById('dyn_likes_number');
      newTotal.innerText = Number(newTotal.innerText) + 1;
    });
    descriptionLikes.setAttribute('alt', 'Likes');
    description.appendChild(descriptionTitle);
    descriptionLikes.appendChild(descriptionLikesNumber);
    descriptionLikesLink.appendChild(descriptionLikesIcon);
    descriptionLikes.appendChild(descriptionLikesLink);
    description.appendChild(descriptionLikes);
    return description;
  }

  toHTML() {
    return this.movie;
  }
}
