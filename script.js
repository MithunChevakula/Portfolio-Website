let nav = document.querySelector("nav");
let scrollBtn = document.querySelector(".scroll-button a");

// Show/hide sticky navigation and scroll button based on scroll position
window.onscroll = function () {
  var scrollButton = document.querySelector(".scroll-button");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollButton.style.display = "block";
  } else {
    scrollButton.style.display = "none";
  }
};

// Side Navigation Menu
let body = document.querySelector("body");
let navBar = document.querySelector(".navbar");
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");

// Open side navigation
menuBtn.onclick = function () {
  navBar.classList.add("active");
  menuBtn.style.opacity = "0";
  menuBtn.style.pointerEvents = "none";
  body.style.overflow = "hidden";
  scrollBtn.style.pointerEvents = "none";
};

// Function to close side navigation
const hideNavMenu = () => {
  navBar.classList.remove("active");
  menuBtn.style.opacity = "1";
  menuBtn.style.pointerEvents = "auto";
  body.style.overflow = "auto";
  scrollBtn.style.pointerEvents = "auto";
};

// Close side navigation
cancelBtn.onclick = hideNavMenu;

// Smooth scrolling for navbar links
document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    let targetId = this.getAttribute("href").substring(1);
    let targetSection = document.getElementById(targetId);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 50, // Adjusts offset if you have a fixed navbar
        behavior: "smooth",
      });

      hideNavMenu(); // Close menu after clicking a link (for mobile)
    }
  });
});

// Animate skills progress bars when the section is in view
document.addEventListener("DOMContentLoaded", function () {
  const skillValues = document.querySelectorAll(".skill-value");
  const progressBars = document.querySelectorAll(".progress-fill");
  const skillsSection = document.querySelector(".skills");

  function animateSkills() {
    let sectionPos = skillsSection.getBoundingClientRect().top;
    let screenPos = window.innerHeight / 1.3; // Trigger animation when section is 70% visible

    if (sectionPos < screenPos) {
      skillValues.forEach((skill, index) => {
        let target = parseInt(skill.innerText);
        let count = 0;
        let speed = 20;

        let updateCounter = setInterval(() => {
          if (count < target) {
            count++;
            skill.innerText = count + "%";
            progressBars[index].style.width = count + "%";
          } else {
            clearInterval(updateCounter);
          }
        }, speed);
      });

      // Remove event listener after first trigger
      window.removeEventListener("scroll", animateSkills);
    }
  }

  window.addEventListener("scroll", animateSkills);
});
