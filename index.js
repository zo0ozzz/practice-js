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

ccc.addEventListener("change", (e) => {
  console.log(e.target.value);
});
