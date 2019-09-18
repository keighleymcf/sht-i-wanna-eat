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


const currentPos = navigator.geolocation.getCurrentPosition(pos => {
  console.log(pos.coords)
})