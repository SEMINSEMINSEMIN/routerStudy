import AbstractView from "./AbstractView.js";

export default class Settings extends AbstractView {
    constructor(params) {
        // 서브 클래스에서 constructor를 생략하지 않는 경우 반드시 super를 호출해야 한다.
        super(params);
        this.setTitle("Settings");
    }

    getHTML() {
        return `
        <main-content>
            <h1 slot="heading">Settings</h1>
            <p slot="contents">You are viewing the settings!</p>
        </main-content>
        `;
    }
}