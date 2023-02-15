import AbstractView from "./AbstractView.js";
import PostList from "../components/PostList.js";

export default class Posts extends AbstractView {
    constructor(params) {
        // 서브 클래스에서 constructor를 생략하지 않는 경우 반드시 super를 호출해야 한다.
        super(params);
        this.setTitle("Posts");
        try {
            customElements.define("post-list", PostList);
        } catch(e) {}
    }

    getHTML() {
        return `
        <main-content>
            <h1 slot="heading">Posts</h1>
            <p slot="contents">You are viewing the posts!</p>
            <post-list slot="contents">
                <li slot="link"><a href="/posts/1" data-link>Go to Post 1</a></li>
                <li slot="link"><a href="/posts/2" data-link>Go to Post 2</a></li>
                <li slot="link"><a href="/posts/3" data-link>Go to Post 3</a></li>
                <li slot="link"><a href="/posts/4" data-link>Go to Post 4</a></li>
                <li slot="link"><a href="/posts/5" data-link>Go to Post 5</a></li>
            </post-list>
        </main-content>
        `;
    }
}