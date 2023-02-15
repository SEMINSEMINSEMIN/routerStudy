import AbstractView from "./AbstractView.js";

export default class PostView extends AbstractView {
    constructor(params) {
        // 서브 클래스에서 constructor를 생략하지 않는 경우 반드시 super를 호출해야 한다.
        super(params);
        this.postId = params.id;
        this.setTitle("Viewing Post");
    }

    getHTML() {
        return `
        <main-content>
            <h1 slot="heading">Post ${this.postId}</h1>
            <p slot="contents">You are viewing post ${this.postId}</p>
        </main-content>
        `;
    }
}