// Cette classe utilise 2 instances d'autres classes afin de construire la lightbox pour chaque média.
export class MediaFactory {
    constructor (type, data) {
        if (!data) {
            throw new Error("Vous avez oublié des éléments !");
        }
        switch (type) {
            case "picture":
                return new LightboxPic(data);
            //case "movie":
                //return new LightboxVid(data);
            default:
                throw new Error("Type de données non reconnu !");
        }
    }
}

// Cette classe concerne les médias "image".
class LightboxPic {
    picture = null;
    constructor (data) {
        const {id, image, title, likes, date, description, index} = data;
        this.picture = this.createLightbox(id, image, title, likes, date, description, index)
    }

    // Crée dynamiquement la lightbox pour chaque image.
    createLightbox(id, image, title, likes, date, description, index) {
        //console.log("Coucou");                                                              // SUPPRIMER
        //console.log(id);                                                                    // SUPPRIMER
        //console.log(image);                                                                 // SUPPRIMER
        let lightbox = document.getElementById("lightbox_section");
        let photoHeader = document.getElementById("photo_header");
        let photoMain = document.getElementById("photo_main");
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
    lightboxNavigate(index) {
        if (index >= pictures.length) {
        index = 0;
        }
        if (index < 0) {
        index = pictures.length - 1;
        }
        let media = pictures[index];
        showLightbox(media.photographerId, media.image, media.title, media.likes, media.date, media.description, index);
    }
  
    /*
    // Montre la lightbox remplie dynamiquement.
    showLightbox(id, image, title, likes, date, description, index) {
        let section = document.querySelector("#lightbox_section");
        section.innerText = "";
        let fullArticle = document.createElement("article");
        fullArticle.className = "home_card";
        //let pic = new MediaFactory("picture", pictures);
        //let movie = new MediaFactory("movie", pictures);
        //section.appendChild(pic.toHTML());
        //section.appendChild(movie.toHTML());
        section.appendChild(createLightbox(id, image, title, likes, date, description, index));

        //return section;
    }
    */

    toHTML() {
        return this.picture;
    }
}

// Cette classe concerne les médias "vidéo".
/*
class LightboxVid {
    movie = null;
    constructor (data) {
        const {param1, param2} = data;
        this.movie = this.yyy(param1, param2)
    }

    yyy(param1, param2) {
        // Contenu
        return bbb;
    }

    toHTML() {
        return this.movie;
    }
}
*/