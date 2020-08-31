"use strict";

var hasLoaded = false;

var profiles;

// Main, autoexec process
(async function main() {
    await splash_screen.load();
    await splash_screen.play_show_animation();

    await dots_loading.load("add");

    $(".loading_container").css("opacity", 0);

    playLoadingAnimation();

    await loadProfiles().then(res => {
        profiles = res;
    }).catch(console.error);

    await loadMenus().then(res => {
        hasLoaded = true;
    }).catch(console.error);

    dots_loading.play_hide_animation();
    await splash_screen.play_hide_animation();

    dots_loading.hide();
    splash_screen.hide();

    // Load main menu
    Menu.load("menu_main").catch(console.error);

    // Set event listeners
    $(".planner_navigate_container").click(function (e) { 
        e.preventDefault();
        Menu.load("menu_create");
    });
})()

function loadProfiles() {
    return new Promise(async (resolve, reject) => {
        // First, check is the src/res folder exists
        if (!require("fs").existsSync(path.join(__dirname, "../res/"))) {
            // If not, create it
            await fs.mkdir("res/").catch(err => {
                // Catch errors
                return reject(err);
            });
        }

        // Read it lol
        var resContents = "";
        await fs.readdir(path.join(__dirname, "../res")).then(res => resContents = res).catch(reject);

        // If resContents has the length of 0 or lower, return [] else return resContents;
        return resolve(resContents.length <= 0 ? resolve([]) : resolve(resContents));
    });
}

function loadMenus() {
    return new Promise(async (resolve, reject) => {
        // Load main menu
        Menu.new("menu_main");

        await planner_create_element.load("return").then(res => {
            Menu.addTo("menu_main", res);
        }).catch(reject);
        if (profiles.length <= 0) {
            Menu.addTo("menu_main","<p><i>You have no planners! Create a planner or import one!</i></p>")
        } else {
            // Pass
        }

        Menu.new("menu_create");
        await planner_create_page.load("return").then(res => {
            Menu.addTo("menu_create", res);
        });

        resolve("Success");
    });
}

async function playLoadingAnimation() {
    await anime({
        targets: ".loading_container",
        opacity: 1,
        easing: "easeInOutSine",
        duration: 800,
    }).finished;
    while (!hasLoaded) {
        await dots_loading.play_loading_animation();
    }
    return;
}