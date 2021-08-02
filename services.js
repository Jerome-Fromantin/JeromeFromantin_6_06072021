export const getPhotographers = async() => {
    let {photographers} = await getAll();
    return photographers;
}

export const getPhotographer = async(id) => {
    let photographers = await getPhotographers();
    let photographer = photographers.find(data => data.id == id);
    return photographer;
}

// TEST !!
export const getPhotographersByTags = async(tags) => {
    let photographers = await getPhotographers();
    console.log(photographers[4].tags[3]);   // Résultat correct, "animals"     // SUPPRIMER
    let photographersByTags = photographers.filter(data => data.tags == tags);
    console.log(photographersByTags);   // Résultat incorrect, tableau vide     // SUPPRIMER
    return photographersByTags;
}
// FIN TEST !!

export const getMediasByPhotographers = async(id) => {
    let {media} = await getAll();
    let medias = media.filter(data => data.photographerId == id);
    return medias;
}

// TEST !!
export const getOneMediaByMediaId = async(id) => {
    let medias = await getMediasByPhotographers(id);
    //console.log(medias);                                                  // SUPPRIMER
    let oneMedia = medias.find(data => data.id == id);
    //console.log(oneMedia);                                                  // SUPPRIMER
    return oneMedia;
}
// FIN TEST !!

async function getAll() {
    let data = await fetch("FishEyeData.json").then((res)=>res.json());
    return data;
}