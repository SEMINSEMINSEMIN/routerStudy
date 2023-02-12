import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import PostView from "./views/PostView.js";
import Settings from "./views/Settings.js";

const pathToRegex = (path) =>
    new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
        (result) => result[1]
    );

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
    return Object.fromEntries(
        keys.map((key, i) => {
            return [key, values[i]];
        })
    );
};

const navigateTo = (url) => {
    history.pushState(null, "", url);
    router();
};

const router = () => {
    new Promise((resolve, _) => {
        document.getElementById("loading").style.cssText = "display: block";
        console.log(document.getElementById("loading").style.display);

        const routes = [
            { path: "/", view: Dashboard },
            { path: "/posts", view: Posts },
            { path: "/posts/:id", view: PostView },
            { path: "/settings", view: Settings },
        ];

        const potentialMatches = routes.map((route) => {
            return {
                route: route,
                result: location.pathname.match(pathToRegex(route.path)),
            };
        });

        let match = potentialMatches.find(
            (potentialMatches) => potentialMatches.result !== null
        );

        if (!match) {
            match = {
                route: routes[0],
                result: [location.pathname],
            };

            // console.log(getParams(match));
            // 빈 객체
        }

        const view = new match.route.view(getParams(match));
        setTimeout(() => {
            document.querySelector("#app").innerHTML = view.getHTML();
            resolve();
        }, 3000);
    }).then(() => {
        document.getElementById("loading").style.cssText = "display: none";
        console.log(document.getElementById("loading").style.display);
    });
};

// 뒤로 가기, 앞으로 가기 등에서도 router가 작동하도록 하기 위해
window.addEventListener("popstate", router);

// DOMContentLoaded: DOM 트리 생성이 완료되었을 때
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
    router();
});
