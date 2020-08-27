var hasLoadedProfiles = false;

(async () => {
    await splash_screen.load();
    await splash_screen.play_show_animation();

    await dots_loading.load();

    $(".loading_container").css("opacity", 0);

    anime({
        targets: ".loading_container",
        opacity: 1,
        easing: "easeInOutSine",
        duration: 800,
    });

    while (!hasLoadedProfiles) {
        await dots_loading.play_loading_animation();
    }
})()

function loadProfiles() {
    fs.readDir(path.join(__dirname, "res")).then()
}