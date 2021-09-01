// Récupère l'intégralité du fichier JSON.
async function getAll() {
  const data = await fetch('FishEyeData.json').then((res) => res.json());
  return data;
}

// Récupère l'intégralité du tableau "photographers" du fichier JSON.
export const getPhotographers = async () => {
  const { photographers } = await getAll();
  return photographers;
};

// Récupère le photographe concerné par l'id demandé.
export const getPhotographer = async (id) => {
  const photographers = await getPhotographers();
  const photographer = photographers.find((data) => data.id === id);
  return photographer;
};

// Récupère les médias concernés par le photographe demandé.
export const getMediasByPhotographers = async (id) => {
  const { media } = await getAll();
  const medias = media.filter((data) => data.photographerId === id);
  return medias;
};
