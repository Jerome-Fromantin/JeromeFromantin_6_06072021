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


function getURL() {
  alert("The URL of this page is : " + window.location.href);
}
// .href, .protocol, .host, .hostname, .port, .pathname, .search, .hash
function newDoc() {
  window.location.assign("https://w3schools.com")
}