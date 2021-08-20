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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ArticlePartFactory\": () => (/* binding */ ArticlePartFactory)\n/* harmony export */ });\n// Cette classe utilise 3 instances d'autres classes afin de construire un article.\r\n// Chacun de ces articles est une carte de photographe dans la page d'accueil.\r\nclass ArticlePartFactory {\r\n    constructor (type, data) {\r\n        if (!data) {\r\n            throw new Error(\"Vous avez oublié des éléments !\");\r\n        }\r\n        switch (type) {\r\n            case \"link\":\r\n                return new ArticleLink(data);\r\n            case \"descr\":\r\n                return new ArticleDescr(data);\r\n            case \"tags\":\r\n                return new ArticleTags(data);\r\n            default:\r\n                throw new Error(\"Type de données non reconnu !\");\r\n        }\r\n    }\r\n}\r\n\r\n// Cette classe construit le lien contenant l'image et le nom.\r\nclass ArticleLink {\r\n    link = null;\r\n    constructor (data) {\r\n        const {portrait, name, id} = data;\r\n        this.link = this.homePhotoLink(portrait, name, id)\r\n    }\r\n\r\n    homePhotoLink(portrait, name, id) {\r\n        let link = document.createElement(\"a\");\r\n        link.href = \"photographer-page.html?id=\" + id;\r\n        link.className = \"dyn_home_photoLink\";\r\n        link.setAttribute(\"aria-label\", name);\r\n        let linkImg = document.createElement(\"img\");\r\n        linkImg.src = \"Images/ID_Photos/\" + portrait;\r\n        linkImg.className = \"dyn_round_img\";\r\n        let linkH2 = document.createElement(\"h2\");\r\n        linkH2.innerText = name;\r\n        linkH2.className = \"dyn_home_h2\";\r\n        link.appendChild(linkImg);\r\n        link.appendChild(linkH2);\r\n        return link;\r\n    }\r\n\r\n    toHTML() {\r\n        return this.link;\r\n    }\r\n}\r\n\r\n// Cette classe construit la div contenant la description.\r\nclass ArticleDescr {\r\n    descr = null;\r\n    constructor (data) {\r\n        const {city, country, tagline, price} = data;\r\n        this.descr = this.homeCardDescr(city, country, tagline, price)\r\n    }\r\n\r\n    homeCardDescr(city, country, tagline, price) {\r\n        let description = document.createElement(\"div\");\r\n        description.className = \"dyn_home_card_descr\";\r\n        let descriptionPlace = document.createElement(\"p\");\r\n        descriptionPlace.innerText = city + \", \" + country;\r\n        descriptionPlace.className = \"dyn_home_card_lieu\";\r\n        descriptionPlace.setAttribute(\"lang\", \"en\");\r\n        descriptionPlace.setAttribute(\"aria-label\", city + \", \" + country);\r\n        let descriptionSlogan = document.createElement(\"p\");\r\n        descriptionSlogan.innerText = tagline;\r\n        descriptionSlogan.className = \"dyn_home_card_slogan\";\r\n        descriptionSlogan.setAttribute(\"aria-label\", tagline);\r\n        let descriptionPrix = document.createElement(\"p\");\r\n        descriptionPrix.innerText = price + \"€/jour\";\r\n        descriptionPrix.className = \"dyn_home_card_prix\";\r\n        descriptionPrix.setAttribute(\"aria-label\", price);\r\n        description.appendChild(descriptionPlace);\r\n        description.appendChild(descriptionSlogan);\r\n        description.appendChild(descriptionPrix);\r\n        return description;\r\n    }\r\n\r\n    toHTML() {\r\n        return this.descr;\r\n    }\r\n}\r\n\r\n// Cette classe construit la div contenant les tags.\r\nclass ArticleTags {\r\n    tags = null;\r\n    constructor (data) {\r\n        const {tags} = data;\r\n        this.tags = this.homeCardTags(tags)\r\n    }\r\n\r\n    homeCardTags(tags) {\r\n        let tagGroup = document.createElement(\"nav\");\r\n        tagGroup.className = \"barnav\";\r\n        tagGroup.setAttribute(\"lang\", \"en\");\r\n        tagGroup.setAttribute(\"aria-label\", \"Catégories du photographe\");\r\n        for (let tag of tags) {\r\n          let tagGroupLink = document.createElement(\"a\");\r\n          tagGroupLink.href = \"#\";\r\n          tagGroupLink.className = \"tag\";\r\n          tagGroupLink.id = \"tag\";\r\n          tagGroupLink.setAttribute(\"aria-label\", tag);\r\n          let tagGroupSpan = document.createElement(\"span\");\r\n          tagGroupSpan.innerText = \"#\" + tag;\r\n          tagGroupLink.appendChild(tagGroupSpan);\r\n          tagGroup.appendChild(tagGroupLink);\r\n        }\r\n        return tagGroup;\r\n    }\r\n\r\n    toHTML() {\r\n        return this.tags;\r\n    }\r\n}\n\n//# sourceURL=webpack://projet06/./articlePartFactory.js?");

/***/ }),

/***/ "./scripts-accueil.js":
/*!****************************!*\
  !*** ./scripts-accueil.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ \"./services.js\");\n/* harmony import */ var _articlePartFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./articlePartFactory */ \"./articlePartFactory.js\");\n// Récupération des données \"photographes\" du fichier JSON.\r\n\r\n\r\n// PAGE D'ACCUEIL\r\n// Récupération des données dynamiques pour chaque carte de la page d'accueil.\r\n\r\n\r\n// Organise en carte toutes les données précédemment récupérées.\r\nfunction fillArticle(photographer) {\r\n  let fullArticle = document.createElement(\"article\");\r\n  fullArticle.className = \"home_card\";\r\n  let link = new _articlePartFactory__WEBPACK_IMPORTED_MODULE_1__.ArticlePartFactory(\"link\", photographer);\r\n  let descr = new _articlePartFactory__WEBPACK_IMPORTED_MODULE_1__.ArticlePartFactory(\"descr\", photographer);\r\n  let tags = new _articlePartFactory__WEBPACK_IMPORTED_MODULE_1__.ArticlePartFactory(\"tags\", photographer);\r\n  fullArticle.appendChild(link.toHTML());\r\n  fullArticle.appendChild(descr.toHTML());\r\n  fullArticle.appendChild(tags.toHTML());\r\n  return fullArticle;\r\n}\r\n\r\nlet photographers = [];\r\n\r\n// Montre toutes les cartes remplies dynamiquement (1ère partie).\r\nasync function showPhotographers1() {\r\n  photographers = await (0,_services__WEBPACK_IMPORTED_MODULE_0__.getPhotographers)();\r\n  showPhotographers2(photographers);\r\n}\r\nshowPhotographers1();\r\n\r\n// Montre toutes les cartes remplies dynamiquement (2ème partie).\r\nfunction showPhotographers2(photographers) {\r\n  let section = document.querySelector(\".main_section\");\r\n  section.innerText = \"\";\r\n  for (let photographer of photographers) {\r\n    let article = fillArticle(photographer);\r\n    section.appendChild(article);\r\n  }\r\n}\r\n\r\n// Récupère chacun des tags et leur valeur pour la fonction suivante.\r\nlet tags = document.querySelectorAll(\".barnavTag\");\r\nlet target = null;\r\ntags.forEach((tag) => {\r\n  tag.addEventListener(\"click\", clickGetTag);\r\n  function clickGetTag(el) {\r\n    console.log(el);\r\n    target = el.currentTarget;\r\n    let tagValue = target.id;\r\n    showByTag(tagValue);\r\n  };\r\n  tag.addEventListener(\"keydown\", keyDownGetTag);\r\n  function keyDownGetTag(e, el) {\r\n    if (e.key == \"Enter\") {\r\n      //clickGetTag(el);\r\n      target = el.currentTarget;\r\n      // A chaque appui sur \"Entrée\", la ligne ci-dessus provoque l'erreur \"el is undefined\"...\r\n      let tagValue = target.id;\r\n      showByTag(tagValue);\r\n    }\r\n  };\r\n});\r\n\r\n// Montre les photographes en fonction du tag choisi.\r\nfunction showByTag(tag) {\r\n  let photographersByTag = photographers.filter(function(element) {\r\n    if (element.tags.includes(tag)) {\r\n      return element;\r\n    }\r\n  });\r\n  showPhotographers2(photographersByTag);\r\n}\n\n//# sourceURL=webpack://projet06/./scripts-accueil.js?");

/***/ }),

/***/ "./services.js":
/*!*********************!*\
  !*** ./services.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getPhotographers\": () => (/* binding */ getPhotographers),\n/* harmony export */   \"getPhotographer\": () => (/* binding */ getPhotographer),\n/* harmony export */   \"getMediasByPhotographers\": () => (/* binding */ getMediasByPhotographers)\n/* harmony export */ });\n// Récupère l'intégralité du fichier JSON.\r\nasync function getAll() {\r\n    let data = await fetch(\"FishEyeData.json\").then((res)=>res.json());\r\n    return data;\r\n}\r\n\r\n// Récupère l'intégralité du tableau \"photographers\" du fichier JSON.\r\nconst getPhotographers = async() => {\r\n    let {photographers} = await getAll();\r\n    return photographers;\r\n}\r\n\r\n// Récupère le photographe concerné par l'id demandé.\r\nconst getPhotographer = async(id) => {\r\n    let photographers = await getPhotographers();\r\n    let photographer = photographers.find(data => data.id == id);\r\n    return photographer;\r\n}\r\n\r\n// Récupère les médias concernés par le photographe demandé.\r\nconst getMediasByPhotographers = async(id) => {\r\n    let {media} = await getAll();\r\n    let medias = media.filter(data => data.photographerId == id);\r\n    return medias;\r\n}\n\n//# sourceURL=webpack://projet06/./services.js?");

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