let requestURL = "FishEyeData.json";

fetch(requestURL, {/*
  headers: {
    'Content-Type': 'application/json',
    'charset': 'utf-8'
  },*/
  mode: "no-cors"
})
  .then(function (reponse) {
    console.log(reponse);
    return reponse.json();
  })
  .then(function(value) {
    let maListe = value.content;
    console.log(value.content);
    console.log(maListe);
  })
  .catch(function(err) {
    console.log("Tu te goures !", err)
  })

/* Fonctions à venir pour pages dynamiques. */
function getURL() {
  alert("The URL of this page is : " + window.location.href);
}
// .href, .protocol, .host, .hostname, .port, .pathname, .search, .hash
function newDoc() {
  window.location.assign("https://w3schools.com")
}

function getName() {
  alert("Le nom du photographe est : " + photographers.name);
}

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