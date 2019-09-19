document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
  },
  false
);

// navbar menu

const tabmenu = () => {
  "use strict";
  const navIcon = document.querySelector("#nav-icon");

  navIcon.addEventListener("click", () => {
    document.body.classList.toggle("background--blur");
    navIcon.classList.toggle("open");
    const menu = document.querySelector(".menu--off ");
    menu.classList.toggle("menu--on");
  });
};
tabmenu();

// const showHide = () => {
//   console.log("SH");
//   let miniWindow = document.querySelector(".miniMenu");
//   if (miniWindow.style.display === "none") {
//     miniWindow.style.display = "block";
//   } else {
//     miniWindow.style.display = "none";
//   }
// };
// const Show = (document.querySelector(".popUp").onclick = showHide);
// const hide = (document.querySelector(".hideUp").onclick = showHide);

// list accordion

const items = document.querySelectorAll(".accordion a");

function toggleAccordion() {
  console.log("clicked");
  this.classList.toggle("active");
  this.nextElementSibling.classList.toggle("active");
}

items.forEach(item => item.addEventListener("click", toggleAccordion));
