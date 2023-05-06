const html = document.querySelector("html");
const box = document.querySelector(".percent");

window.addEventListener("scroll", (e) => {
  // if (window.scrollY >= 200) {
  //   document.querySelector("nav").style.fontSize = "80%";
  // } else {
  //   document.querySelector("nav").style.fontSize = "100%";
  // }

  const percent = html.scrollTop / (html.scrollHeight - html.clientHeight);
  box.style.width = `${percent * 100}%`;
});

const ddd = document.querySelector(".box");

// ddd.addEventListener("scroll", () => {
//   if (
//     parseFloat(ddd.scrollTop) ===
//     parseFloat(ddd.scrollHeight) - parseFloat(ddd.clientHeight)
//   ) {
//     alert("alert");
//   }
// });

const btn = document.querySelector(".button1");
const modal = document.querySelector(".modal");
const 까만배경 = document.querySelector(".bg-1");
btn.addEventListener("click", () => {
  modal.classList.add("show");
});

까만배경.addEventListener("click", (e) => {
  if (e.target === 까만배경) {
    modal.classList.remove("show");
  }
});

const select = document.querySelector("select");
const ccc = document.querySelector(".ddd");

select.addEventListener("change", (e) => {
  if (parseInt(e.target.value) === 3) {
    ccc.disabled = false;
  } else {
    ccc.disabled = true;
  }
  console.log(parseInt(e.target.value));
});
// button1.addEventListener('click', button1Handler);

// function button1Handler() {

// }
const container = document.querySelector(".container .second");
const one = document.querySelector("#one");
const two = document.querySelector("#two");
let count = 0;

one.addEventListener("click", oneHandler);

ccc.addEventListener("change", (e) => {
  console.log(e.target.value);
});
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
