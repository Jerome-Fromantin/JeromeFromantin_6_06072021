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

/***/ "./articlePartFactory.js":
/*!*******************************!*\
  !*** ./articlePartFactory.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ArticlePartFactory\": () => (/* binding */ ArticlePartFactory)\n/* harmony export */ });\nclass ArticlePartFactory {\r\n    constructor (type, data) {\r\n        if (!data) {\r\n            throw new Error(\"Vous avez oublié des éléments !\");\r\n        }\r\n        switch (type) {\r\n            case \"link\":\r\n                return new ArticleLink(data);\r\n            case \"descr\":\r\n                return new ArticleDescr(data);\r\n            case \"tags\":\r\n                return new ArticleTags(data);\r\n            default:\r\n                throw new Error(\"Type de données non reconnu !\");\r\n        }\r\n    }\r\n}\r\n\r\nclass ArticleLink {\r\n    link = null;\r\n    constructor (data) {\r\n        const {portrait, name, id} = data;\r\n        this.link = this.homePhotoLink(portrait, name, id)\r\n    }\r\n\r\n    homePhotoLink(portrait, name, id) {\r\n        let link = document.createElement(\"a\");\r\n        link.href = \"photographer-page.html?id=\" + id;\r\n        link.className = \"dyn_home_photoLink\";\r\n        link.setAttribute(\"aria-label\", name);\r\n        let linkImg = document.createElement(\"img\");\r\n        linkImg.src = \"Images/ID_Photos/\" + portrait;\r\n        linkImg.className = \"dyn_round_img\";\r\n        let linkH2 = document.createElement(\"h2\");\r\n        linkH2.innerText = name;\r\n        linkH2.className = \"dyn_home_h2\";\r\n        link.appendChild(linkImg);\r\n        link.appendChild(linkH2);\r\n        return link;\r\n    }\r\n\r\n    toHTML() {\r\n        return this.link;\r\n    }\r\n}\r\n\r\nclass ArticleDescr {\r\n    descr = null;\r\n    constructor (data) {\r\n        const {city, country, tagline, price} = data;\r\n        this.descr = this.homeCardDescr(city, country, tagline, price)\r\n    }\r\n\r\n    homeCardDescr(city, country, tagline, price) {\r\n        let description = document.createElement(\"div\");\r\n        description.className = \"dyn_home_card_descr\";\r\n        let descriptionPlace = document.createElement(\"p\");\r\n        descriptionPlace.innerText = city + \", \" + country;\r\n        descriptionPlace.className = \"dyn_home_card_lieu\";\r\n        descriptionPlace.setAttribute(\"lang\", \"en\");\r\n        descriptionPlace.setAttribute(\"aria-label\", city + \", \" + country);\r\n        let descriptionSlogan = document.createElement(\"p\");\r\n        descriptionSlogan.innerText = tagline;\r\n        descriptionSlogan.className = \"dyn_home_card_slogan\";\r\n        descriptionSlogan.setAttribute(\"aria-label\", tagline);\r\n        let descriptionPrix = document.createElement(\"p\");\r\n        descriptionPrix.innerText = price + \"€/jour\";\r\n        descriptionPrix.className = \"dyn_home_card_prix\";\r\n        descriptionPrix.setAttribute(\"aria-label\", price);\r\n        description.appendChild(descriptionPlace);\r\n        description.appendChild(descriptionSlogan);\r\n        description.appendChild(descriptionPrix);\r\n        return description;\r\n    }\r\n\r\n    toHTML() {\r\n        return this.descr;\r\n    }\r\n}\r\n\r\nclass ArticleTags {\r\n    tags = null;\r\n    constructor (data) {\r\n        const {tags} = data;\r\n        this.tags = this.homeCardTags(tags)\r\n    }\r\n\r\n    homeCardTags(tags) {\r\n        let tagGroup = document.createElement(\"nav\");\r\n        tagGroup.className = \"barnav\";\r\n        tagGroup.setAttribute(\"lang\", \"en\");\r\n        tagGroup.setAttribute(\"aria-label\", \"Catégories du photographe\");\r\n        for (let tag of tags) {\r\n          let tagGroupLink = document.createElement(\"a\");\r\n          tagGroupLink.href = \"#\";\r\n          tagGroupLink.className = \"tag\";\r\n          tagGroupLink.id = \"tag\";\r\n          tagGroupLink.setAttribute(\"aria-label\", tag);\r\n          let tagGroupSpan = document.createElement(\"span\");\r\n          tagGroupSpan.innerText = \"#\" + tag;\r\n          tagGroupLink.appendChild(tagGroupSpan);\r\n          tagGroup.appendChild(tagGroupLink);\r\n        }\r\n        return tagGroup;\r\n    }\r\n\r\n    toHTML() {\r\n        return this.tags;\r\n    }\r\n}\n\n//# sourceURL=webpack://projet06/./articlePartFactory.js?");

/***/ }),

/***/ "./scripts-accueil.js":
/*!****************************!*\
  !*** ./scripts-accueil.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ \"./services.js\");\n/* harmony import */ var _articlePartFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./articlePartFactory */ \"./articlePartFactory.js\");\n// Récupération des données \"photographes\" du fichier JSON.\r\n\r\n\r\n\r\n// PAGE D'ACCUEIL\r\n// Récupération des données dynamiques pour chaque carte de la page d'accueil.\r\n\r\n\r\n// Organise en carte toutes les données précédemment récupérées.\r\nfunction fillArticle(photographer) {\r\n  let fullArticle = document.createElement(\"article\");\r\n  fullArticle.className = \"home_card\";\r\n  let link = new _articlePartFactory__WEBPACK_IMPORTED_MODULE_1__.ArticlePartFactory(\"link\", photographer);\r\n  let descr = new _articlePartFactory__WEBPACK_IMPORTED_MODULE_1__.ArticlePartFactory(\"descr\", photographer);\r\n  let tags = new _articlePartFactory__WEBPACK_IMPORTED_MODULE_1__.ArticlePartFactory(\"tags\", photographer);\r\n  fullArticle.appendChild(link.toHTML());\r\n  fullArticle.appendChild(descr.toHTML());\r\n  fullArticle.appendChild(tags.toHTML());\r\n  return fullArticle;\r\n}\r\n\r\n// Montre toutes les cartes remplies dynamiquement.\r\nasync function show() {\r\n  let photographers = await (0,_services__WEBPACK_IMPORTED_MODULE_0__.getPhotographers)();\r\n  let section = document.querySelector(\".main_section\");\r\n  for (let photographer of photographers) {\r\n    let article = fillArticle(photographer);\r\n    section.appendChild(article);\r\n  }\r\n}\r\n\r\nshow();\r\n\r\n// Montre toutes les cartes remplies dynamiquement en fonction des tags.\r\nasync function showByTags() {\r\n  let photographers = await (0,_services__WEBPACK_IMPORTED_MODULE_0__.getPhotographersByTags)();\r\n  console.log(photographers);                              // Donne un tableau vide...\r\n  let section = document.querySelector(\".main_section\");\r\n  let tags = document.querySelectorAll(\".barnavTag\");\r\n  tags.onclick = function(event) {\r\n    event.preventDefault();\r\n    for (let photographer of photographers) {\r\n      let article = fillArticle(photographer);\r\n      section.appendChild(article);\r\n    }\r\n  }\r\n}\r\n\r\nshowByTags();\r\n\r\n/* Fonctions à venir pour pages dynamiques. \r\nfunction getURL() {\r\n  alert(\"The URL of this page is : \" + window.location.href);\r\n}\r\n// .href, .protocol, .host, .hostname, .port, .pathname, .search, .hash\r\nfunction newDoc() {\r\n  window.location.assign(\"https://w3schools.com\")\r\n}\r\n\r\nfunction getName() {\r\n  alert(\"Le nom du photographe est : \" + photographers[0].name);\r\n}*/\r\n\r\n/* Query parameters */\r\n/*\r\nEx : localhost:3000/?name=Jerome\r\nLe \"?\" introduit le query param représenté par la clé \"name\"\r\nqui a pour valeur \"Jerome\".\r\n\r\nPour y accéder ensuite, on utilise URLSearchParams() et la méthode get().\r\nEx:\r\n//window.location.search = ?name=Jerome\r\nlet params = new URLSearchParams(window.location.search);\r\nlet userName = params.get(\"name\");\r\nconsole.log(userName); // Affiche \"Jerome\".\r\n\r\nAvec plusieurs paramètres.\r\nEx : localhost:3000/?name=Jerome&age=50\r\n\r\nPour y accéder ensuite, on utilise la même méthode.\r\nEx:\r\n//window.location.search = ?name=Jerome&age=50\r\nlet params = new URLSearchParams(window.location.search);\r\nlet userName = params.get(\"name\");\r\nlet userAge = params.get(\"age\");\r\nconsole.log(userName); // Affiche \"Jerome\".\r\nconsole.log(userAge); // Affiche \"50\".\r\n\r\nPour vérifier si une URL a certains paramètres ou non, il faut utiliser la méthode has().\r\nparams.has(\"name\"); // true\r\nparams.has(\"place\"); // false\r\n\r\nAutres méthodes :\r\nconsole.log(params.getAll(\"age\")); // [\"50\"]\r\nconsole.log(params.toString()); // \"?name=Jerome&age=50\"\r\nconsole.log(params.append(\"active\", \"1\")); // \"?name=Jerome&age=50&active=1\"\r\n\r\nlet keys = params.keys();\r\nfor (key of keys) {\r\n  console.log(key);\r\n}\r\n// Affiche \"name\", \"age\", \"active\".\r\n\r\nlet values = params.values();\r\nfor (value of values) {\r\n  console.log(value);\r\n}\r\n// Affiche \"Jerome\", \"50\", \"1\".\r\n\r\nlet entries = params.entries();\r\nfor (pair of entries) {\r\n  console.log(pair[0], pair[1]);\r\n}\r\n// Affiche \"[\"name\", \"Jerome\"]\", \"[\"age\", \"50\"]\".\r\n*/\n\n//# sourceURL=webpack://projet06/./scripts-accueil.js?");

/***/ }),

/***/ "./services.js":
/*!*********************!*\
  !*** ./services.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getPhotographers\": () => (/* binding */ getPhotographers),\n/* harmony export */   \"getPhotographer\": () => (/* binding */ getPhotographer),\n/* harmony export */   \"getMediasByPhotographers\": () => (/* binding */ getMediasByPhotographers),\n/* harmony export */   \"getPhotographersByTags\": () => (/* binding */ getPhotographersByTags)\n/* harmony export */ });\nconst getPhotographers = async() => {\r\n    let {photographers} = await getAll();\r\n    return photographers;\r\n}\r\n\r\nconst getPhotographer = async(id) => {\r\n    let photographers = await getPhotographers();\r\n    let photographer = photographers.find(data => data.id == id);\r\n    return photographer;\r\n}\r\n\r\nconst getMediasByPhotographers = async(id) => {\r\n    let {media} = await getAll();\r\n    let medias = media.filter(data => data.photographerId == id);\r\n    return medias;\r\n}\r\n\r\n// TEST !!\r\nconst getPhotographersByTags = async(tags) => {\r\n    let {photographers} = await getAll();\r\n    let photographersByTags = photographers.filter(data => data.tags == tags);\r\n    return photographersByTags;\r\n}\r\n// FIN TEST !!\r\n\r\nasync function getAll() {\r\n    let data = await fetch(\"FishEyeData.json\").then((res)=>res.json());\r\n    return data;\r\n}\n\n//# sourceURL=webpack://projet06/./services.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./scripts-accueil.js");
/******/ 	
/******/ })()
;