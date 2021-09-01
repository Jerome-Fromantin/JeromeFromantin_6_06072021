// Importation des classes nécessaires pour la classe générale.
import PicFactory from './picfactory';
import VidFactory from './vidfactory';

// Cette classe permet de construire la carte pour chaque média dans la page photographe.
export default class MediaFactory {
  constructor(type, data, index) {
    if (!data) {
      throw new Error('Vous avez oublié des éléments !');
    }
    switch (type) {
      case 'pic':
        return new PicFactory(data, index);
      case 'vid':
        return new VidFactory(data, index);
      default:
        throw new Error('Type de données non reconnu !');
    }
  }
}
