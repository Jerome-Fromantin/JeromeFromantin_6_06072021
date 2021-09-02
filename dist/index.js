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

/***/ "./javascript/articlePartFactory.js":
/*!******************************************!*\
  !*** ./javascript/articlePartFactory.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ArticlePartFactory)\n/* harmony export */ });\n/* harmony import */ var _articlelink__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./articlelink */ \"./javascript/articlelink.js\");\n/* harmony import */ var _articledescr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./articledescr */ \"./javascript/articledescr.js\");\n/* harmony import */ var _articletags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./articletags */ \"./javascript/articletags.js\");\n// Importation des classes nécessaires pour la classe générale.\r\n\r\n\r\n\r\n\r\n// Cette classe permet de construire la carte pour chaque photographe dans la page d'accueil.\r\nclass ArticlePartFactory {\r\n  constructor(type, data, onTag) {\r\n    if (!data) {\r\n      throw new Error('Vous avez oublié des éléments !');\r\n    }\r\n    switch (type) {\r\n      case 'link':\r\n        return new _articlelink__WEBPACK_IMPORTED_MODULE_0__.default(data);\r\n      case 'descr':\r\n        return new _articledescr__WEBPACK_IMPORTED_MODULE_1__.default(data);\r\n      case 'tags':\r\n        return new _articletags__WEBPACK_IMPORTED_MODULE_2__.default(data, onTag);\r\n      default:\r\n        throw new Error('Type de données non reconnu !');\r\n    }\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://projet06/./javascript/articlePartFactory.js?");

/***/ }),

/***/ "./javascript/articledescr.js":
/*!************************************!*\
  !*** ./javascript/articledescr.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ArticleDescr)\n/* harmony export */ });\n// Cette classe construit la div contenant la description\r\n// dans chaque carte de photographe de la page d'accueil.\r\nclass ArticleDescr {\r\n  constructor(data) {\r\n    // eslint-disable-next-line object-curly-newline\r\n    const { city, country, tagline, price } = data;\r\n    this.descr = this.homeCardDescr(city, country, tagline, price);\r\n  }\r\n\r\n  // eslint-disable-next-line class-methods-use-this\r\n  homeCardDescr(city, country, tagline, price) {\r\n    const description = document.createElement('div');\r\n    description.className = 'dyn_home_card_descr';\r\n    const descriptionPlace = document.createElement('p');\r\n    descriptionPlace.innerText = `${city}, ${country}`;\r\n    descriptionPlace.className = 'dyn_home_card_lieu';\r\n    descriptionPlace.setAttribute('lang', 'en');\r\n    descriptionPlace.setAttribute('aria-label', `${city}, ${country}`);\r\n    const descriptionSlogan = document.createElement('p');\r\n    descriptionSlogan.innerText = tagline;\r\n    descriptionSlogan.className = 'dyn_home_card_slogan';\r\n    descriptionSlogan.setAttribute('aria-label', tagline);\r\n    const descriptionPrix = document.createElement('p');\r\n    descriptionPrix.innerText = `${price}€/jour`;\r\n    descriptionPrix.className = 'dyn_home_card_prix';\r\n    descriptionPrix.setAttribute('aria-label', price);\r\n    description.appendChild(descriptionPlace);\r\n    description.appendChild(descriptionSlogan);\r\n    description.appendChild(descriptionPrix);\r\n    return description;\r\n  }\r\n\r\n  toHTML() {\r\n    return this.descr;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://projet06/./javascript/articledescr.js?");

/***/ }),

/***/ "./javascript/articlelink.js":
/*!***********************************!*\
  !*** ./javascript/articlelink.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ArticleLink)\n/* harmony export */ });\n// Cette classe construit le lien contenant l'image et le nom\r\n// dans chaque carte de photographe de la page d'accueil.\r\nclass ArticleLink {\r\n  constructor(data) {\r\n    const { portrait, name, id } = data;\r\n    this.link = this.homePhotoLink(portrait, name, id);\r\n  }\r\n\r\n  // eslint-disable-next-line class-methods-use-this\r\n  homePhotoLink(portrait, name, id) {\r\n    const link = document.createElement('a');\r\n    link.href = `photographer-page.html?id=${id}`;\r\n    link.className = 'dyn_home_photoLink';\r\n    link.setAttribute('aria-label', name);\r\n    const linkImg = document.createElement('img');\r\n    linkImg.src = `Images/ID_Photos/${portrait}`;\r\n    linkImg.className = 'dyn_round_img';\r\n    linkImg.setAttribute('alt', name);\r\n    const linkH2 = document.createElement('h2');\r\n    linkH2.innerText = name;\r\n    linkH2.className = 'dyn_home_h2';\r\n    link.appendChild(linkImg);\r\n    link.appendChild(linkH2);\r\n    return link;\r\n  }\r\n\r\n  toHTML() {\r\n    return this.link;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://projet06/./javascript/articlelink.js?");

/***/ }),

/***/ "./javascript/articletags.js":
/*!***********************************!*\
  !*** ./javascript/articletags.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ArticleTags)\n/* harmony export */ });\n// Cette classe construit la div contenant les tags\r\n// dans chaque carte de photographe de la page d'accueil.\r\nclass ArticleTags {\r\n  constructor(data, onTag) {\r\n    const { tags } = data;\r\n    this.tags = this.homeCardTags(tags, onTag);\r\n  }\r\n\r\n  // eslint-disable-next-line class-methods-use-this\r\n  homeCardTags(tags, onTag) {\r\n    const tagGroup = document.createElement('nav');\r\n    tagGroup.className = 'barnav';\r\n    tagGroup.setAttribute('lang', 'en');\r\n    tagGroup.setAttribute('aria-label', 'Photographer categories');\r\n    let tagValue = null;\r\n    let cardTarget = null;\r\n    function clickGetTag(el) {\r\n      cardTarget = el.currentTarget;\r\n      tagValue = cardTarget.id;\r\n      onTag(tagValue);\r\n      return tagValue;\r\n    }\r\n    function keyDownGetTag(el) {\r\n      if (el.key === 'Enter') {\r\n        clickGetTag(el);\r\n      }\r\n    }\r\n    // eslint-disable-next-line no-restricted-syntax\r\n    for (const tag of tags) {\r\n      const tagGroupLink = document.createElement('a');\r\n      tagGroupLink.href = '#';\r\n      tagGroupLink.className = 'tag';\r\n      tagGroupLink.id = tag;\r\n      tagGroupLink.setAttribute('aria-label', tag);\r\n      const tagGroupSpan = document.createElement('span');\r\n      tagGroupSpan.innerText = `#${tag}`;\r\n      tagGroupLink.addEventListener('click', clickGetTag);\r\n      tagGroupLink.addEventListener('keydown', keyDownGetTag);\r\n      tagGroupLink.appendChild(tagGroupSpan);\r\n      tagGroup.appendChild(tagGroupLink);\r\n    }\r\n    return tagGroup;\r\n  }\r\n\r\n  toHTML() {\r\n    return this.tags;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://projet06/./javascript/articletags.js?");

/***/ }),

/***/ "./javascript/scripts-accueil.js":
/*!***************************************!*\
  !*** ./javascript/scripts-accueil.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ \"./javascript/services.js\");\n/* harmony import */ var _articlePartFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./articlePartFactory */ \"./javascript/articlePartFactory.js\");\n/* eslint-disable no-use-before-define */\r\n/* eslint-disable array-callback-return */\r\n// Récupération des données \"photographes\" du fichier JSON.\r\n\r\n\r\n// PAGE D'ACCUEIL\r\n// Récupération des données dynamiques pour chaque carte de la page d'accueil.\r\n\r\n\r\nlet photographers = [];\r\n\r\n// Montre toutes les cartes remplies dynamiquement (1ère partie).\r\nasync function showPhotographers1() {\r\n  photographers = await (0,_services__WEBPACK_IMPORTED_MODULE_0__.getPhotographers)();\r\n  // eslint-disable-next-line no-use-before-define\r\n  showPhotographers2(photographers);\r\n}\r\nshowPhotographers1();\r\n\r\n// Montre toutes les cartes remplies dynamiquement (2ème partie).\r\n// eslint-disable-next-line no-shadow\r\nfunction showPhotographers2(photographers) {\r\n  const section = document.querySelector('.main_section');\r\n  section.innerText = '';\r\n  // eslint-disable-next-line no-restricted-syntax\r\n  for (const photographer of photographers) {\r\n    const article = fillArticle(photographer);\r\n    section.appendChild(article);\r\n  }\r\n}\r\n\r\n// Montre les photographes en fonction du tag choisi.\r\n// Ce tag est soit dans la barre de navigation du haut en version desktop ou mobile,\r\n// soit dans les cartes de photographes en dessous.\r\nfunction showByTag(tag) {\r\n  // eslint-disable-next-line consistent-return\r\n  const photographersByTopTag = photographers.filter((element) => {\r\n    if (element.tags.includes(tag)) {\r\n      return element;\r\n    }\r\n  });\r\n  showPhotographers2(photographersByTopTag);\r\n}\r\n\r\n// Organise en carte toutes les données précédemment récupérées.\r\nfunction fillArticle(photographer) {\r\n  const fullArticle = document.createElement('article');\r\n  fullArticle.className = 'home_card';\r\n  const link = new _articlePartFactory__WEBPACK_IMPORTED_MODULE_1__.default('link', photographer);\r\n  const descr = new _articlePartFactory__WEBPACK_IMPORTED_MODULE_1__.default('descr', photographer);\r\n  const tags = new _articlePartFactory__WEBPACK_IMPORTED_MODULE_1__.default('tags', photographer, showByTag);\r\n  fullArticle.appendChild(link.toHTML());\r\n  fullArticle.appendChild(descr.toHTML());\r\n  fullArticle.appendChild(tags.toHTML());\r\n  return fullArticle;\r\n}\r\n\r\n// Récupère chacun des tags du haut en desktop et leur valeur pour la fonction suivante.\r\nconst topTags = document.querySelectorAll('.barnavTag');\r\nlet topTarget = null;\r\ntopTags.forEach((tag) => {\r\n  tag.addEventListener('click', clickGetTag);\r\n  function clickGetTag(el) {\r\n    topTarget = el.currentTarget;\r\n    const tagValue = topTarget.id;\r\n    showByTag(tagValue);\r\n  }\r\n  tag.addEventListener('keydown', keyDownGetTag);\r\n  function keyDownGetTag(el) {\r\n    if (el.key === 'Enter') {\r\n      clickGetTag(el);\r\n    }\r\n  }\r\n});\r\n\r\n// Récupère chacun des tags du haut en mobile et leur valeur pour la fonction précédente.\r\nconst topTagsMob = document.querySelectorAll('.barnavTagMob');\r\nlet topTargetMob = null;\r\ntopTagsMob.forEach((tag) => {\r\n  tag.addEventListener('click', clickGetTag);\r\n  function clickGetTag(el) {\r\n    topTargetMob = el.currentTarget;\r\n    const tagValue = topTargetMob.id.split('M')[0];\r\n    showByTag(tagValue);\r\n  }\r\n  tag.addEventListener('keydown', keyDownGetTag);\r\n  function keyDownGetTag(el) {\r\n    if (el.key === 'Enter') {\r\n      clickGetTag(el);\r\n    }\r\n  }\r\n});\r\n\n\n//# sourceURL=webpack://projet06/./javascript/scripts-accueil.js?");

/***/ }),

/***/ "./javascript/services.js":
/*!********************************!*\
  !*** ./javascript/services.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getPhotographers\": () => (/* binding */ getPhotographers),\n/* harmony export */   \"getPhotographer\": () => (/* binding */ getPhotographer),\n/* harmony export */   \"getMediasByPhotographers\": () => (/* binding */ getMediasByPhotographers)\n/* harmony export */ });\n/* eslint-disable eqeqeq */\r\n// Récupère l'intégralité du fichier JSON.\r\nasync function getAll() {\r\n  const data = await fetch('FishEyeData.json').then((res) => res.json());\r\n  return data;\r\n}\r\n\r\n// Récupère l'intégralité du tableau \"photographers\" du fichier JSON.\r\nconst getPhotographers = async () => {\r\n  const { photographers } = await getAll();\r\n  return photographers;\r\n};\r\n\r\n// Récupère le photographe concerné par l'id demandé.\r\nconst getPhotographer = async (id) => {\r\n  const photographers = await getPhotographers();\r\n  const photographer = photographers.find((data) => data.id == id);\r\n  return photographer;\r\n};\r\n\r\n// Récupère les médias concernés par le photographe demandé.\r\nconst getMediasByPhotographers = async (id) => {\r\n  const { media } = await getAll();\r\n  const medias = media.filter((data) => data.photographerId == id);\r\n  return medias;\r\n};\r\n\n\n//# sourceURL=webpack://projet06/./javascript/services.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./javascript/scripts-accueil.js");
/******/ 	
/******/ })()
;