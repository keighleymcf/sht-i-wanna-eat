document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");

  },
  false
);

const navIcon = document.querySelector('#nav-icon');
navIcon.onclick = () => {
  navIcon.classList.toggle('open');
}

const showHide = () => {
  let miniWindow = document.querySelector('.miniMenu')
  if (miniWindow)
}
const popUp = document.querySelector(".popUp").onclick = () => {
  document.querySelector('.miniMenu').display = 'none';
}



// 