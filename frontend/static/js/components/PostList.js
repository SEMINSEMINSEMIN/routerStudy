export default class PostList extends HTMLElement {
    connectedCallback() {
        this.role = "navigation";
        this["aria-label"] = "Post Links Navigation";
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style>
                ul {
                    background-color: yellow;
                    border-radius: 20px;
                    padding-top: 10px;
                    padding-bottom: 10px;
                }
            </style>
            <ul>
                <slot name="link"></slot>
            </ul>
        `;
    }
}