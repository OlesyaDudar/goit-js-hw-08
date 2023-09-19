import throttle from 'lodash.throttle';

const LOCAL_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

function handleInput(event) {
  const {
    elements: {
      email: { value: email },
      message: { value: message },
    },
  } = form;

  //   console.log(email, message);
  setData({ email, message });
}

function setData(dataObj) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(dataObj));
}

function handleSubmit(event) {
  event.preventDefault();
  console.log(form.email.value, form.message.value);

  event.target.reset();
  localStorage.removeItem(LOCAL_KEY);
}
function begin() {
  form.addEventListener('input', throttle(handleInput, 500));

  form.addEventListener('submit', handleSubmit);
  if (localStorage.getItem(LOCAL_KEY) !== '') {
    const oldObj = JSON.parse(localStorage.getItem(LOCAL_KEY)) || {
      email: '',
      message: '',
    };
    form.email.value = oldObj.email;
    form.message.value = oldObj.message;
  }
}

window.onload = begin;
