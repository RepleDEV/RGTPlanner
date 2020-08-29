const anime = require('animejs');

// Menu animations

splash_screen.current_animation;

splash_screen.play_show_animation = function() {
    return new Promise(async (resolve, reject) => {
        if ($("#svg_title").length == 0)return reject("#svg_title DOESN'T EXIST");

        this.current_animation = anime({
            targets: '.main #svg_title .svg_title_group path',
            strokeDashoffset: [anime.setDashoffset, 0],
            fill: "#FFF",
            easing: 'cubicBezier(0.665, 0.340, 0.570, 0.950)',
            duration: 1500,
            delay: (el, i) => i * 250 + 200
        });

        await this.current_animation.finished;

        this.current_animation = undefined;
        resolve("Success");
    });
};

splash_screen.play_hide_animation = function() {
    return new Promise(async (resolve, reject) => {
        if ($("#svg_title").length == 0)return reject("#svg_title DOESN'T EXIST");

        this.current_animation = anime({
            targets: '.main #svg_title .svg_title_group path',
            opacity:0,
            easing: 'easeOutSine',
            duration: 1000,
            delay: (el, i) => i * 150
        });

        await this.current_animation.finished;

        this.current_animation = undefined;
        resolve("Success");
    });
};

splash_screen.skip_animation = function() {
    if (this.current_animation === undefined)return "No animations are currently playing!";
    var anim = this.current_animation;
    anim.seek(anim.duration);

    this.current_animation = undefined;
    return "Skipped animation";
}

dots_loading.current_animation;

dots_loading.play_loading_animation = function() {
    return new Promise(async (resolve, reject) => {
        if ($(".loading_container").length == 0)return reject(".loading_container DOESN'T EXIST");

        this.current_animation = anime({
            targets: '.loading_container .dot',
            translateY: [
                {
                    value: "-0.4rem", easing: "easeInSine", duration: 200
                },
                {
                    value: 0, easing: "easeInSine", duration: 200
                }
            ],
            opacity: [
                {
                    value: 0.8, easing: "easeInSine", duration: 200
                },
                {
                    value: 1, easing: "easeInSine", duration: 200
                }
            ],
            easing: 'easeOutSine',
            duration: 400,
            delay: (el, i) => i * 50,
            endDelay: 1000
        });

        await this.current_animation.finished;

        resolve("Success");
    });
}
dots_loading.play_hide_animation = function() {
    return new Promise(async (resolve, reject) => {
        if ($(".loading_container").length == 0)return reject(".loading_container DOESN'T EXIST");
        
        this.current_animation = anime({
            targets: '.loading_container .dot',
            opacity: 0,
            easing: 'easeOutSine',
            duration: 400,
            delay: (el, i) => i * 50,
        });

        this.current_animation.finished;

        resolve("Success");
    });
}

// Hover animations
