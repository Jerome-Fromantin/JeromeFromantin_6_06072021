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

// Récupère les médias concernés par le photographe demandé.
export const getMediasByPhotographers = async(id) => {
    let {media} = await getAll();
    let medias = media.filter(data => data.photographerId == id);
    return medias;
}