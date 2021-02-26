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

/***/ "./src/ControlSetting.ts":
/*!*******************************!*\
  !*** ./src/ControlSetting.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ControlSetting = void 0;\nfunction ControlSetting(partInstrumentName, key, switchKey, soundOptionalParam) {\n    const keyStyled = key.toUpperCase();\n    // instrument image\n    const imageElem = document.createElement('img');\n    imageElem.src = soundOptionalParam.imageUrl || \"./\";\n    imageElem.classList.add('instrument__image');\n    // Name\n    const nameElem = document.createElement('p');\n    nameElem.textContent = partInstrumentName;\n    nameElem.classList.add('instrument__name');\n    // keybind\n    const keycontrolElem = document.createElement('input');\n    keycontrolElem.value = keyStyled;\n    keycontrolElem.addEventListener('focusin', event => {\n        keycontrolElem.classList.add('focus');\n        keycontrolElem.value = \"\";\n    });\n    keycontrolElem.addEventListener('focusout', event => {\n        keycontrolElem.classList.remove('focus');\n        keycontrolElem.value = keyStyled;\n        keycontrolElem.placeholder = \"pressione uma tecla\";\n    });\n    keycontrolElem.addEventListener('input', (event) => {\n        const key = event.data[0];\n        switchKey({ key, charCode: key.charCodeAt(0) });\n    }, false);\n    keycontrolElem.classList.add('instrument__control');\n    // keybind container\n    const keycontrolElemContainer = document.createElement('div');\n    keycontrolElemContainer.classList.add('instrument__control__container');\n    keycontrolElemContainer.appendChild(keycontrolElem);\n    // info container\n    const infoContainerElem = document.createElement('div');\n    infoContainerElem.classList.add('instrument__info');\n    infoContainerElem.appendChild(nameElem);\n    infoContainerElem.appendChild(keycontrolElemContainer);\n    // Main Container\n    const container = document.createElement('li');\n    container.classList.add('instrument__container');\n    container.appendChild(imageElem);\n    container.appendChild(infoContainerElem);\n    return container;\n}\nexports.ControlSetting = ControlSetting;\n\n\n//# sourceURL=webpack://teste/./src/ControlSetting.ts?");

/***/ }),

/***/ "./src/Sound.ts":
/*!**********************!*\
  !*** ./src/Sound.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Sound = void 0;\nclass Sound {\n    constructor(control, src, id, optionalParam) {\n        this.optionalParam = optionalParam;\n        this.id = id;\n        this.src = src;\n        this.control = control;\n        this.audioExample = new Audio(this.src);\n    }\n    play(event) {\n        const keyCon = this.control.key === event.key;\n        const charCodeCon = this.control.charCode && this.control.charCode === (event.charCode || event.keyCode);\n        if (keyCon || charCodeCon) {\n            const audio = new Audio(this.src);\n            audio.addEventListener('ended', this.onSoundEnded);\n            this.onSoundStarted();\n            audio.play();\n        }\n    }\n    getAudio() {\n        return Object.assign({}, this.audioExample);\n    }\n    switchControl(control) {\n        this.control = control;\n    }\n}\nexports.Sound = Sound;\n\n\n//# sourceURL=webpack://teste/./src/Sound.ts?");

/***/ }),

/***/ "./src/Soundboard.ts":
/*!***************************!*\
  !*** ./src/Soundboard.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Soundboard = void 0;\nconst Sound_1 = __webpack_require__(/*! ./Sound */ \"./src/Sound.ts\");\nconst createUrlBuilder = (urlToSounds, extensionSoundFile) => {\n    return (soundfilename) => (urlToSounds.replace(/(?<!\\/)$/g, '/') +\n        soundfilename.replace(/(?<!\\.)$/g, '.') +\n        extensionSoundFile);\n};\nconst defaultOptions = {\n    caseSensitive: false\n};\nclass Soundboard {\n    constructor(urlToSounds, extensionSoundFile, options) {\n        this.sounds = [];\n        this.soundObservers = [];\n        this.settings = options ? Object.assign(Object.assign({}, defaultOptions), options) : defaultOptions;\n        this.buildUrl = createUrlBuilder(urlToSounds, extensionSoundFile);\n        document.body.addEventListener('keypress', event => {\n            if (event.target === document.body) {\n                this.play(event);\n            }\n        });\n    }\n    addSound(soundname, control, optionalParam) {\n        const audio = new Sound_1.Sound(control, this.buildUrl(soundname), soundname, optionalParam);\n        this.sounds.push(audio);\n        this.triggerSoundObservers();\n        return this;\n    }\n    addMultipleSounds(sounds) {\n        sounds.forEach(sound => {\n            const { key, charCode, soundname, optionalParam } = sound;\n            const control = { key, charCode };\n            this.addSound(soundname, control, optionalParam || {});\n        });\n        return this;\n    }\n    switchSoundKeybind(sound, control) {\n        sound.switchControl(control);\n        this.triggerSoundObservers();\n        return this;\n    }\n    triggerSoundObservers() {\n        this.soundObservers.forEach(observer => observer(this.sounds));\n    }\n    onSoundsChange(observer) {\n        this.soundObservers.push(observer);\n        return this;\n    }\n    play(event) {\n        for (let sound of this.sounds) {\n            sound.play(this.settings.caseSensitive ? (event) : (Object.assign(Object.assign({}, event), { key: event.key.toLowerCase(), charCode: String.fromCharCode(event.charCode || event.keyCode).toLowerCase().charCodeAt(0) })));\n        }\n        return this;\n    }\n    getSounds() { return [...this.sounds]; }\n}\nexports.Soundboard = Soundboard;\n\n\n//# sourceURL=webpack://teste/./src/Soundboard.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Soundboard_1 = __webpack_require__(/*! ./Soundboard */ \"./src/Soundboard.ts\");\nconst ControlSetting_1 = __webpack_require__(/*! ./ControlSetting */ \"./src/ControlSetting.ts\");\nconst sounds_1 = __webpack_require__(/*! ./sounds */ \"./src/sounds.ts\");\nconst soundboard = new Soundboard_1.Soundboard('public/audio', 'mp3');\nsoundboard.onSoundsChange(sounds => {\n    document.querySelectorAll('.controls-painel').forEach(settingsPainel => {\n        settingsPainel.innerHTML = \"\";\n        sounds.forEach(sound => {\n            const child = ControlSetting_1.ControlSetting(sound.id, sound.control.key, event => {\n                soundboard.switchSoundKeybind(sound, event);\n            }, sound.optionalParam);\n            sound.onSoundStarted = () => {\n                child.classList.add('played');\n                setTimeout(() => child.classList.remove('played'), 100);\n            };\n            settingsPainel.appendChild(child);\n        });\n    });\n});\nsoundboard.addMultipleSounds(sounds_1.sounds);\nconsole.log(soundboard);\n\n\n//# sourceURL=webpack://teste/./src/index.ts?");

/***/ }),

/***/ "./src/sounds.ts":
/*!***********************!*\
  !*** ./src/sounds.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.sounds = void 0;\nconst url = (filename, extension) => `/public/images/${filename}.${extension}`;\nexports.sounds = [\n    {\n        soundname: 'bumbo',\n        key: 'q',\n        charCode: null,\n        optionalParam: {\n            imageUrl: url('bumbo', 'jpg')\n        }\n    },\n    {\n        soundname: 'caixa',\n        key: 'w',\n        charCode: null,\n        optionalParam: {\n            imageUrl: url('caixa', 'jpg')\n        }\n    },\n    {\n        soundname: 'crash',\n        key: 'e',\n        charCode: null,\n        optionalParam: {\n            imageUrl: url('crash', 'jpg')\n        }\n    },\n    {\n        soundname: 'crash2',\n        key: 'r',\n        charCode: null,\n        optionalParam: {\n            imageUrl: url('crash2', 'jpeg')\n        }\n    },\n    {\n        soundname: 'hihat1',\n        key: 't',\n        charCode: null,\n        optionalParam: {\n            imageUrl: url('hihat', 'jpeg')\n        }\n    },\n    {\n        soundname: 'ride',\n        key: 'y',\n        charCode: null,\n        optionalParam: {\n            imageUrl: url('ride', 'png')\n        }\n    },\n    {\n        soundname: 'surdo',\n        key: 'u',\n        charCode: null,\n        optionalParam: {\n            imageUrl: url('surdo', 'jpg')\n        }\n    },\n    {\n        soundname: 'tom1',\n        key: 'i',\n        charCode: null,\n        optionalParam: {\n            imageUrl: url('tom', 'jpg')\n        }\n    },\n    {\n        soundname: 'tom2',\n        key: 'o',\n        charCode: null,\n        optionalParam: {\n            imageUrl: url('tom2', 'jpeg')\n        }\n    }\n];\n\n\n//# sourceURL=webpack://teste/./src/sounds.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;