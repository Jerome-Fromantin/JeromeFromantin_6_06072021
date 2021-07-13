let {photographers} = await fetch("FishEyeData.json").then((res)=>res.json())
console.log(photographers)

let round_img_1 = document.getElementById("dyn_round_img_1");
round_img_1.src = "Images/ID_Photos/" + photographers[0].portrait;
let home_h2_1 = document.getElementById("dyn_home_h2_1");
home_h2_1.innerHTML = photographers[0].name;
let home_card_lieu_1 = document.getElementById("dyn_home_card_lieu_1");
home_card_lieu_1.innerHTML = photographers[0].city + ", " + photographers[0].country;
let home_card_descr_1 = document.getElementById("dyn_home_card_descr_1");
home_card_descr_1.innerHTML = photographers[0].tagline;
let home_card_prix_1 = document.getElementById("dyn_home_card_prix_1");
home_card_prix_1.innerHTML = photographers[0].price + "€/jour";
let home_tag_1_1 = document.getElementById("tag_1_1");
home_tag_1_1.innerHTML = "#" + photographers[0].tags[0];
let home_tag_1_2 = document.getElementById("tag_1_2");
home_tag_1_2.innerHTML = "#" + photographers[0].tags[1];
let home_tag_1_3 = document.getElementById("tag_1_3");
home_tag_1_3.innerHTML = "#" + photographers[0].tags[2];
let home_tag_1_4 = document.getElementById("tag_1_4");
home_tag_1_4.innerHTML = "#" + photographers[0].tags[3];

let home_card_prix_2 = document.getElementById("dyn_home_card_prix_2");
home_card_prix_2.innerHTML = photographers[1].price + "€/jour";
let home_tag_2_1 = document.getElementById("tag_2_1");
home_tag_2_1.innerHTML = "#" + photographers[1].tags[0];
let home_tag_2_2 = document.getElementById("tag_2_2");
home_tag_2_2.innerHTML = "#" + photographers[1].tags[1];

let photo_h1 = document.getElementById("dyn_photo_h1");
photo_h1.innerHTML = photographers[0].name;

/* Fonctions à venir pour pages dynamiques. 
function getURL() {
  alert("The URL of this page is : " + window.location.href);
}
// .href, .protocol, .host, .hostname, .port, .pathname, .search, .hash
function newDoc() {
  window.location.assign("https://w3schools.com")
}

function getName() {
  alert("Le nom du photographe est : " + photographers[0].name);
}*/

/* Query parameters */
/*
Ex : localhost:3000/?name=Jerome
Le "?" introduit le query param représenté par la clé "name"
qui a pour valeur "Jerome".

Pour y accéder ensuite, on utilise URLSearchParams() et la méthode get().
Ex:
//window.location.search = ?name=Jerome
let params = new URLSearchParams(window.location.search);
let userName = params.get("name");
console.log(userName); // Affiche "Jerome".

Avec plusieurs paramètres.
Ex : localhost:3000/?name=Jerome&age=50

Pour y accéder ensuite, on utilise la même méthode.
Ex:
//window.location.search = ?name=Jerome&age=50
let params = new URLSearchParams(window.location.search);
let userName = params.get("name");
let userAge = params.get("age");
console.log(userName); // Affiche "Jerome".
console.log(userAge); // Affiche "50".

Pour vérifier si une URL a certains paramètres ou non, il faut utiliser la méthode has().
params.has("name"); // true
params.has("place"); // false

Autres méthodes :
console.log(params.getAll("age")); // ["50"]
console.log(params.toString()); // "?name=Jerome&age=50"
console.log(params.append("active", "1")); // "?name=Jerome&age=50&active=1"

let keys = params.keys();
for (key of keys) {
  console.log(key);
}
// Affiche "name", "age", "active".

let values = params.values();
for (value of values) {
  console.log(value);
}
// Affiche "Jerome", "50", "1".

let entries = params.entries();
for (pair of entries) {
  console.log(pair[0], pair[1]);
}
// Affiche "["name", "Jerome"]", "["age", "50"]".
*/