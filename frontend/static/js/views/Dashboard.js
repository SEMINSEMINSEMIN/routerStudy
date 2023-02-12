import AbstractView from "./AbstractView.js";

export default class Dashboard extends AbstractView {
    constructor(params) {
        // 서브 클래스에서 constructor를 생략하지 않는 경우 반드시 super를 호출해야 한다.
        super(params);
        this.setTitle("Dashboard");
    }

    getHTML() {
        return `
            <h1>Welcome back, Dom</h1>
            <p>
                blah blah blah
            </p>
            <p>
                <a href="/posts" data-link>View recent posts</a>
            </p>
        `;
    }
}