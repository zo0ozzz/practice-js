class ddd extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<p>ddddddddddd</p>`;
  }
}

customElements.define("custom-c", ddd);
