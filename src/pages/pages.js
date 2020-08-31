"use strict";

const fs = require("fs").promises; // File system node.js API
const path = require('path'); // Path module
window.$ = window.jQuery = require('jquery'); // JQuery module for convenience

/**
 * Page object
 */
const Page = {
    /**
     * Clears the page
     */
    clear: function() {
        $(".main").html("");
        return 1;
    },
    /**
     * Adds contents to the page
     * @param {string} content Content to be added
     */
    add: function(content) {
        if (!content.length)return 0;
        $(".main").html($(".main").html() + content);
        return 1;
    },
    /**
     * Replaces page contents
     * @param {string} content Content to be replaced
     */
    replace: function(content) {
        if (!content.length)return 0;
        $(".main").html(content);
        return 1;
    },
    /**
     * Gets page contents
     */
    get: function() {
        return $(".main").html();
    }
};

/**
 * Menu object
 */
const Menu = {
    /**
     * Loads menu by name and unloads previous menu
     * @param {string} menu Menu to load
     * @param {number} fade Fade duration
     */
    load: function(menu, fade = 250) {
        return new Promise(async (resolve, reject) => {
            if (typeof menu != "string")return reject("ARGUMENT PASSED NOT OF STRING TYPE");

            // Get current menu
            var currentMenu = this.current();

            // Check if menu parameter equals to the current menu
            if (currentMenu === menu)return reject(`CURRENT MENU IS ALREADY AT ${menu}`);

            // Add class prefix
            menu = "." + menu;

            // Check if currentMenu exists
            if (currentMenu.length) {

                // If it does, play unload animation and unload said previous menu
                currentMenu = "." + currentMenu;
                await anime({
                    targets: currentMenu,
                    opacity: 0,
                    easing: "linear",
                    duration: fade
                }).finished;
                $(currentMenu).css("display", "none");
            }

            // Set menu display to block
            $(menu).css("display", "block");

            // Fade it in
            await anime({
                targets: menu,
                opacity:1,
                easing: "linear",
                duration: fade
            }).finished;

            // Return the promise
            return resolve("Success");
        });
    },
    /**
     * Adds a div to be used as a menu
     * @param {string} menu_name Menu name to be added
     */
    new: function(menu_name) {
        // Check if menu_name parameter is a string
        if (typeof menu_name !== "string")return Error("menu_name PARAMETER NOT OF STRING TYPE");

        // Then, create said menu
        Page.add(`<div class="menu ${menu_name}"></div>`);

        // Return
        return 1;
    },
    /**
     * Add content to specified menu
     * @param {string} menu_name Menu name to add to
     * @param {string} content Content to add to menu
     */
    addTo: function(menu_name, content) {
        // Check if menu_name exists by checking it's type, and check if content parameter is a string or not
        if (typeof menu_name !== "string"|| typeof content !== "string")return 0;

        // Check menu existence
        if (!$(`.${menu_name}`).length)return Error("MENU DOESN'T EXIST");

        // Add class prefix
        menu_name = "." + menu_name;

        // Add content to the menu
        $(menu_name).html($(menu_name).html() + content);

        // Return
        return 1;
    },
    /**
     * Gets current active menu
     */
    current: function() {
        // Result variable
        var currentMenu = "";

        // Get elements that has a class name of menu
        var menus = $(".menu");

        // Iterate through every element that has a class of .menu
        for (let i = 0; i < menus.length; i++) {
            const element = menus[i];

            // If object has a display that isn't "none"
            if ($(element).css("display") != "none") { 
                // Update the variable
                currentMenu = $(element).attr("class").split(" ")[1];
                /* 
                    Get class attribute of the element,
                    split the spring by space,
                    and get the second element of the splitted string.
                */

                // Break the loop since we already found the menu that has a display that is'nt none
                break;
            }

            /* 
                Note that yes, this will only get the first occurance of an element
                that has a display of not "none", but there will only be 1 active menu at a time
                so this shouldn't cause so much of a problem.
            */
        }

        // Return said current menu
        return currentMenu;
    }
}

/**
 * Import index.html from the pages/ directory
 * @param {string} page Page name to import
 */
function importHTMLPage(page) {
    return new Promise(async (resolve, reject) => {
        if (typeof page !== "string")return reject("page PARAMETER NOT OF STRING TYPE");

        // First, check if the actual page index.html file exists
        var pageExists;

        // First, split the directory by slashes
        var paths = page.split("/");

        // Variable for explored directory tree
        var currentPath = "pages/"

        // Create new promise for asynchronous execution
        await new Promise(async (resolve, reject) => {
            // Iterate through paths
            for (let i = 0; i < paths.length; i++) {
                const filePath = paths[i];

                // Get directory contents of currentPath
                var dirContents = await fs.readdir(path.join(__dirname, currentPath)).catch(reject);

                // If path exists in the directory, continue following the path
                if (dirContents.indexOf(filePath) >= 0) {
                    currentPath += filePath + "/";
                } else {
                    // If not, update the pageExists variable and return the promise
                    pageExists = false;
                    break;
                }
            }
            return resolve("Done");
        });

        // If the page doesn't exist
        if (pageExists === false) {
            // Reject the promise
            return reject("PAGE DOESN'T EXIST")
        }

        // Get the file path
        var filePath = path.join(__dirname, `pages/${page}/index.html`);

        // Read the file
        await fs.readFile(filePath, "utf-8").then(res => {
            // Return file contents
            return resolve(res);
        }).catch(reject);
    });
}

/**
 * Splash screen object
 */
const splash_screen = {
    /**
     * Loads splash screen logo
     * @param {string} method (Optional) Page method such as replace, return, and add. (Defaults to replace)
     */
    load: function(method) {
        return new Promise(async (resolve, reject) => {
            // First, import the page itself
            await importHTMLPage("menus/splash_screen").then(res => {
                // After getting the page

                // If method is "return", return the res
                if (method === "return")return resolve(res);

                // If method is anything else but not a string, has no length, or is an undefined method, replace the page
                if (typeof method != "string" || !method.length || Page[method] === undefined)Page.replace(res);
                else Page[method](res); // Execute Page function by method

                // Return the promise;
                return resolve("Success");
            }).catch(reject);
        });
    },
    /**
     * Hide splash screen
     */
    hide: function() {
        // Set display to none
        $("#svg_title").css("display", "none");

        // Return
        return 1;
    }
};

/**
 * Dots loading object
 */
const dots_loading = {
    /**
     * Loads loading dots
     * @param {string} method (Optional) Page method such as replace, return, and add. (Defaults to replace)
     */
    load: function(method) {
        return new Promise(async (resolve, reject) => {
            await importHTMLPage("menus/dots_loading").then(res => {
                // After getting the page

                // If method is "return", return the res
                if (method === "return")return resolve(res);

                // If method is anything else but not a string, has no length, or is an undefined method, replace the page
                if (typeof method != "string" || !method.length || Page[method] === undefined)Page.replace(res);
                else Page[method](res); // Execute Page function by method

                // Return the promise;
                return resolve("Success");
            }).catch(reject);
        });
    },
    /**
     * Hide loading dots
     */
    hide: function() {
        // Set display to none
        $(".dot").parent().css("display", "none");

        // Return
        return 1;
    }
}

/**
 * Create planner element object
 */
const planner_create_element = {
    /**
     * Loads planner create element
     * @param {string} method (Optional) Page method such as replace, return, and add. (Defaults to replace)
     */
    load: function (method) {
        return new Promise(async (resolve, reject) => {
            await importHTMLPage("menus/planner/elements/planner_create_element").then(res => {
                // After getting the page

                // If method is "return", return the res
                if (method === "return")return resolve(res);

                // If method is anything else but not a string, has no length, or is an undefined method, replace the page
                if (typeof method != "string" || !method.length || Page[method] === undefined)Page.replace(res);
                else Page[method](res); // Execute Page function by method

                // Return the promise;
                return resolve("Success");
            }).catch(reject);
        });
    }
}

/**
 * Planner select element object
 */
const planner_select_element = {
    /**
     * Loads planner select element
     * @param {string} method (Optional) Page method such as replace, return, and add. (Defaults to replace)
     */
    load: function (method) {
        return new Promise(async (resolve, reject) => {
            await importHTMLPage("menus/planner/elements/planner_select_element").then(res => {
                // After getting the page

                // If method is "return", return the res
                if (method === "return")return resolve(res);

                // If method is anything else but not a string, has no length, or is an undefined method, replace the page
                if (typeof method != "string" || !method.length || Page[method] === undefined)Page.replace(res);
                else Page[method](res); // Execute Page function by method

                // Return the promise;
                return resolve("Success");
            }).catch(reject);
        });
    }
}