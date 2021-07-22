/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts-photographe.js":
/*!********************************!*\
  !*** ./scripts-photographe.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ \"./services.js\");\n// Récupération des données \"photographes\" du fichier JSON.\r\n\r\n\r\n// PAGE DE PHOTOGRAPHE\r\n// Récupération de l'id du photographe concerné.\r\nlet param = new URLSearchParams(window.location.search);\r\nlet thePhotographerId = param.get(\"id\");\r\n\r\n// PARTIE PRESENTATION DU PHOTOGRAPHE\r\n// Partie gauche de la présentation : Récupère dynamiquement le nom pour le h1.\r\nfunction photoH1(photographerName) {\r\n  let title = document.createElement(\"h1\");\r\n  title.innerText = photographerName;\r\n  title.id = \"dyn_photo_h1\";\r\n  return title;\r\n}\r\n\r\n// Partie gauche de la présentation : Récupère dynamiquement les données pour les 2 lignes de description.\r\nfunction photoDescr(photographerCity, photographerCountry, photographerTagline) {\r\n  let description = document.createElement(\"div\");\r\n  let descriptionPlace = document.createElement(\"p\");\r\n  descriptionPlace.innerText = photographerCity + \", \" + photographerCountry;\r\n  descriptionPlace.id = \"dyn_photo_pres_lieu\";\r\n  descriptionPlace.setAttribute(\"lang\", \"en\");\r\n  descriptionPlace.setAttribute(\"aria-label\", photographerCity + \", \" + photographerCountry);\r\n  let descriptionSlogan = document.createElement(\"p\");\r\n  descriptionSlogan.innerText = photographerTagline;\r\n  descriptionSlogan.id = \"dyn_photo_pres_slogan\";\r\n  descriptionSlogan.setAttribute(\"aria-label\", photographerTagline);\r\n  description.appendChild(descriptionPlace);\r\n  description.appendChild(descriptionSlogan);\r\n  return description;\r\n}\r\n\r\n// Partie gauche de la présentation : Récupère dynamiquement les données pour les tags.\r\nfunction photoTags(photographerTags) {\r\n  let tagGroup = document.createElement(\"nav\");\r\n  tagGroup.id = \"dyn_photo_pres_barnav\";\r\n  tagGroup.setAttribute(\"lang\", \"en\");\r\n  tagGroup.setAttribute(\"aria-label\", \"Catégories du photographe\");\r\n  for (let photographerTag of photographerTags) {\r\n    let tagGroupLink = document.createElement(\"a\");\r\n    tagGroupLink.href = \"#\";\r\n    tagGroupLink.className = \"photo_pres_tag\";\r\n    tagGroupLink.setAttribute(\"aria-label\", photographerTag);\r\n    let tagGroupspan = document.createElement(\"span\");\r\n    tagGroupspan.innerText = \"#\" + photographerTag;\r\n    tagGroupLink.appendChild(tagGroupspan);\r\n    tagGroup.appendChild(tagGroupLink);\r\n  }\r\n  return tagGroup;\r\n}\r\n\r\n// Organise toutes les données précédemment récupérées.\r\nfunction fillLeftPart(photographerName, photographerCity, photographerCountry, photographerTagline, photographerTags) {\r\n  let leftPart = document.createElement(\"section\");\r\n  leftPart.id = \"photo_pres_leftText\";\r\n  let title = photoH1(photographerName)\r\n  let descr = photoDescr(photographerCity, photographerCountry, photographerTagline)\r\n  let tags = photoTags(photographerTags);\r\n  leftPart.appendChild(title);\r\n  leftPart.appendChild(descr);\r\n  leftPart.appendChild(tags);\r\n  return leftPart;\r\n}\r\n\r\n// Partie gauche de la présentation : Récupère dynamiquement le lien de contact pour le bouton.\r\nfunction contactButton(photographerId) {\r\n  let buttonLink = document.createElement(\"a\");\r\n  buttonLink.href = \"contact.html?id=\" + photographerId;\r\n  buttonLink.id = \"dyn_photo_contact_link\";\r\n  buttonLink.setAttribute(\"aria-label\", \"Contact Me\");\r\n  let buttonSpan = document.createElement(\"span\");\r\n  buttonSpan.innerText = \"Contactez-moi\";\r\n  buttonLink.appendChild(buttonSpan);\r\n  return buttonLink;\r\n}\r\n\r\n// Montre la partie gauche de la présentation (texte et bouton) remplie dynamiquement.\r\nfunction showLeftPart(photographer) {\r\n  let sectionleft = document.querySelector(\"#photo_pres_text\");\r\n  let leftPart = fillLeftPart(photographer.name, photographer.city, photographer.country, photographer.tagline, photographer.tags);\r\n  let contact = contactButton(thePhotographerId);\r\n  sectionleft.appendChild(leftPart);\r\n  sectionleft.appendChild(contact);\r\n  showMobileContact(photographer.id);\r\n  showLikesNPrice(/*totalLikes, */photographer.price);\r\n}\r\n\r\n// Partie droite de la présentation : Récupère dynamiquement le nom de l'image.\r\nfunction photoImg(photographerPortrait, photographerName) {\r\n  let image = document.createElement(\"img\");\r\n  image.src = \"Images/ID_Photos/\" + photographerPortrait;\r\n  image.className = \"dyn_round_img\";\r\n  image.id=\"dyn_photo_round_img\";\r\n  image.setAttribute(\"aria-label\", photographerName);\r\n  return image;\r\n}\r\n\r\n// Montre la présentation entière remplie dynamiquement.\r\nasync function showPresent(id) {\r\n  let photographer = await (0,_services__WEBPACK_IMPORTED_MODULE_0__.getPhotographer)(id);\r\n  let presentation = document.querySelector(\"#photo_pres\");\r\n  showLeftPart(photographer);\r\n  let imgPart = photoImg(photographer.portrait, photographer.name);\r\n  presentation.appendChild(imgPart);\r\n}\r\n\r\nshowPresent(thePhotographerId);\r\n\r\n// PARTIE GALERIE DE PHOTOGRAPHIES\r\n// Chaque carte de la page de photographe : Récupère dynamiquement l'image pour le lien.\r\nfunction photoPhotoLink(photographerId, image, description) {\r\n  let photoLink = document.createElement(\"a\");\r\n  photoLink.href = \"#\";\r\n  photoLink.className = \"dyn_photo_photoLink\";\r\n  photoLink.setAttribute(\"aria-label\", \"Photographie\");\r\n  let photoLinkImg = document.createElement(\"img\");\r\n  photoLinkImg.src = \"Images/\" + photographerId + \"/\" + image;\r\n  photoLinkImg.className = \"dyn_photo_img\";\r\n  photoLink.setAttribute(\"lang\", \"en\");\r\n  photoLink.setAttribute(\"alt\", description);\r\n  photoLink.appendChild(photoLinkImg);\r\n  return photoLink;\r\n}\r\n\r\n// Chaque carte de la page de photographe : Récupère dynamiquement les données pour la ligne de description.\r\nfunction photoCardDescr(title, likes) {\r\n  let description = document.createElement(\"div\");\r\n  description.className = \"photo_card_titleLikes\";\r\n  description.setAttribute(\"lang\", \"en\");\r\n  let descriptionTitle = document.createElement(\"span\");\r\n  descriptionTitle.innerText = title;\r\n  descriptionTitle.className = \"dyn_title\";\r\n  descriptionTitle.setAttribute(\"aria-label\", \"Titre de la photo\");\r\n  let descriptionLikes = document.createElement(\"span\");\r\n  descriptionLikes.className = \"dyn_likes\";\r\n  descriptionLikes.setAttribute(\"aria-label\", \"Likes de la photo\");\r\n  let descriptionLikesNumber = document.createElement(\"span\");\r\n  descriptionLikesNumber.innerText = likes;\r\n  descriptionLikesNumber.setAttribute(\"aria-label\", \"Nombre de likes\");\r\n  let descriptionLikesIcon = document.createElement(\"img\");\r\n  descriptionLikesIcon.src = \"Images/Icone-coeur.png\";\r\n  descriptionLikesIcon.className = \"icone\";\r\n  descriptionLikes.setAttribute(\"alt\", \"Likes\");\r\n  descriptionLikes.setAttribute(\"type\", \"input\"); // type \"input\" ou type \"button\" ?\r\n  description.appendChild(descriptionTitle);\r\n  descriptionLikes.appendChild(descriptionLikesNumber);\r\n  descriptionLikes.appendChild(descriptionLikesIcon);\r\n  description.appendChild(descriptionLikes);\r\n  return description;\r\n}\r\n\r\n// Organise en carte toutes les données médias précédemment récupérées.\r\nfunction fillArticle(picture) {\r\n  let fullArticle = document.createElement(\"article\");\r\n  fullArticle.className = \"photo_card\";\r\n  let link = photoPhotoLink(picture.photographerId, picture.image, picture.description);\r\n  let descr = photoCardDescr(picture.title, picture.likes);\r\n  fullArticle.appendChild(link);\r\n  fullArticle.appendChild(descr);\r\n  return fullArticle;\r\n}\r\n\r\n// Montre toutes les cartes remplies dynamiquement.\r\nasync function showPhotos(id) {\r\n  let pictures = await (0,_services__WEBPACK_IMPORTED_MODULE_0__.getMediasByPhotographers)(id);\r\n  let section = document.querySelector(\".photo_photosLine\");\r\n  for (let picture of pictures) {\r\n    let article = fillArticle(picture);\r\n    section.appendChild(article);\r\n  }\r\n}\r\n\r\nshowPhotos(thePhotographerId);\r\n\r\n\r\n// BOUTON DE CONTACT EN BAS EN VERSION MOBILE\r\n// Récupère dynamiquement le lien de contact pour le bouton en version mobile.\r\nfunction mobileContactButton(photographerId) {\r\n  let buttonLink = document.createElement(\"a\");\r\n  buttonLink.href = \"contact.html?id=\" + photographerId;\r\n  buttonLink.id = \"dyn_photo_contact_link_mobile\";\r\n  buttonLink.setAttribute(\"aria-label\", \"Contact Me\");\r\n  let buttonSpan = document.createElement(\"span\");\r\n  buttonSpan.innerText = \"Contactez-moi\";\r\n  buttonLink.appendChild(buttonSpan);\r\n  return buttonLink;\r\n}\r\n\r\n// Montre la section remplie dynamiquement.\r\nfunction showMobileContact(id) {\r\n  let section = document.querySelector(\"#mobile_contact_parent\");\r\n  let mobileContact = mobileContactButton(id);\r\n  section.appendChild(mobileContact);\r\n}\r\n\r\n\r\n// PARTIE \"LIKES ET PRIX\" EN BAS A DROITE\r\n// Likes et prix : Récupère dynamiquement le nombre total de likes et le prix du photographe.\r\nfunction bottomRight(/*totalLikes, */photographerPrice) {\r\n  let bottomRightDiv = document.createElement(\"div\");\r\n  bottomRightDiv.id = \"likes_prix_child\";\r\n  let bottomRightLikes = document.createElement(\"span\");\r\n  bottomRightLikes.id = \"dyn_likes\";\r\n  bottomRightLikes.setAttribute(\"aria-label\", \"Total des likes\");\r\n  let bottomRightLikesNumber = document.createElement(\"span\");\r\n  bottomRightLikesNumber.innerText = \"680\";                // VARIABLE \"totalLikes\" A DEFINIR !!\r\n  console.log(bottomRightLikesNumber.innerText);\r\n  bottomRightLikesNumber.setAttribute(\"aria-label\", \"Nombre total des likes\");\r\n  let bottomRightLikesIcon = document.createElement(\"img\");\r\n  bottomRightLikesIcon.src = \"Images/Icone-coeur-noir.png\";\r\n  bottomRightLikesIcon.className = \"icone\";\r\n  bottomRightLikesIcon.id = \"icone\";\r\n  bottomRightLikesIcon.setAttribute(\"alt\", \"Likes\");\r\n  let bottomRightPrice = document.createElement(\"span\");\r\n  bottomRightPrice.innerText = photographerPrice + \"€ / jour\";\r\n  bottomRightPrice.className = \"dyn_prix\";\r\n  bottomRightPrice.setAttribute(\"aria-label\", \"Prix du photographe\");\r\n  bottomRightLikes.appendChild(bottomRightLikesNumber);\r\n  bottomRightLikes.appendChild(bottomRightLikesIcon);\r\n  bottomRightDiv.appendChild(bottomRightLikes);\r\n  bottomRightDiv.appendChild(bottomRightPrice);\r\n  return bottomRightDiv;\r\n}\r\n\r\n// Montre la section remplie dynamiquement.\r\nfunction showLikesNPrice(/*totalLikes, */price) {\r\n  let section = document.querySelector(\"#likes_prix\");\r\n  let likesNPrice = bottomRight(/*totalLikes, */price);\r\n  section.appendChild(likesNPrice);\r\n}\r\n\r\n\r\n// POUR PLUS TARD !!\r\n/*\r\nImage Modal (Advanced)\r\n\r\nThis is an example to demonstrate how CSS and JavaScript can work together.\r\n\r\nFirst, use CSS to create a modal window (dialog box), and hide it by default.\r\n\r\nThen, use a JavaScript to show the modal window and to display the image inside the modal, when a user clicks on the image:\r\nNorthern Lights, Norway (alt de l'image)\r\nExample\r\n// Get the modal\r\nvar modal = document.getElementById('myModal');\r\n\r\n// Get the image and insert it inside the modal - use its \"alt\" text as a caption\r\nvar img = document.getElementById('myImg');\r\nvar modalImg = document.getElementById(\"img01\");\r\nvar captionText = document.getElementById(\"caption\");\r\nimg.onclick = function(){\r\n  modal.style.display = \"block\";\r\n  modalImg.src = this.src;\r\n  captionText.innerHTML = this.alt;\r\n}\r\n\r\n// Get the <span> element that closes the modal\r\nvar span = document.getElementsByClassName(\"close\")[0];\r\n\r\n// When the user clicks on <span> (x), close the modal\r\nspan.onclick = function() {\r\n  modal.style.display = \"none\";\r\n} \r\n*/\n\n//# sourceURL=webpack://projet06/./scripts-photographe.js?");

/***/ }),

/***/ "./services.js":
/*!*********************!*\
  !*** ./services.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getPhotographers\": () => (/* binding */ getPhotographers),\n/* harmony export */   \"getPhotographer\": () => (/* binding */ getPhotographer),\n/* harmony export */   \"getMediasByPhotographers\": () => (/* binding */ getMediasByPhotographers)\n/* harmony export */ });\nconst getPhotographers = async() => {\r\n    let {photographers} = await getAll();\r\n    return photographers;\r\n}\r\n\r\nconst getPhotographer = async(id) => {\r\n    let photographers = await getPhotographers();\r\n    let photographer = photographers.find(data => data.id == id);\r\n    return photographer;\r\n}\r\n\r\nconst getMediasByPhotographers = async(id) => {\r\n    let {media} = await getAll();\r\n    let medias = media.filter(data => data.photographerId == id);\r\n    return medias;\r\n}\r\n\r\nasync function getAll() {\r\n    let data = await fetch(\"FishEyeData.json\").then((res)=>res.json());\r\n    return data;\r\n}\n\n//# sourceURL=webpack://projet06/./services.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./scripts-photographe.js");
/******/ 	
/******/ })()
;