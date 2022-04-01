const body = document.querySelector('.page');
const form = body.querySelector('.form');
const btnReset = form.querySelector('[name="reset"]');
const btnCalculate = form.querySelector('[name="submit"]');
const inputsFieldsValues = form.querySelectorAll('input[type="text"]');
const inputAge = form.querySelector('#age');
const inputWeight = form.querySelector('#weight');
const inputHeight = form.querySelector('#height');
const resultBox = body.querySelector('.counter__result');
const resultCaloriesNorm = resultBox.querySelector('#calories-norm');
const resultCaloriesMin = resultBox.querySelector('#calories-minimal');
const resultCaloriesMax = resultBox.querySelector('#calories-maximal');
const radioBtnsActivity = form.querySelectorAll('[name="activity"]');
const checkBoxGenders = form.querySelectorAll('[name="gender"]')

let genderValue;
let activityValue;
let calories = [];

const getGender = () => genderValue = form.querySelector('[name="gender"]:checked').value;
const getActivity = () => activityValue = form.querySelector('[name="activity"]:checked').value;

const getActivityValue = (activity) => {
  switch (activity) {
    case 'min':
      return 1.2;
    case 'low':
      return 1.375;
    case 'medium':
      return 1.55;
    case 'high':
      return 1.725;
    case 'max':
      return 1.9;
  }
}

const PhysicalActivityRatio = {
  WEIGHT: 10,
  HEIGHT: 6.25,
  AGE: 5,
}

const GenderRatio = {
  MALE: -5,
  FEMALE: 161,
}

const CaloriesMinMaxRatio = {
  MIN: 0.85,
  MAX: 1.15,
}

function setBtnResetNotDisabled() {
  if (inputAge.value !== '' || inputHeight.value !== '' || inputWeight.value !== '') {
    btnReset.disabled = false;
  } else {
    btnReset.disabled = true;
  }
}

function setBtnCalculateNotDisabled() {
  if (inputAge.value !== '' && inputHeight.value !== '' && inputWeight.value !== '') {
    btnCalculate.disabled = false;
  } else {
    btnCalculate.disabled = true;
    resultBox.classList.add('counter__result--hidden');
  }
}

for (let input of inputsFieldsValues) {
  input.addEventListener('input', setBtnResetNotDisabled);
  input.addEventListener('input', setBtnCalculateNotDisabled);
  input.addEventListener('input', updateCalories);
}

for (let radioBtn of radioBtnsActivity) {
  radioBtn.addEventListener('change', updateCalories);
}

for (let checkBox of checkBoxGenders) {
  checkBox.addEventListener('change', updateCalories);
}

btnReset.addEventListener('click', function () {
  setTimeout(() => {
    btnReset.disabled = true;
    btnCalculate.disabled = true;
    resultBox.classList.add('counter__result--hidden');
  }, 1);
});

btnCalculate.addEventListener('click', (evt) => {
  evt.preventDefault();
  resultBox.classList.remove('counter__result--hidden');
  calculateCalories(inputWeight, inputHeight, inputAge);
})

function calculateCalories(weight, height, age) {
  getGender();
  getActivity();

  const weightValue = PhysicalActivityRatio.WEIGHT * weight.value;
  const heightValue = PhysicalActivityRatio.HEIGHT * height.value;
  const ageValue = PhysicalActivityRatio.AGE * age.value;
  
  const normCalories = Math.round((weightValue + heightValue - ageValue - GenderRatio[genderValue.toUpperCase()]) * getActivityValue(activityValue));
  const maxCalories = Math.round(normCalories * CaloriesMinMaxRatio.MAX);
  const minCalories = Math.round(normCalories * CaloriesMinMaxRatio.MIN);

  return calories.push(normCalories, maxCalories, minCalories);
}

function updateCalories() {
  calories = [];

  calculateCalories(inputWeight, inputHeight, inputAge);
  
  resultCaloriesNorm.textContent = calories[0];
  resultCaloriesMax.textContent = calories[1];
  resultCaloriesMin.textContent = calories[2];
}