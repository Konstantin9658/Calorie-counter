import {setBtnResetNotDisabled, reset, calcTotal, getDynamicInformation, getStaticInformation, updateTotal, showTotal} from '../utils/util';

function form(formSelector) {
  const form = document.querySelector(formSelector);
  const btnCalculate = form.querySelector('[name="submit"]');
  const btnReset = form.querySelector('[name="reset"]');

  getDynamicInformation('input[type="text"]');
  getStaticInformation('[name="gender"]', '[name="activity"]');

  form.addEventListener('input', () => {
    setBtnResetNotDisabled(btnReset, 'input[type="text"]');
    updateTotal();
  });
  
  form.addEventListener('reset', () => reset(btnCalculate, btnReset));

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    calcTotal();
    showTotal();
  });
}

export default form;