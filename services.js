// Récupère l'intégralité du fichier JSON.
async function getAll() {
    let data = await fetch("FishEyeData.json").then((res)=>res.json());
    return data;
}

// Récupère l'intégralité du tableau "photographers" du fichier JSON.
export const getPhotographers = async() => {
    let {photographers} = await getAll();
    return photographers;
}

// Récupère le photographe concerné par l'id demandé.
export const getPhotographer = async(id) => {
    let photographers = await getPhotographers();
    let photographer = photographers.find(data => data.id == id);
    return photographer;
}

// IL FAUDRA RASSEMBLER LES 8 FONCTIONS SUIVANTES EN UNE SEULE !!!
/*
// TEST DE FONCTION
export const getPhotographersByTag = async(tags) => {
    let photographers = await getPhotographers();
    let photographersByTag = photographers.filter(function(element) {
        for (let i=0; i < element.tags.length; i++) {
            if (element.tags[i] == tags) {
                console.log(tags);                                                                // SUPPRIMER
                console.log(element);                                                                // SUPPRIMER
                return element;
            }
        }
    });
    console.log(photographersByTag);                                                                // SUPPRIMER
    return photographersByTag;
}
// FIN DE TEST
*/

// Récupère les photographes concernés par le tag "portrait".
export const getPhotographersByTag1 = async() => {
    let photographers = await getPhotographers();
    let photographersByTag1 = photographers.filter(function(element) {
        for (let i=0; i < element.tags.length; i++) {
            if (element.tags[i] === "portrait") {
                return element;
            }
        }
    });
    return photographersByTag1;
}

// Récupère les photographes concernés par le tag "art".
export const getPhotographersByTag2 = async() => {
    let photographers = await getPhotographers();
    let photographersByTag2 = photographers.filter(function(element) {
        for (let i=0; i < element.tags.length; i++) {
            if (element.tags[i] === "art") {
                return element;
            }
        }
    });
    return photographersByTag2;
}

// Récupère les photographes concernés par le tag "fashion".
export const getPhotographersByTag3 = async() => {
    let photographers = await getPhotographers();
    let photographersByTag3 = photographers.filter(function(element) {
        for (let i=0; i < element.tags.length; i++) {
            if (element.tags[i] === "fashion") {
                return element;
            }
        }
    });
    return photographersByTag3;
}

// Récupère les photographes concernés par le tag "architecture".
export const getPhotographersByTag4 = async() => {
    let photographers = await getPhotographers();
    let photographersByTag4 = photographers.filter(function(element) {
        for (let i=0; i < element.tags.length; i++) {
            if (element.tags[i] === "architecture") {
                return element;
            }
        }
    });
    return photographersByTag4;
}

// Récupère les photographes concernés par le tag "travel".
export const getPhotographersByTag5 = async() => {
    let photographers = await getPhotographers();
    let photographersByTag5 = photographers.filter(function(element) {
        for (let i=0; i < element.tags.length; i++) {
            if (element.tags[i] === "travel") {
                return element;
            }
        }
    });
    return photographersByTag5;
}

// Récupère les photographes concernés par le tag "sport".
export const getPhotographersByTag6 = async() => {
    let photographers = await getPhotographers();
    let photographersByTag6 = photographers.filter(function(element) {
        for (let i=0; i < element.tags.length; i++) {
            if (element.tags[i] === "sport") {
                return element;
            }
        }
    });
    return photographersByTag6;
}

// Récupère les photographes concernés par le tag "animals".
export const getPhotographersByTag7 = async() => {
    let photographers = await getPhotographers();
    let photographersByTag7 = photographers.filter(function(element) {
        for (let i=0; i < element.tags.length; i++) {
            if (element.tags[i] === "animals") {
                return element;
            }
        }
    });
    return photographersByTag7;
}

// Récupère les photographes concernés par le tag "events".
export const getPhotographersByTag8 = async() => {
    let photographers = await getPhotographers();
    let photographersByTag8 = photographers.filter(function(element) {
        for (let i=0; i < element.tags.length; i++) {
            if (element.tags[i] === "events") {
                return element;
            }
        }
    });
    return photographersByTag8;
}

// Récupère les médias concernés par le photographe demandé.
export const getMediasByPhotographers = async(id) => {
    let {media} = await getAll();
    let medias = media.filter(data => data.photographerId == id);
    return medias;
}