// Run immediately without waiting for DOMContentLoaded
(function () {
  createMatrixEffect();
  setupFaqAccordion();
  setupTerminalForm();
  setupHackerPanel();
  setupSmoothScrolling();
  setupMobileMenu();
  setupFaqButton();
  initDarkModeToggle();
})();

function setupHackerPanel() {
  const hackerButton = document.getElementById("hacker-button");
  const returnButton = document.getElementById("return-button");
  const hackerContent = document.getElementById("hacker-content");
  const lawButton = document.getElementById("law-button");
  const lawReturnButton = document.getElementById("law-return-button");
  const lawContent = document.getElementById("law-content");
  const hackerPanel = document.getElementById("hacker-panel");
  const lawPanel = document.getElementById("law-panel");
  const centerPanel = document.querySelector(".panel.center");

  // Store the original three-panel section HTML for restoration
  const threePanel = document.getElementById("discord");
  const originalHtml = threePanel ? threePanel.innerHTML : "";

  // Function to check if device is mobile
  const isMobile = () => window.innerWidth <= 768;

  // Hacker button click
  if (hackerButton) {
    hackerButton.addEventListener("click", function () {
      if (isMobile()) {
        // Simplified version for mobile
        hackerContent.style.display = "block";
        hackerButton.style.display = "none";

        // Hide law panel on mobile to save space
        if (lawPanel) {
          lawPanel.style.display = "none";
        }
      } else {
        // Desktop animation
        // Prepare all transitions first
        document.documentElement.style.setProperty(
          "--panel-transition",
          "all 0.8s cubic-bezier(0.19, 1, 0.22, 1)"
        );

        // Animate panels simultaneously
        centerPanel.style.transition = "var(--panel-transition)";
        lawPanel.style.transition = "var(--panel-transition)";
        hackerPanel.style.transition = "var(--panel-transition)";

        // Start animation
        lawPanel.style.flex = "0";
        lawPanel.style.opacity = "0";
        lawPanel.style.transform = "translateX(100px)";
        lawPanel.style.width = "0";

        // Change the image to hack.png
        document.getElementById("panel-image").src = "img/hack.png";

        // Start expanding hacker panel and adjusting center panel
        hackerPanel.style.flex = "3";
        centerPanel.style.flex = "0.7";

        // After initial animation completes, remove the law panel and show content
        setTimeout(() => {
          // Remove the law panel
          lawPanel.remove();

          // Hide the hacker button with fade
          hackerButton.style.transition = "opacity 0.3s ease";
          hackerButton.style.opacity = "0";

          setTimeout(() => {
            hackerButton.style.display = "none";

            // Show the hacker content with fade
            hackerContent.style.display = "block";
            hackerContent.style.opacity = "0";

            // Force reflow to ensure transition works
            hackerContent.offsetHeight;

            hackerContent.style.transition = "opacity 0.7s ease-in";
            hackerContent.style.opacity = "1";
          }, 300);
        }, 600);
      }
    });
  }

  // Law enforcement button click
  if (lawButton) {
    lawButton.addEventListener("click", function () {
      if (isMobile()) {
        // Simplified version for mobile
        lawContent.style.display = "block";
        lawButton.style.display = "none";

        // Hide hacker panel on mobile to save space
        if (hackerPanel) {
          hackerPanel.style.display = "none";
        }
      } else {
        // Desktop animation
        // Prepare all transitions first
        document.documentElement.style.setProperty(
          "--panel-transition",
          "all 0.8s cubic-bezier(0.19, 1, 0.22, 1)"
        );

        // Animate panels simultaneously
        centerPanel.style.transition = "var(--panel-transition)";
        hackerPanel.style.transition = "var(--panel-transition)";
        lawPanel.style.transition = "var(--panel-transition)";

        // Start animation
        hackerPanel.style.flex = "0";
        hackerPanel.style.opacity = "0";
        hackerPanel.style.transform = "translateX(-100px)";
        hackerPanel.style.width = "0";

        // Change the image to law.png
        document.getElementById("panel-image").src = "img/law.png";

        // Start expanding law panel and adjusting center panel
        lawPanel.style.flex = "3";
        centerPanel.style.flex = "0.7";

        // After initial animation completes, remove the hacker panel and show content
        setTimeout(() => {
          // Remove the hacker panel
          hackerPanel.remove();

          // Hide the law button with fade
          lawButton.style.transition = "opacity 0.3s ease";
          lawButton.style.opacity = "0";

          setTimeout(() => {
            lawButton.style.display = "none";

            // Show the law content with fade
            lawContent.style.display = "block";
            lawContent.style.opacity = "0";

            // Force reflow to ensure transition works
            lawContent.offsetHeight;

            lawContent.style.transition = "opacity 0.7s ease-in";
            lawContent.style.opacity = "1";
          }, 300);
        }, 600);
      }
    });
  }

  // Helper function for clean reset
  function resetPanels() {
    // Simple fast reset to original state

    // 1. First fade everything out
    threePanel.style.opacity = "0";
    threePanel.style.transition = "opacity 0.3s ease";

    // 2. After fadeout, reset completely
    setTimeout(() => {
      // Just reset to original HTML completely
      if (threePanel) {
        threePanel.innerHTML = originalHtml;
      }

      // Set up everything again fresh
      const centerPanelNew = threePanel.querySelector(".panel.center");
      const panelImage = document.getElementById("panel-image");

      // Reset image
      panelImage.src = "img/2faces.jpeg";

      // Force reflow
      threePanel.offsetHeight;

      // Fade back in
      threePanel.style.opacity = "1";

      // Setup the event listeners again
      setupHackerPanel();
    }, 300);
  }

  // Hacker return button click
  if (returnButton) {
    returnButton.addEventListener("click", function () {
      resetPanels();
    });
  }

  // Law enforcement return button click
  if (lawReturnButton) {
    lawReturnButton.addEventListener("click", function () {
      resetPanels();
    });
  }

  // Handle window resize events to manage transitions between mobile and desktop
  window.addEventListener("resize", function () {
    if (
      hackerContent.style.display === "block" ||
      lawContent.style.display === "block"
    ) {
      // Reset panels if size changed between breakpoints
      resetPanels();
    }
  });
}

function initDarkModeToggle(){
    const btn = document.querySelector('.dm-btn');
    const root = document.documentElement;
    const saved = localStorage.getItem('theme') || 'light';
    root.setAttribute('data-theme',saved);
    btn.textContent = saved === 'dark'
    ? '~/Light_Mode'
    : '~/Dark_Mode';
    btn.addEventListener('click',e => {
      e.preventDefault();
      const next = root.getAttribute('data-theme') === 'dark'
      ? 'light'
      : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      btn.textContent = next === 'dark'
      ? '~/Light_Mode'
      : '~/Dark_Mode';
    });
  }

function createMatrixEffect() {
  const matrixRain = document.getElementById("matrix-container");

  const characters = "01HACKJUSTICESECURITYCODEETHICS{}();=><";
  const numDrops = 15;

  for (let i = 0; i < numDrops; i++) {
    const drop = document.createElement("div");
    drop.className = "matrix-drop";
    drop.textContent =
      characters[Math.floor(Math.random() * characters.length)];

    // Random positions but no delays
    drop.style.left = Math.random() * 80 + 10 + "%";
    drop.style.top = Math.random() * 80 + "%";
    drop.style.animationDuration = Math.random() * 3 + 2 + "s";
    // No animation delay
    if (matrixRain) {
      matrixRain.appendChild(drop);
    }
  }
}

function setupFaqAccordion() {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const faqItem = question.parentElement;
      const isActive = faqItem.classList.contains("active");

      // Close all items
      document.querySelectorAll(".faq-item").forEach((item) => {
        item.classList.remove("active");
      });

      // Open clicked item if it wasn't already active
      if (!isActive) {
        faqItem.classList.add("active");
      }
    });
  });
}

function setupTerminalForm() {
  const contactForm = document.getElementById("contactForm");
  const terminalResponse = document.getElementById("terminal-response");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Get form data
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
      };

      // Show loading state
      terminalResponse.className = "terminal-message";
      terminalResponse.innerHTML =
        '<span class="blink">Transmitting message...</span>';
      terminalResponse.style.display = "block";

      try {
        // Send the request to the Vercel API endpoint
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        // Show response
        terminalResponse.className = `terminal-message ${
          data.success ? "success" : "error"
        }`;
        terminalResponse.innerHTML = `
                    <div class="terminal-response-header">
                        <span class="terminal-prompt">[h4j@justice ~]$</span>
                        <span class="terminal-command">transmit message</span>
                    </div>
                    <div class="terminal-response-body">
                        ${data.message}
                    </div>
                `;

        // Clear form if successful
        if (data.success) {
          contactForm.reset();
        }
      } catch (error) {
        terminalResponse.className = "terminal-message error";
        terminalResponse.innerHTML = `
                    <div class="terminal-response-header">
                        <span class="terminal-prompt">[h4j@justice ~]$</span>
                        <span class="terminal-command">transmit message</span>
                    </div>
                    <div class="terminal-response-body">
                        Error: Failed to transmit message. Please try again.
                    </div>
                `;
      }
    });
  }
}

// Function to handle smooth scrolling with centering
function setupSmoothScrolling() {
  // Get all navigation links with hash targets
  const navigationLinks = document.querySelectorAll('a[href^="#"]');

  // Add click event listener to each link
  navigationLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Skip if it's just a # link to top
      if (this.getAttribute("href") === "#") return;

      e.preventDefault(); // Prevent default anchor behavior

      // Get the target section id from the href
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      // If target section exists
      if (targetSection) {
        // Calculate position to scroll to (centered in viewport)
        const targetPosition =
          targetSection.getBoundingClientRect().top + window.pageYOffset;
        const windowHeight = window.innerHeight;
        const sectionHeight = targetSection.offsetHeight;
        const scrollToPosition =
          targetPosition - windowHeight / 2 + sectionHeight / 2;

        // For very tall sections, just align to top with some padding
        const finalPosition =
          sectionHeight > windowHeight
            ? targetPosition - 80 // Add some padding from top
            : scrollToPosition;

        // Scroll smoothly to the calculated position
        window.scrollTo({
          top: finalPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Function to handle mobile menu
function setupMobileMenu() {
  const menuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (menuToggle && mobileMenu) {
    // Toggle menu when hamburger is clicked
    menuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");
      document.body.style.overflow = mobileMenu.classList.contains("active")
        ? "hidden"
        : "";
    });

    // Close menu when a link is clicked
    mobileLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }
}

function setupFaqButton() {
  const toggleButton = document.getElementById("toggle-faq-btn");
  const faqItems = document.querySelectorAll(".faq-item");
  let allOpen = false;

  // Hide all except for the first item
  faqItems.forEach((item, index) => {
    if (index >= 3) {
      item.classList.add("hidden");
    }
  });
  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      allOpen = !allOpen;

      faqItems.forEach((item, index) => {
        if (index >= 3) {
          item.classList.toggle("hidden", !allOpen);
        }
      });

      toggleButton.textContent = allOpen ? "Hide" : "More";
      toggleButton.classList.toggle("active", allOpen);
    });
  }
}
