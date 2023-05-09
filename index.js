const div = document.querySelector("div");

console.log(div);

// div.innerHTML = "<input>";

const ddd = document.createElement("div");
ddd.textContent = "dddddd";

const eee = document.createElement("div");
eee.textContent = "dddddd";

div.insertAdjacentHTML("beforeend", "<d>two</d");

// div.append(ddd, eee);
