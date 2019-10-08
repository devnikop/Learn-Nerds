const modalOpen = openButton => {
  openButton.addEventListener("click", evt => {
    const modalFeedbackElement = document.querySelector(".modal--feedback");
    const modalFeedbackCloseElement = modalFeedbackElement.querySelector(
      ".modal__close"
    );
    const modalFeedbackFormElement = modalFeedbackElement.querySelector(
      ".modal__form"
    );
    const modalInputNameElement = modalFeedbackFormElement.querySelector(
      ".form__input--name"
    );
    const modalInputEmailElement = modalFeedbackFormElement.querySelector(
      ".form__input--email"
    );
    const modalInputTextareaElement = modalFeedbackFormElement.querySelector(
      ".form__input--textarea"
    );

    let isStorageSupport = true;
    const storage = {};

    try {
      storage.storage_name = localStorage.getItem("name");
      storage.storage_email = localStorage.getItem("email");
      storage.storage_text = localStorage.getItem("text");
    } catch (err) {
      isStorageSupport = false;
    }

    evt.preventDefault();
    modalFeedbackElement.classList.add("modal--open");

    if (storage.storage_name && storage.storage_email && storage.storage_text) {
      modalInputNameElement.value = storage.storage_name;
      modalInputEmailElement.value = storage.storage_email;
      modalInputTextareaElement.value = storage.storage_text;
      modalInputTextareaElement.focus();
    } else if (storage.storage_name) {
      modalInputNameElement.value = storage.storage_name;
      modalInputEmailElement.focus();
    } else if (storage.storage_email) {
      modalInputEmailElement.value = storage.storage_email;
      modalInputTextareaElement.focus();
    } else if (storage.storage_text) {
      modalInputTextareaElement.value = storage.storage_text;
    }

    const modalFeedbackClose = () => {
      modalFeedbackElement.classList.remove("modal--open");
      modalFeedbackElement.classList.remove("modal--error");
    };

    const modalFeedbackCloseCallback = () => {
      modalFeedbackClose();
    };

    modalFeedbackCloseElement.addEventListener(
      "click",
      modalFeedbackCloseCallback
    );

    const modalFeedbackCloseEscapeCallback = evt => {
      if (evt.key === "Escape") {
        evt.preventDefault();
        if (modalFeedbackElement.classList.contains("modal--open")) {
          modalFeedbackClose();
        }
      }
    };

    window.addEventListener("keydown", modalFeedbackCloseEscapeCallback);

    modalFeedbackFormElement.addEventListener("submit", evt => {
      if (
        !modalInputNameElement.value ||
        !modalInputEmailElement.value ||
        !modalInputTextareaElement.value
      ) {
        evt.preventDefault();
        modalFeedbackElement.classList.remove("modal--error");
        modalFeedbackElement.offsetWidth = modalFeedbackElement.offsetWidth;
        modalFeedbackElement.classList.add("modal--error");
      }
    });

    modalFeedbackFormElement.addEventListener("change", () => {
      if (isStorageSupport) {
        localStorage.setItem("name", modalInputNameElement.value);
        localStorage.setItem("email", modalInputEmailElement.value);
        localStorage.setItem("text", modalInputTextareaElement.value);
      }
    });
  });
};

const sliderInitialize = () => {
  const sliderSectionElement = document.querySelector(".slider");
  const sliderItemElements = sliderSectionElement.querySelectorAll(
    ".slider__item"
  );

  const sliderControlsListElement = sliderSectionElement.querySelector(
    ".controls"
  );
  const sliderControlButtonElements = sliderControlsListElement.querySelectorAll(
    ".controls__button"
  );

  sliderControlsListElement.addEventListener("click", evt => {
    const isButton = element => element.classList.contains("controls__button");
    const isCurrentButton = element =>
      element.classList.contains("controls__button--current");

    const hideAllSlides = elements => {
      elements.forEach(item => {
        item.classList.remove("slider__item--current");
      });
    };
    const resetControlButtonsStates = elements => {
      elements.forEach(item => {
        item.classList.remove("controls__button--current");
      });
    };
    const showCurrentSlider = element => {
      element.classList.add("slider__item--current");
    };
    const setCurrentControlButtonState = element => {
      element.classList.add("controls__button--current");
    };

    const currentElement = evt.target;
    if (isButton(currentElement) && !isCurrentButton(currentElement)) {
      sliderControlButtonElements.forEach((item, i) => {
        if (currentElement === item) {
          hideAllSlides(sliderItemElements);
          showCurrentSlider(sliderItemElements[i]);

          resetControlButtonsStates(sliderControlButtonElements);
          setCurrentControlButtonState(sliderControlButtonElements[i]);
        }
      });
    }
  });
};

const writeUsElement = document.querySelector(".write-us-js");
modalOpen(writeUsElement);

sliderInitialize();
