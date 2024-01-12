// ==UserScript==
// @name         YouTube Pause Fix
// @version      0.9-RC
// @description  Fix youtube pause on SpaceBar after alt-tab
// @author       https://github.com/Wolf49406
// @match        http*://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @homepageURL  https://github.com/Wolf49406/YouTubePauseFix
// @updateURL    https://github.com/Wolf49406/YouTubePauseFix/raw/main/YouTubePauseFix.user.js
// @downloadURL  https://github.com/Wolf49406/YouTubePauseFix/raw/main/YouTubePauseFix.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function PlayPause() {
        const video = document.getElementsByClassName("html5-main-video")[0];
        const movie_player = document.getElementById("movie_player");
        if (video == undefined || movie_player == undefined) {
            return;
        }

        const movie_player_class_name = movie_player.className;
        if (movie_player_class_name == undefined) {
            return;
        }

        if (!movie_player_class_name.includes("ytp-probably-keyboard-focus")) { // No focus after Alt-Tab. So youtube DO know about this bug, huh?
            return;
        }

        // Alternatively you can use
        // video.paused ? video.play() : video.pause();
        // If you don't like play/pause animation
        video.click();
    }

    function IsCommentBlockFocused() { // We don't want to pause when we write comments, right?
        const input_container = document.getElementById("labelAndInputContainer");
        if (input_container == undefined) {
            return false;
        }

        const input_container_class_name = input_container.className;
        if (input_container_class_name == undefined) {
            return false;
        }

        if (input_container_class_name.includes("focused")) { // Pretty much self-described
            return true;
        }

        return false;
    }

    function IsSearhContainerFocused() { // Same for search box
        const search_container = document.getElementById("search-container");
        if (search_container == undefined) {
            return false;
        }

        const search_container_class_name = search_container.className;
        if (search_container_class_name == undefined) {
            return false;
        }

        if (search_container_class_name.includes("sbfcn")) { // Fosused
            return true;
        }

        return false;
    }

    function IsValidURL() {
        const loc = location.search;
        if (loc == undefined || !loc.includes("?v=")) { // URL handling
            return false;
        }

        return true;
    }

    function onKeydown(key) {
        if (key.code != "Space") {
            return;
        }

        if (!IsValidURL()) {
            return;
        }

        if (IsCommentBlockFocused()) {
            return;
        }

        if (IsSearhContainerFocused()) {
            return;
        }

        PlayPause();
    }

    document.addEventListener('keydown', onKeydown, true);
})();
