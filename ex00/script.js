
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
    // Toggle between dark and light themes.
    document.body.classList.toggle("light-theme");

    const isLightMode =
      document.body.classList.contains("light-theme");

    // Save the selected theme.
    localStorage.setItem(
      "portfolio-theme",
      isLightMode ? "light" : "dark"
    );

    // Update the theme button.
    updateThemeButton(isLightMode);
  });
}

/* 2. CONTACT FORM WITH FORMSPREE */

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

// Replace this URL with your actual Formspree endpoint.
const FORMSPREE_URL = "https://formspree.io/f/xwlvydlp";

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", async function (event) {
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

    // Check that all fields are completed.
    if (name === "" || email === "" || message === "") {
      formMessage.textContent = "Please complete all fields.";
      return;
    }

    // Validate the email address.
    if (!emailInput.checkValidity()) {
      formMessage.textContent =
        "Please enter a valid email address.";
      return;
    }

    const submitButton = contactForm.querySelector(
      'button[type="submit"]'
    );

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    formMessage.textContent = "";

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        formMessage.textContent =
          "Thank you, " + name +
          "! Your message was sent successfully.";

        contactForm.reset();
      } else {
        formMessage.textContent =
          "Unable to send your message. Please try again.";
      }
    } catch (error) {
      formMessage.textContent =
        "A network error occurred. Please try again.";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Message";
      }
    }
  });
}

/* 3. AUTOMATIC FOOTER YEAR */

const currentYear = document.getElementById("current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
