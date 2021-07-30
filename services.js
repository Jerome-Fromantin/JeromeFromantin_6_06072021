export const getPhotographers = async() => {
    let {photographers} = await getAll();
    return photographers;
}

export const getPhotographer = async(id) => {
    let photographers = await getPhotographers();
    let photographer = photographers.find(data => data.id == id);
    return photographer;
}

export const getMediasByPhotographers = async(id) => {
    let {media} = await getAll();
    let medias = media.filter(data => data.photographerId == id);
    return medias;
}

// TEST !!
export const getPhotographersByTags = async(tags) => {
    let {photographers} = await getAll();
    let photographersByTags = photographers.filter(data => data.tags == tags);
    return photographersByTags;
}
// FIN TEST !!

async function getAll() {
    let data = await fetch("FishEyeData.json").then((res)=>res.json());
    return data;
}