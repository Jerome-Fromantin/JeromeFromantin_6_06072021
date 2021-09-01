// Cette classe construit la div contenant les tags
// dans chaque carte de photographe de la page d'accueil.
export default class ArticleTags {
  constructor(data, onTag) {
    const { tags } = data;
    this.tags = this.homeCardTags(tags, onTag);
  }

  // eslint-disable-next-line class-methods-use-this
  homeCardTags(tags, onTag) {
    const tagGroup = document.createElement('nav');
    tagGroup.className = 'barnav';
    tagGroup.setAttribute('lang', 'en');
    tagGroup.setAttribute('aria-label', 'Photographer categories');
    let tagValue = null;
    let cardTarget = null;
    function clickGetTag(el) {
      cardTarget = el.currentTarget;
      tagValue = cardTarget.id;
      onTag(tagValue);
      return tagValue;
    }
    function keyDownGetTag(el) {
      if (el.key === 'Enter') {
        clickGetTag(el);
      }
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const tag of tags) {
      const tagGroupLink = document.createElement('a');
      tagGroupLink.href = '#';
      tagGroupLink.className = 'tag';
      tagGroupLink.id = tag;
      tagGroupLink.setAttribute('aria-label', tag);
      const tagGroupSpan = document.createElement('span');
      tagGroupSpan.innerText = `#${tag}`;
      tagGroupLink.addEventListener('click', clickGetTag);
      tagGroupLink.addEventListener('keydown', keyDownGetTag);
      tagGroupLink.appendChild(tagGroupSpan);
      tagGroup.appendChild(tagGroupLink);
    }
    return tagGroup;
  }

  toHTML() {
    return this.tags;
  }
}
