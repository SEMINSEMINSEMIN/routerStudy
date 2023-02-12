const modules = {};

const load = async (file) => {
    modules[file] = await import(`./views/${file}.js`);
};

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

// 모듈을 로딩하기 전까지 안 보여주기
const router = async () => {
    const $app = document.querySelector("#app");
    const $loading = document.getElementById("loading");

    const routes = [
        { path: "/", view: "Dashboard" },
        { path: "/posts", view: "Posts" },
        { path: "/posts/:id", view: "PostView" },
        { path: "/settings", view: "Settings" },
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

    const view = match.route.view;

    if (!modules[view]) {
        $loading.style.cssText = "display: block";
        await load(view);
    }

    const viewRender = new modules[view].default;
    $app.innerHTML = viewRender.getHTML();
    if ($loading.style.display === "block") $loading.style.cssText = "display: none";
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
