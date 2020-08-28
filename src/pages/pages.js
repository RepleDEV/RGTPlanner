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

function getPageHTML(page) {
    return new Promise(async (resolve, reject) => {
        // First, check if the page exists
        var pageList;
        await fs.readdir(path.join(__dirname, "pages/")).then(res => pageList = res).catch(reject);
        if (pageList.indexOf(page) < 0)return reject("PAGE DOESN'T EXIST");

        var filePath = path.join(__dirname, `pages/${page}/index.html`);
        await fs.readFile(filePath, "utf-8").then(res => {
            return resolve(res);
        }).catch(reject);
    });
}

const splash_screen = {
    load: async function(method) {
        return new Promise(async (resolve, reject) => {
            await getPageHTML("splash_screen").then(res => {
                if (typeof method == "undefined" || method.length == 1)Page.replace(res);
                else Page[method](res);
                resolve("Success");
            }).catch(reject);
        });
    }
};

const dots_loading = {
    load: function(method) {
        return new Promise(async (resolve, reject) => {
            await getPageHTML("dots_loading").then(res => {
                if (typeof method == "undefined" || method.length == 1)Page.replace(res);
                else Page[method](res);
                resolve("Success");
            }).catch(reject);
        });
    }
}

const planner_create = {
    load: function (method) {
        return new Promise(async (resolve, reject) => {
            await getPageHTML("planner_create").then(res => {
                if (typeof method == "undefined" || method.length == 1)Page.replace(res);
                else Page[method](res);
                resolve("Success");
            }).catch(reject);
        });
    }
}

const planner_select = {
    load: function (method) {
        return new Promise(async (resolve, reject) => {
            await getPageHTML("planner_select").then(res => {
                if (typeof method == "undefined" || method.length == 1)Page.replace(res);
                else Page[method](res);
                resolve("Success");
            }).catch(reject);
        });
    }
}