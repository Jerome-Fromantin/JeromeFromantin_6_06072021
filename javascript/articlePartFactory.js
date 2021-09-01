// Importation des classes nécessaires pour la classe générale.
import ArticleLink from './articlelink';
import ArticleDescr from './articledescr';
import ArticleTags from './articletags';

// Cette classe permet de construire la carte pour chaque photographe dans la page d'accueil.
export default class ArticlePartFactory {
  constructor(type, data, onTag) {
    if (!data) {
      throw new Error('Vous avez oublié des éléments !');
    }
    switch (type) {
      case 'link':
        return new ArticleLink(data);
      case 'descr':
        return new ArticleDescr(data);
      case 'tags':
        return new ArticleTags(data, onTag);
      default:
        throw new Error('Type de données non reconnu !');
    }
  }
}
