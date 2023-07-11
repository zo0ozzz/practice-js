const box = document.querySelector("#box");

const regex = /l(.*?)r/gs;

const html = `하하하<b>하하하</b>
l
<p><b>하하하</b></p>
r`;

const filtered = html.replace(regex, (match, p1) => {
  const escaped = p1.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return `${escaped}`;
});

box.innerHTML = filtered;
