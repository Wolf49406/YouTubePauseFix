// ==UserScript==
// @name         YouTube Pause Fix
// @version      0.4
// @description  Fix youtube pause on SpaceBar after alt-tab
// @author       http://github.com/Wolf49406
// @match        *://www.youtube.com/watch?v=*
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

        const class_name = movie_player.className;
        if (class_name == undefined) {
            return;
        }

        if (!class_name.includes("ytp-probably-keyboard-focus")) {
            return;
        }

        video.click();
    }

    function IsCommentBlockFocused() {
        const input_container = document.getElementById("labelAndInputContainer");
        if (input_container == undefined) {
            return false;
        }

        const class_name = input_container.className;
        if (class_name == undefined) {
            return false;
        }

        if (class_name.includes("focused")) {
            return true;
        }

        return false;
    }

    function onKeydown(key) {
        if (key.code != "Space") {
            return;
        }

        if (IsCommentBlockFocused()) {
            return;
        }

        PlayPause();
    }

    document.addEventListener('keydown', onKeydown, true);
})();
