export class MediaFactory {
    constructor (type, data) {
        if (!data) {
            throw new Error("Vous avez oublié des éléments !");
        }
        switch (type) {
            case "picture":
                return new LightboxPic(data);
            case "movie":
                return new LightboxVid(data);
            default:
                throw new Error("Type de données non reconnu !");
        }
    }
}

class LightboxPic {
    picture = null;
    constructor (data) {
        const {param1, param2} = data;
        this.picture = this.xxx(param1, param2)
    }

    xxx(param1, param2) {
        // Contenu
        return aaa;
    }

    toHTML() {
        return this.picture;
    }
}

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