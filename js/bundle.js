/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/util */ "./js/utils/util.js");


function form(formSelector) {
  const form = document.querySelector(formSelector);
  const btnCalculate = form.querySelector('[name="submit"]');
  const btnReset = form.querySelector('[name="reset"]');

  (0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.getDynamicInformation)('input[type="text"]');
  (0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.getStaticInformation)('[name="gender"]', '[name="activity"]');

  form.addEventListener('input', () => {
    (0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.setBtnResetNotDisabled)(btnReset, 'input[type="text"]');
    (0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.updateTotal)();
  });
  
  form.addEventListener('reset', () => (0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.reset)(btnCalculate, btnReset));

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    (0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.calcTotal)();
    (0,_utils_util__WEBPACK_IMPORTED_MODULE_0__.showTotal)();
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/utils/util.js":
/*!**************************!*\
  !*** ./js/utils/util.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "calcTotal": () => (/* binding */ calcTotal),
/* harmony export */   "getDynamicInformation": () => (/* binding */ getDynamicInformation),
/* harmony export */   "getStaticInformation": () => (/* binding */ getStaticInformation),
/* harmony export */   "reset": () => (/* binding */ reset),
/* harmony export */   "setBtnResetNotDisabled": () => (/* binding */ setBtnResetNotDisabled),
/* harmony export */   "showTotal": () => (/* binding */ showTotal),
/* harmony export */   "updateTotal": () => (/* binding */ updateTotal)
/* harmony export */ });
const resultBox = document.querySelector('.counter__result');
const resultNorm = resultBox.querySelector('#calories-norm');
const resultMin = resultBox.querySelector('#calories-minimal');
const resultMax = resultBox.querySelector('#calories-maximal');

let arr = [],
    sex = 'male',
    ratio = 1.2,
    age, height, weight;

const PhysicalActivityRatio = {
  WEIGHT: 10,
  HEIGHT: 6.25,
  AGE: 5,
};

const GenderRatio = {
  MALE: -5,
  FEMALE: 161,
};

const CaloriesMinMaxRatio = {
  MIN: 0.85,
  MAX: 1.15,
};

const getId = elem =>  elem.getAttribute('id');

const validateInput = (input) => {
  const btn = document.querySelector('[name="submit"]');

  if (!input.value.match(/\D/g) && !input.value.match(/\s/g) && input.value !== '') {
    if (!arr.includes(input)) {
      arr.push(input);
      input.style.border = '';
    }
  } else {
    if (arr.includes(input)) {
      arr.splice(arr.indexOf(input), 1);
    }
    input.style.border = '1px solid red';
  }

  if (arr.length === 3) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
    resultBox.classList.add('counter__result--hidden');
  }
};

const checkValue = input => input.value !== '';

const setBtnResetNotDisabled = (btn, selector) => {
  const inputs = Array.from(document.querySelectorAll(selector));

  if (inputs.some(checkValue)) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
};

const reset = (...btns) => {
  btns.forEach(btn => setTimeout(() => btn.disabled = true), 1);
  
  resultBox.classList.add('counter__result--hidden');

  return (
    arr = [],
    age, 
    weight, 
    height,
    sex = 'male'
  );
};

const getDynamicInformation = (selector) => {
  const inputs = document.querySelectorAll(selector);

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      validateInput(input);

      switch(getId(input)) {
        case 'height': 
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }
    });
  });
};

const getStaticInformation = (inputsSelector, radioSelector) => {
  const inputs = document.querySelectorAll(inputsSelector);
  const radios = document.querySelectorAll(radioSelector);

  inputs.forEach(input => {
    input.addEventListener('click', () => {
      
      switch(getId(input)) {
        case 'gender-male':
          return (sex = 'male');
        case 'gender-female':
          return (sex = 'female');
      }
    });
  });

  radios.forEach(radio => {
    radio.addEventListener('click', () => {

      switch(getId(radio)) {
        case 'activity-minimal':
          return (ratio = 1.2);
        case 'activity-low':
          return (ratio = 1.375);
        case 'activity-medium':
          return (ratio = 1.55);
        case 'activity-high':
          return (ratio = 1.725);
        case 'activity-maximal':
          return (ratio = 1.9);
      }
    });
  });
};

const calc = (age, weight, height, sex, ratio) => {
  return (
    Math.round(((PhysicalActivityRatio.WEIGHT * weight) + (PhysicalActivityRatio.HEIGHT * height) - (PhysicalActivityRatio.AGE * age) - GenderRatio[sex.toUpperCase()]) * ratio)
  );
};

const calcTotal = () => {
  resultNorm.textContent = calc(age, weight, height, sex, ratio);
  resultMin.textContent = Math.round(calc(age, weight, height, sex, ratio) * CaloriesMinMaxRatio.MIN);
  resultMax.textContent = Math.round(calc(age, weight, height, sex, ratio) * CaloriesMinMaxRatio.MAX);
};

const showTotal = () => resultBox.classList.remove('counter__result--hidden');

const updateTotal = () => calcTotal();



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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");


window.addEventListener('DOMContentLoaded', () => (0,_modules_form__WEBPACK_IMPORTED_MODULE_0__["default"])('.form'));

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map