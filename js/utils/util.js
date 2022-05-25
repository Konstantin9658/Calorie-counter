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

export {
  getDynamicInformation,
  getStaticInformation,
  setBtnResetNotDisabled,
  calcTotal,
  updateTotal,
  showTotal,
  reset
};