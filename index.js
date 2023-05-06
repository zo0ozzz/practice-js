// const button1 = document.querySelector('#button1');

// button1.addEventListener('click', button1Handler);

// function button1Handler() {

// }
const container = document.querySelector(".container .second");
const one = document.querySelector("#one");
const two = document.querySelector("#two");
let count = 0;

one.addEventListener("click", oneHandler);

function oneHandler() {
  count--;
  console.log(count);

  if (count === -3) {
    container.classList.remove("transition");
    container.style.transform = `translate(0px, 0px)`;
    count = 0;
  } else {
    container.classList.add("transition");
    container.style.transform = `translate(${100 * count}px, 0px)`;
  }
}

two.addEventListener("click", twoHandler);

function twoHandler() {
  count++;
  console.log(count);

  if (count === 1) {
    container.classList.remove("transition");
    container.style.transform = `translate(-200px, 0px)`;
    count = -2;
  } else {
    container.classList.add("transition");
    container.style.transform = `translate(${100 * count}px, 0px)`;
  }
}
