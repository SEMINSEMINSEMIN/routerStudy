export default class MainContent extends HTMLElement {
    connectedCallback() {
        this.role = "main";
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style>
                slot[name="heading"] { color: blue; }
            </style>
            <slot name="heading"></slot>
            <slot name="contents"></slot>
        `;
    }
}