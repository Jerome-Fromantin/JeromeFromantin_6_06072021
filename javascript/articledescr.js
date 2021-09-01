// Cette classe construit la div contenant la description
// dans chaque carte de photographe de la page d'accueil.
export default class ArticleDescr {
  constructor(data) {
    // eslint-disable-next-line object-curly-newline
    const { city, country, tagline, price } = data;
    this.descr = this.homeCardDescr(city, country, tagline, price);
  }

  // eslint-disable-next-line class-methods-use-this
  homeCardDescr(city, country, tagline, price) {
    const description = document.createElement('div');
    description.className = 'dyn_home_card_descr';
    const descriptionPlace = document.createElement('p');
    descriptionPlace.innerText = `${city}, ${country}`;
    descriptionPlace.className = 'dyn_home_card_lieu';
    descriptionPlace.setAttribute('lang', 'en');
    descriptionPlace.setAttribute('aria-label', `${city}, ${country}`);
    const descriptionSlogan = document.createElement('p');
    descriptionSlogan.innerText = tagline;
    descriptionSlogan.className = 'dyn_home_card_slogan';
    descriptionSlogan.setAttribute('aria-label', tagline);
    const descriptionPrix = document.createElement('p');
    descriptionPrix.innerText = `${price}€/jour`;
    descriptionPrix.className = 'dyn_home_card_prix';
    descriptionPrix.setAttribute('aria-label', price);
    description.appendChild(descriptionPlace);
    description.appendChild(descriptionSlogan);
    description.appendChild(descriptionPrix);
    return description;
  }

  toHTML() {
    return this.descr;
  }
}
