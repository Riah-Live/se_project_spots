const resetValidation = (formEl, inputList, config) => {
  inputList.forEach((input) => {
    hideInputError(formEl, input, config);
  });
  const modalButtonDisabled = formEl.querySelector(".modal__button");
  toggleButtonState(inputList, modalButtonDisabled, config);
};

const showInputError = (formEl, inputElement, errorMsg, config) => {
  const errorMsgEl = formEl.querySelector(`#${inputElement.id}-error`);
  errorMsgEl.textContent = errorMsg;

  inputElement.classList.add(config.inputErrorClass);
  errorMsgEl.classList.add(config.errorClass);
};

const hideInputError = (formEl, inputElement, config) => {
  const errorMsgEl = formEl.querySelector(`#${inputElement.id}-error`);
  errorMsgEl.textContent = " ";
  inputElement.classList.remove(config.inputErrorClass);
  errorMsgEl.classList.remove(config.errorClass);
};

const checkInputValidity = (formEl, inputElement, config) => {
  console.log(inputElement.validationMessage);
  if (!inputElement.validity.valid) {
    showInputError(
      formEl,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formEl, inputElement, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonElement = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formEl, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};
