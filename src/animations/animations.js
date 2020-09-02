const anime = require('animejs');

// Menu animations

// Current playing animations variable
var current_animations = [];

// Undefined current animation variable
splash_screen.current_animation;

/**
 * Play show animation function
 */
splash_screen.play_show_animation = function() {
    // Return a promise
    return new Promise(async (resolve, reject) => {
        // If targeted element doesn't exist, reject the promise
        if ($("#svg_title").length == 0)return reject("#svg_title DOESN'T EXIST");

        // Update this element's current animation
        this.current_animation = anime({
            targets: '.main #svg_title .svg_title_group path',
            strokeDashoffset: [anime.setDashoffset, 0],
            fill: "#FFF",
            easing: 'cubicBezier(0.665, 0.340, 0.570, 0.950)',
            duration: 1500,
            delay: (el, i) => i * 250 + 200
        });

        // Push this element's current animation to the current_animations variable
        current_animations.push(this.current_animation);

        // Wait for the animation promise to return
        await this.current_animation.finished;

        // Get current animation's index
        var current_animation_index = current_animations.indexOf(this.current_animation);

        // Remove the this animation from current_animations variable
        current_animations.splice(current_animation_index, 1);

        // Set this element's current animation to undefined
        this.current_animation = undefined;

        // Return the promise
        return resolve("Success");
    });
};

splash_screen.play_hide_animation = function() {
    // Return a promise
    return new Promise(async (resolve, reject) => {
        // If targeted element doesn't exist, reject the promise
        if ($("#svg_title").length == 0)return reject("#svg_title DOESN'T EXIST");

        // Update this element's current animation
        this.current_animation = anime({
            targets: '.main #svg_title .svg_title_group path',
            opacity:0,
            easing: 'easeOutSine',
            duration: 1000,
            delay: (el, i) => i * 150
        });

        // Push this element's current animation to the current_animations variable
        current_animations.push(this.current_animation);

        // Wait for the animation promise to return
        await this.current_animation.finished;

        // Get current animation's index
        var current_animation_index = current_animations.indexOf(this.current_animation);

        // Remove the this animation from current_animations variable
        current_animations.splice(current_animation_index, 1);

        // Set this element's current animation to undefined
        this.current_animation = undefined;

        // Return the promise
        return resolve("Success");
    });
};

/**
 * Skip animation function
 */
splash_screen.skip_animation = function() {
    // Check if there is actually an animation playing
    if (this.current_animation === undefined)return "No animations are currently playing!";

    // Get the animation
    var anim = this.current_animation;

    // Seek to the animation duration
    anim.seek(anim.duration);

    // Clear this element's current animation
    this.current_animation = undefined;

    // Return
    return "Skipped animation";
}


// Undefined current animation variable
dots_loading.current_animation;

/**
 * Play show animation function
 */
dots_loading.play_loading_animation = function() {
    // Return a promise
    return new Promise(async (resolve, reject) => {
        // If targeted element doesn't exist, reject the promise
        if ($(".loading_container").length == 0)return reject(".loading_container DOESN'T EXIST");

        // Update this element's current animation
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
            delay: (el, i) => i * 50 + 600
        });

        // Push this element's current animation to the current_animations variable
        current_animations.push(this.current_animation);

        // Wait for the animation promise to return
        await this.current_animation.finished;

        // Get current animation's index
        var current_animation_index = current_animations.indexOf(this.current_animation);

        // Remove the this animation from current_animations variable
        current_animations.splice(current_animation_index, 1);

        // Set this element's current animation to undefined
        this.current_animation = undefined;

        // Return the promise
        return resolve("Success");
    });
}

dots_loading.play_hide_animation = function() {
    return new Promise(async (resolve, reject) => {
        // If targeted element doesn't exist, reject the promise
        if ($(".loading_container").length == 0)return reject(".loading_container DOESN'T EXIST");
        
        // Update this element's current animation
        this.current_animation = anime({
            targets: '.loading_container .dot',
            opacity: 0,
            easing: 'easeOutSine',
            duration: 400,
            delay: (el, i) => i * 50,
        });

        // Push this element's current animation to the current_animations variable
        current_animations.push(this.current_animation);

        // Wait for the animation promise to return
        await this.current_animation.finished;

        // Get current animation's index
        var current_animation_index = current_animations.indexOf(this.current_animation);

        // Remove the this animation from current_animations variable
        current_animations.splice(current_animation_index, 1);

        // Set this element's current animation to undefined
        this.current_animation = undefined;

        // Return the promise
        return resolve("Success");
    });
}

// Skip animation functions

// If the user double clicks the window
$(window).dblclick(e => {
    // Skip animation
    skip_all_playing_animations();
})

// Skip all animations
function skip_all_playing_animations() {
    // Check if there are any playing animations
    if (current_animations.length == 0) return "No animations are playing!";

    // Iterate through every animation
    current_animations.forEach(animation => {
        // Seek to the animation duration
        animation.seek(animation.duration);
    });

    // Return
    return "Skipped Animations";
}