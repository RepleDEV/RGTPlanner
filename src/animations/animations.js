const anime = require('animejs');

splash_screen.play_show_animation = function() {
    return new Promise(async (resolve, reject) => {
        if ($("#svg_title").length == 0)return reject("#svg_title DOESN'T EXIST");

        await anime({
            targets: '.main #svg_title .svg_title_group path',
            strokeDashoffset: [anime.setDashoffset, 0],
            fill: "#FFF",
            easing: 'cubicBezier(0.665, 0.340, 0.570, 0.950)',
            duration: 1500,
            delay: (el, i) => i * 250 + 200
        }).finished;
        resolve("Success");
    });
};

splash_screen.play_hide_animation = function() {
    return new Promise(async (resolve, reject) => {
        if ($("#svg_title").length == 0)return reject("#svg_title DOESN'T EXIST");

        await anime({
            targets: '.main #svg_title .svg_title_group path',
            opacity:0,
            easing: 'easeOutSine',
            duration: 1000,
            delay: (el, i) => i * 150
        }).finished;
        resolve("Success");
    });
};

dots_loading.play_loading_animation = function() {
    return new Promise(async (resolve, reject) => {
        if ($(".loading_container").length == 0)return reject(".loading_container DOESN'T EXIST");

        await anime({
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
        }).finished;
        resolve("Success");
    });
}