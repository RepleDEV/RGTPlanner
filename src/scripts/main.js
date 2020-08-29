var hasLoaded = false;

var profiles;

// Main, autoexec process
(async function main() {
    await splash_screen.load();
    await splash_screen.play_show_animation();

    await dots_loading.load("add");

    $(".loading_container").css("opacity", 0);

    await anime({
        targets: ".loading_container",
        opacity: 1,
        easing: "easeInOutSine",
        duration: 800,
    }).finished;

    await loadProfiles().then(res => {
        profiles = res;
    }).catch(console.error);

    loadMenus().then(res => {
        hasLoaded = true;
    }).catch(console.error);

    while (!hasLoaded) {
        await dots_loading.play_loading_animation();
    }

    dots_loading.play_hide_animation();
    await splash_screen.play_hide_animation();

    dots_loading.hide();
    splash_screen.hide();

    Menu.load("menu_main");

    // $(".planner_navigate_container").click(function (e) { 
    //     e.preventDefault();
    //     Menu.load()
    // });
})()

function loadProfiles() {
    return new Promise(async (resolve, reject) => {
        // First, check is the src/res folder exists
        if (!require("fs").existsSync(path.join(__dirname, "../res/"))) {
            // If not, create it
            await fs.mkdir("res/", {}, err => {
                if (err)reject(err);
            });
        }

        var resContents = "";
        await fs.readdir(path.join(__dirname, "../res")).then(res => resContents = res).catch(reject);

        // If resContents has the length of 0 or lower, return [] else return resContents;
        return resolve(resContents.length <= 0 ? resolve([]) : resolve(resContents));
    });
}

function loadMenus() {
    return new Promise(async (resolve, reject) => {
        // Load main menu
        Page.add("<div class=\"menu menu_main\"></div>");
        await planner_create_element.getHTML().then(res => {
            $(".menu_main").html($(".menu_main").html() + res);
        }).catch(reject);
        if (profiles.length <= 0) {
            $(".menu_main").html($(".menu_main").html() + "<p><i>You have no planners! Create a planner or import one!</i></p>");
        } else {
            // Pass
        }

        resolve("Success");
    });
}