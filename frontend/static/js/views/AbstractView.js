import MainContent from "../components/MainContent.js";

export default class {
    constructor(params) {
        this.params = params;
        try {
            // console.log("커스터마이징 엘리멘트 생성");
            customElements.define("main-content", MainContent);
        } catch(e) {}
    }

    setTitle(title) {
        document.title = title;
    }

    async getHTML() {
        return "";
    }
}