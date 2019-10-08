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

    const modalFeedbackCloseCallback = () => {
      modalFeedbackElement.classList.remove("modal--open");
      modalFeedbackElement.classList.remove("modal--error");
    };

    modalFeedbackCloseElement.addEventListener(
      "click",
      modalFeedbackCloseCallback
    );

    const modalFeedbackCloseEscapeCallback = evt => {
      if (evt.key === "Escape") {
        evt.preventDefault();
        if (modalFeedbackElement.classList.contains("modal--open")) {
          modalFeedbackElement.classList.remove("modal--open");
          modalFeedbackElement.classList.remove("modal--error");
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

const writeUsElement = document.querySelector(".write-us-js");
modalOpen(writeUsElement);
