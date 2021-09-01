// Cette classe construit le lien contenant l'image et le nom
// dans chaque carte de photographe de la page d'accueil.
export default class ArticleLink {
  constructor(data) {
    const { portrait, name, id } = data;
    this.link = this.homePhotoLink(portrait, name, id);
  }

  // eslint-disable-next-line class-methods-use-this
  homePhotoLink(portrait, name, id) {
    const link = document.createElement('a');
    link.href = `photographer-page.html?id=${id}`;
    link.className = 'dyn_home_photoLink';
    link.setAttribute('aria-label', name);
    const linkImg = document.createElement('img');
    linkImg.src = `Images/ID_Photos/${portrait}`;
    linkImg.className = 'dyn_round_img';
    linkImg.setAttribute('alt', name);
    const linkH2 = document.createElement('h2');
    linkH2.innerText = name;
    linkH2.className = 'dyn_home_h2';
    link.appendChild(linkImg);
    link.appendChild(linkH2);
    return link;
  }

  toHTML() {
    return this.link;
  }
}
