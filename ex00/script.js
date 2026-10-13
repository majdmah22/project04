
"use strict";

/*
  EVENT LIFECYCLE:
  1. Event: the user clicks the theme button.
  2. Event listener: the browser detects the click.
  3. Callback: this function runs in response.
  4. DOM mutation: the page class and button text change.
  5. Persistence: localStorage saves the selected theme.
*/

/* 1. DARK AND LIGHT THEME */

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeLabel = document.getElementById("theme-label");

// Restore the previously saved theme when the page loads.
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
  document.body.classList.add("light-theme");
}

function updateThemeButton(isLightMode) {
  if (!themeIcon || !themeLabel || !themeToggle) {
    return;
  }

  if (isLightMode) {
    themeIcon.textContent = "☾";
    themeLabel.textContent = "Dark Mode";
    themeToggle.setAttribute("aria-label", "Switch to dark theme");
  } else {
    themeIcon.textContent = "☼";
    themeLabel.textContent = "Light Mode";
    themeToggle.setAttribute("aria-label", "Switch to light theme");
  }
}

// Match the button to the restored theme.
updateThemeButton(document.body.classList.contains("light-theme"));

if (themeToggle) {
  themeToggle.addEventListener("click", function () {
    // Callback: runs when the click event occurs.
    document.body.classList.toggle("light-theme");

    // Read the new state after changing the DOM.
    const isLightMode =
      document.body.classList.contains("light-theme");

    // Save the user's choice for the next visit.
    localStorage.setItem(
      "portfolio-theme",
      isLightMode ? "light" : "dark"
    );

    // Update the button to match the selected theme.
    updateThemeButton(isLightMode);
  });
}

/* 2. CONTACT FORM VALIDATION */

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    if (!nameInput || !emailInput || !messageInput) {
      formMessage.textContent =
        "The form could not be processed. Please try again.";
      return;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (name === "" || email === "" || message === "") {
      formMessage.textContent = "Please complete all fields.";
      return;
    }

    if (!emailInput.checkValidity()) {
      formMessage.textContent =
        "Please enter a valid email address.";
      return;
    }

    formMessage.textContent =
      "Thank you, " + name +
      "! Your form was validated successfully. No email was sent.";

    contactForm.reset();
  });
}

/* 3. AUTOMATIC FOOTER YEAR */

const currentYear = document.getElementById("current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
