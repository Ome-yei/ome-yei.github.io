/***   Element Selection   ***/
const formContainer = document.querySelector(".form-info");

const applyNowContainer = document.querySelector(
  ".apply-now__section .container"
);
const form = document.getElementById("form");
const sendingLoader = document.querySelector(".sending-form");
const result = document.querySelector(".form-submit-result");

// Form Submit Result Selector
const formSubmitResult = document.querySelector(".form-submit-result");
const formSubmitResult_Icon = document.querySelector(
  ".form-submit-result_icon"
);
const formSubmitResult_Header = document.querySelector(
  ".form-submit-result_header"
);
const formSubmitResult_Text = document.querySelector(
  ".form-submit-result_text"
);

const phoneNumberInput = document.getElementById("phoneInput");

// Attachment
const file = document.getElementById("attachment");

/***   Global  Variables   ***/
const formSubmitResultMessages = {
  success: {
    iconSrc: "assets/icons/carbon_success.svg",
    alt: "check-mark icon",
    header: "Form submitted successfully!",
    headerColor: "#14ae5c",
    text: "Thank you! The form has been submitted successfully. We will reply to you soon!",
  },
  error: {
    iconSrc: "assets/icons/carbon_error.svg",
    alt: "error icon",
    header: "Oops! Something went wrong.",
    headerColor: "#f24822",
    text: "Please try again later.",
  },
};

/***   Functions   ***/
const setFormSubmitResult = ({ iconSrc, alt, header, headerColor, text }) => {
  formSubmitResult.style.display = "block";
  formSubmitResult_Icon.src = iconSrc;
  formSubmitResult_Icon.alt = alt;
  formSubmitResult_Header.textContent = header;
  formSubmitResult_Header.style.color = headerColor;
  formSubmitResult_Text.textContent = text;
};

function formatPhoneNumber(phoneNumberString) {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return match[1] + "-" + match[2] + "-" + match[3];
  }
  return phoneNumberString;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  // format phone number
  phoneNumberInput.value = formatPhoneNumber(phoneNumberInput.value);

  const formData = new FormData(form);
  formData.append("access_key", "8dc4d7a7-bd3c-4ea3-99a4-d5ea0f637ed6");
  formData.append("subject", "New Submission from Web3Forms");
  // const object = Object.fromEntries(formData);
  // const json = JSON.stringify(object);

  // Start steps
  formContainer.style.display = "none";
  sendingLoader.style.display = "block";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
  })
    .then(async (response) => {
      if (response.status == 200) {
        sendingLoader.style.display = "none";
        setFormSubmitResult(formSubmitResultMessages.success);
      } else {
        console.log(response);
      }
    })
    .catch((error) => {
      sendingLoader.style.display = "none";
      setFormSubmitResult(formSubmitResultMessages.error);
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        formSubmitResult.style.display = "none";
        formContainer.style.display = "block";
      }, 2000);
    });
});

/* STEPS

  On form submit:
      set the forms visibility: hidden;
      set the loader visibility: visible & set the form's min-height to formContainerHeight

  On response success:
      set loader visibility: hidden;
      set result message: visibility: visible
      wait for 3 seconds
      set result message: visibility: hidden
      set forms: visibility: visible
      reset the form to repeat the process again.

[03/10/2025]

[] Make attachment required
[] Create function to check file size
[] Look into google captcha v3
[] Implement domain restriction
[] Customize email massaging
[] Style form

[] Dynamic file name change
      - default message when no attachment has been added
      - when file is uploaded, get name and replace default message
      - when file is uploaded, display 'x' icon

[] On label hover change the background color of the upload icon
*/
