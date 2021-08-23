// Cette classe utilise 3 instances d'autres classes afin de construire un article.
// Chacun de ces articles est une carte de photographe dans la page d'accueil.
export class ArticlePartFactory {
    constructor (type, data) {
        if (!data) {
            throw new Error("Vous avez oublié des éléments !");
        }
        switch (type) {
            case "link":
                return new ArticleLink(data);
            case "descr":
                return new ArticleDescr(data);
            case "tags":
                return new ArticleTags(data);
            default:
                throw new Error("Type de données non reconnu !");
        }
    }
}

// Cette classe construit le lien contenant l'image et le nom.
class ArticleLink {
    link = null;
    constructor (data) {
        const {portrait, name, id} = data;
        this.link = this.homePhotoLink(portrait, name, id)
    }

    homePhotoLink(portrait, name, id) {
        let link = document.createElement("a");
        link.href = "photographer-page.html?id=" + id;
        link.className = "dyn_home_photoLink";
        //link.setAttribute("aria-label", name);
        //link.setAttribute("aria-labelledby", "dyn_home_h2");
        let linkImg = document.createElement("img");
        linkImg.src = "Images/ID_Photos/" + portrait;
        linkImg.className = "dyn_round_img";
        linkImg.setAttribute("alt", name);
        //linkImg.setAttribute("aria-label", name);
        //linkImg.setAttribute("aria-labelledby", "dyn_home_h2");
        let linkH2 = document.createElement("h2");
        linkH2.innerText = name;
        linkH2.className = "dyn_home_h2";
        linkH2.id = "dyn_home_h2";                                               // SUPPRIMER ?
        link.appendChild(linkImg);
        link.appendChild(linkH2);
        return link;
    }

    toHTML() {
        return this.link;
    }
}

// Cette classe construit la div contenant la description.
class ArticleDescr {
    descr = null;
    constructor (data) {
        const {city, country, tagline, price} = data;
        this.descr = this.homeCardDescr(city, country, tagline, price)
    }

    homeCardDescr(city, country, tagline, price) {
        let description = document.createElement("div");
        description.className = "dyn_home_card_descr";
        let descriptionPlace = document.createElement("p");
        descriptionPlace.innerText = city + ", " + country;
        descriptionPlace.className = "dyn_home_card_lieu";
        descriptionPlace.setAttribute("lang", "en");
        descriptionPlace.setAttribute("aria-label", city + ", " + country);
        let descriptionSlogan = document.createElement("p");
        descriptionSlogan.innerText = tagline;
        descriptionSlogan.className = "dyn_home_card_slogan";
        descriptionSlogan.setAttribute("aria-label", tagline);
        let descriptionPrix = document.createElement("p");
        descriptionPrix.innerText = price + "€/jour";
        descriptionPrix.className = "dyn_home_card_prix";
        descriptionPrix.setAttribute("aria-label", price);
        description.appendChild(descriptionPlace);
        description.appendChild(descriptionSlogan);
        description.appendChild(descriptionPrix);
        return description;
    }

    toHTML() {
        return this.descr;
    }
}

// Cette classe construit la div contenant les tags.
class ArticleTags {
    tags = null;
    constructor (data) {
        const {tags} = data;
        this.tags = this.homeCardTags(tags)
    }

    homeCardTags(tags) {
        let tagGroup = document.createElement("nav");
        tagGroup.className = "barnav";
        tagGroup.setAttribute("lang", "en");
        tagGroup.setAttribute("aria-label", "Photographer categories");
        for (let tag of tags) {
          let tagGroupLink = document.createElement("a");
          tagGroupLink.href = "#";
          tagGroupLink.className = "tag";
          tagGroupLink.id = tag;
          tagGroupLink.setAttribute("aria-label", tag);
          /*
          // TEST
          console.log(tagGroupLink);                                                             // SUPPRIMER
          let cardTarget = null;
          tagGroup.forEach((tag) => {
            tag.addEventListener("click", clickGetTag);
            function clickGetTag(el) {
              cardTarget = el.currentTarget;
              let tagValue = cardTarget.id;
              console.log(tagValue);                                                           // SUPPRIMER
              showByCardTag(tagValue);
            };
            tag.addEventListener("keydown", keyDownGetTag);
            function keyDownGetTag(el) {
              if (el.key == "Enter") {
                clickGetTag(el);
              }
            };
          });
          // FIN TEST
          */
          let tagGroupSpan = document.createElement("span");
          tagGroupSpan.innerText = "#" + tag;
          tagGroupLink.appendChild(tagGroupSpan);
          tagGroup.appendChild(tagGroupLink);
        }
        return tagGroup;
    }

    /*
    // TEST
    showByCardTag(tag) {
        let photographersByCardTag = photographers.filter(function(element) {
          if (element.tags.includes(tag)) {
            return element;
          }
        });
        return photographersByCardTag;
    }
    // FIN TEST
    */

    toHTML() {
        return this.tags;
    }
}