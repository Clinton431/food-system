// DOM Elements
const navbar = document.querySelector(".navbar");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const contactForm = document.getElementById("contactForm");

// Mobile Navigation Toggle
navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Form submission handler
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const businessType = document.getElementById("businessType").value;
  const message = document.getElementById("message").value;

  // Basic validation
  if (!name || !email || !businessType) {
    showNotification("Please fill in all required fields.", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showNotification("Please enter a valid email address.", "error");
    return;
  }

  // Show loading state
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  try {
    // Simulate API call (replace with actual endpoint)
    await simulateFormSubmission({
      name,
      email,
      phone,
      businessType,
      message,
    });

    showNotification(
      "Thank you! We'll contact you within 24 hours to schedule your demo.",
      "success"
    );
    contactForm.reset();
  } catch (error) {
    showNotification(
      "There was an error sending your message. Please try again.",
      "error"
    );
    console.error("Form submission error:", error);
  } finally {
    // Reset button state
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Simulate form submission (replace with actual API call)
function simulateFormSubmission(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate success (90% of the time)
      if (Math.random() > 0.1) {
        resolve(data);
      } else {
        reject(new Error("Submission failed"));
      }
    }, 1500);
  });
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${
              type === "success"
                ? "check-circle"
                : type === "error"
                ? "exclamation-circle"
                : "info-circle"
            }"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "#4CAF50"
            : type === "error"
            ? "#f44336"
            : "#2196F3"
        };
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;

  // Add notification to page
  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = "slideOut 0.3s ease forwards";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);

  // Close button functionality
  notification
    .querySelector(".notification-close")
    .addEventListener("click", () => {
      notification.style.animation = "slideOut 0.3s ease forwards";
      setTimeout(() => notification.remove(), 300);
    });
}

// Add CSS animations for notifications
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
document.head.appendChild(style);

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.6s ease forwards";
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".feature-card, .blog-card, .benefit-item, .contact-item"
  );
  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    observer.observe(el);
  });
});

// Add fade in animation CSS
const fadeInStyle = document.createElement("style");
fadeInStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(fadeInStyle);

// CTA button hover effects
document.querySelectorAll(".btn-primary").forEach((btn) => {
  btn.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-2px) scale(1.05)";
  });

  btn.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Statistics counter animation
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    // Format number based on target
    let displayValue;
    if (target >= 1000) {
      displayValue = Math.floor(current / 100) * 100 + "+";
    } else if (target >= 100) {
      displayValue = Math.floor(current) + "+";
    } else {
      displayValue = Math.floor(current) + "%";
    }

    element.textContent = displayValue;
  }, 16);
}

// Animate counters when hero section is visible
const heroStats = document.querySelectorAll(".stat h3");
const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const stats = entry.target.querySelectorAll(".stat h3");
        stats.forEach((stat, index) => {
          const targets = [500, 25, 40]; // Corresponding to the stats in HTML
          animateCounter(stat, targets[index]);
        });
        heroObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.addEventListener("DOMContentLoaded", () => {
  const heroSection = document.querySelector(".hero-stats");
  if (heroSection) {
    heroObserver.observe(heroSection);
  }
});

// Add loading spinner utility
function showLoadingSpinner(element) {
  const spinner = document.createElement("div");
  spinner.className = "spinner";
  spinner.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  spinner.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #ff6b6b;
        font-size: 20px;
    `;

  element.style.position = "relative";
  element.appendChild(spinner);

  return spinner;
}

function hideLoadingSpinner(spinner) {
  if (spinner && spinner.parentElement) {
    spinner.remove();
  }
}

// Handle demo button clicks
document.querySelectorAll(".btn-secondary").forEach((btn) => {
  if (btn.textContent.includes("Demo")) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      showNotification(
        "Demo booking feature coming soon! Please use the contact form to schedule a demo.",
        "info"
      );
    });
  }
});

// Add parallax effect to hero background shapes
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const shapes = document.querySelectorAll(".shape");

  shapes.forEach((shape, index) => {
    const speed = 0.5 + index * 0.2;
    shape.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Console welcome message
console.log(`
🍕 Welcome to TastyTray Connect! 🍕

We're excited to help you grow your restaurant business.
For technical support, contact: support@tastytrayconnect.com

Made with ❤️ for restaurant owners everywhere.
`);

// Add some interactive features for better UX
document.addEventListener("DOMContentLoaded", () => {
  // Add hover effects to all cards
  const cards = document.querySelectorAll(
    ".feature-card, .blog-card, .benefit-item"
  );
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add click-to-copy functionality for contact info
  const contactItems = document.querySelectorAll(".contact-item");
  contactItems.forEach((item) => {
    const phoneOrEmail = item.querySelector("p").textContent;
    if (phoneOrEmail.includes("@") || phoneOrEmail.includes("+")) {
      item.style.cursor = "pointer";
      item.addEventListener("click", () => {
        navigator.clipboard.writeText(phoneOrEmail).then(() => {
          showNotification("Copied to clipboard!", "success");
        });
      });
    }
  });
});
