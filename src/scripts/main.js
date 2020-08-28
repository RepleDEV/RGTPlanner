var hasLoadedProfiles = false;

var profiles;

// Main, autoexec process
(async function main() {
    await splash_screen.load();
    await splash_screen.play_show_animation();

    await dots_loading.load("add");

    $(".loading_container").css("opacity", 0);

    anime({
        targets: ".loading_container",
        opacity: 1,
        easing: "easeInOutSine",
        duration: 800,
    });

    loadProfiles().then(res => {
        profiles = res;
        hasLoadedProfiles = true;
    }).catch(console.error);

    while (!hasLoadedProfiles) {
        await dots_loading.play_loading_animation();
    }

    dots_loading.play_hide_animation();
    await splash_screen.play_hide_animation();

    await planner_create.load();
})()

function loadProfiles() {
    return new Promise(async (resolve, reject) => {
        var resContents;
        await fs.readdir(path.join(__dirname, "res")).then(res => resContents = res).catch(reject);

        if (resContents.length <= 0)return resolve(undefined);
    });
}