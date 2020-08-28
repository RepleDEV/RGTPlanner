"use strict";

const fs = require("fs").promises;
const path = require('path');
window.$ = window.jQuery = require('jquery');

const Page = {
    clear: function() {
        $(".main").html("");
        return 1;
    },
    add: function(content) {
        $(".main").html($(".main").html() + content);
        return 1;
    },
    replace: function(content) {
        $(".main").html(content);
        return 1;
    },
    get: function() {
        return $(".main").html();
    }
};

const Menu = {
    load: function(menu) {
        return new Promise(async (resolve, reject) => {
            if (typeof menu != "string")return reject("ARGUMENT PASSED NOT OF STRING TYPE");
            $(`.${menu}`).css("display", "block");
            await anime({
                targets: `.${menu}`,
                opacity:1,
                easing: "easeInOutSine",
                duration: 200
            }).finished;
            resolve("Success");
        });
    }
}

function getPageHTML(page) {
    return new Promise(async (resolve, reject) => {
        // First, check if the page exists
        var pageList;

        var dir = page.split("/");
        dir.pop();
        dir = `pages/${dir.join("/")}/`

        page = page.split("/").pop();

        await fs.readdir(path.join(__dirname, dir)).then(res => pageList = res).catch(reject);
        if (pageList.indexOf(page) < 0)return reject("PAGE DOESN'T EXIST");

        // Then, read the file, and return the contents of the file
        var filePath = path.join(__dirname, `${dir}${page}/index.html`); // SORRY FOR THE 1 LINER!!!
        await fs.readFile(filePath, "utf-8").then(res => {
            return resolve(res);
        }).catch(reject);
    });
}

const splash_screen = {
    load: async function(method) {
        return new Promise(async (resolve, reject) => {
            await getPageHTML("menus/splash_screen").then(res => {
                if (method === "return")return resolve(res);
                if (typeof method == "undefined" || method.length == 1)Page.replace(res);
                else Page[method](res);
                return resolve("Success");
            }).catch(reject);
        });
    },
    hide: function() {
        $("#svg_title").css("display", "none");
    }
};

const dots_loading = {
    load: function(method) {
        return new Promise(async (resolve, reject) => {
            await getPageHTML("menus/dots_loading").then(res => {
                if (method === "return")return resolve(res);
                if (typeof method == "undefined" || method.length == 1)Page.replace(res);
                else Page[method](res);
                return resolve("Success");
            }).catch(reject);
        });
    },
    hide: function() {
        $(".dot").parent().css("display", "none");
    }
}

const planner_create_element = {
    load: function (method) {
        return new Promise(async (resolve, reject) => {
            await getPageHTML("menus/planner/elements/planner_create_element").then(res => {
                if (method === "return") {
                    return resolve(res);
                } else if (typeof method == "undefined" || method.length < 1) {
                    Page.replace(res);
                } else if (typeof options == "object") {
                    if (typeof options.parent == "string" && options.parent[0] == ("." || "#")) {
                        $(options.parent).html(res);
                    } else {
                        return reject("INVALID OPTIONS ARGUMENT")
                    }
                } else {
                    if (Page[method] !== undefined) {
                        Page[method](res);
                    } else {
                        return reject("INVALID METHOD ARGUMENT")
                    }
                }
                return resolve("Success");
            }).catch(reject);
        });
    },
    getHTML: function() {
        return new Promise(async (resolve, reject) => {
            return resolve(await getPageHTML("menus/planner/elements/planner_create_element"))
        });
    }
}

const planner_select_element = {
    load: function (method, options) {
        return new Promise(async (resolve, reject) => {
            await getPageHTML("menus/planner/elements/planner_select_element").then(res => {
                if (method === "return") {
                    return resolve(res);
                } else if (typeof method == "undefined" || method.length == 1) {
                    Page.replace(res);
                } else if (typeof options == "object") {
                    if (typeof options.parent == "string" && options.parent[0] == ("." || "#")) {
                        $(options.parent).html(res);
                    } else {
                        return reject("INVALID OPTIONS ARGUMENT")
                    }
                } else {
                    if (Page[method] !== undefined) {
                        Page[method](res);
                    } else {
                        return reject("INVALID METHOD ARGUMENT")
                    }
                }
                return resolve("Success");
            }).catch(reject);
        });
    },
    getHTML: function() {
        return new Promise(async (resolve, reject) => {
            return resolve(await getPageHTML("menus/planner/elements/planner_select_element"));
        });
    }
}