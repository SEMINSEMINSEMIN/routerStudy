const express = require("express");
const path = require("path");

const app = express();

// Mounts the specified middleware function or functions at the specified path: the middleware function is executed when the base of the requested path matches path.
// path.resolve 결과: /Users/seminkang/Documents/vanilaSPA/frontend/static
// /static/js/index.js 이런식으로!
app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

// no matter what path i send to we server, they're all going to go back to this index.html
// path.resolve 결과: /Users/seminkang/Documents/vanilaSPA/frontend/index.html
app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

// process.env.PORT:
/*
In many environments (e.g. Heroku), and as a convention, you can set the environment variable PORT to tell your web server what port to listen on.
So process.env.PORT || 3000 means: whatever is in the environment variable PORT, or 3000 if there's nothing there.
*/
app.listen(process.env.PORT || 3000, () => console.log("Server running...."));