import AbstractView from "./AbstractView.js";

export default class Dashboard extends AbstractView {
    constructor(params) {
        // 서브 클래스에서 constructor를 생략하지 않는 경우 반드시 super를 호출해야 한다.
        super(params);
        this.setTitle("Dashboard");
    }

    getHTML() {
        return `
        <main-content>
            <h1 slot="heading">Dashboard</h1>
            <p slot="contents">This is Dashboard</p>
            <a href="/posts" slot="contents" data-link>View recent posts</a>
        </main-content>
        `;
    }
}