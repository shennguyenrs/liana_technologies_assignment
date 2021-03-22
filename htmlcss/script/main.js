/* Variables */

const pattern = /^\S+@\S+.((\S+){2,3})$/;
const url = "https://91.156.67.165:3001/db/customers";

/* Functions definitions */

// Animate Values
const animateValue = (obj, start, end, duration) => {
  let startTime = null;

  const step = (timeStamp) => {
    if (!startTime) startTime = timeStamp;

    const progress = Math.min((timeStamp - startTime) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};

// Handle submit newsletter & utm form
const handleSubmit = () => {
  const email = document.querySelector(
    ".newsletter-section input[name='email']"
  ).value;

  if (checkEmail(email)) {
    const data = document.forms["post-data"];

    // Disable submit button
    $(".spinner-border").css("display", "inline-block");
    $(".form-group button").css("display", "none");

    fetch(url, { method: "POST", body: new FormData(data) })
      .then((res) => {
        console.log("Success post data", res);

        // Clear form after submit data
        const input = document.querySelectorAll("input[type='text']");
        input.forEach((item) => {
          item.value = "";
        });

        // Display thank you message
        onOverlay();
      })
      .catch((err) => console.log(err.message));
  } else {
    alert("Your email is wrong format");
  }
};

// Check email format
const checkEmail = (email) => email.match(pattern);

// Turn off thank you overlay
const offOverlay = () => {
  $(".thankyou").css("display", "none");
};

// Turn on thank you overlay
const onOverlay = () => {
  $(".thankyou").css("display", "block");
};

// Toggle class
const toggleClass = (element, className) => element.classList.toggle(className);

// Contains class
const containClass = (element, className) =>
  element.classList.contains(className);

window.onload = () => {
  // Animate numbers
  const clients = document.querySelector(".clients-number h3");
  animateValue(clients, 2000, 3000, 2000);

  const employee = document.querySelector(".employee-number h3");
  animateValue(employee, 100, 180, 2000);

  const users = document.querySelector(".users-number h3");
  animateValue(users, 9000, 10000, 2000);

  // UTM Parser
  if (window.location.search !== "") {
    const utmTags = window.location.search.slice(1).split("&");

    utmTags.forEach((item) => {
      const [tag, value] = item.split("=");
      const element = document.querySelector("." + tag);

      if (element) {
        element.value = value;
      }
    });
  }

  // Invalid effect on email input
  const emailElement = document.querySelector(
    ".newsletter-section input[name='email']"
  );

  emailElement.onchange = () => {
    const emailValue = emailElement.value;

    if (!pattern.test(emailValue)) {
      if (!containClass(emailElement, "invalid")) {
        toggleClass(emailElement, "invalid");
      }
      if (containClass(emailElement, "valid")) {
        toggleClass(emailElement, "valid");
      }
    } else {
      if (!containClass(emailElement, "valid")) {
        toggleClass(emailElement, "valid");
      }
      if (containClass(emailElement, "invalid")) {
        toggleClass(emailElement, "invalid");
      }
    }
  };
};
