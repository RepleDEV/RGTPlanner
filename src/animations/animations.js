// const anime = require('animejs');
const fs = require('fs').promises;
const path = require('path');

async function play_splash_screen() {
    console.log("playing splash screen");
    var file = await fs.readFile("src/index.html", {encoding: "utf-8"});
    console.log(file, "test...");
    return file;
}

(async () => {
    return await play_splash_screen();
})();