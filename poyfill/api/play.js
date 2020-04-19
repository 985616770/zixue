// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.tampermonkey.net/documentation.php?ext=dhdg
// @grant        none

// @run-at       document-idle
// @include     *

// ==/UserScript==

// 油猴的插件-控制


(function() {
  'use strict';

  let $ = function(elem) {
    return document.querySelector(elem);
  };
  let vt = $('video');


  window.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') {
      vt.currentTime += 10;
    } else if (e.key === 'ArrowLeft') {
      vt.currentTime -= 10;
    }
  });

  let playRate = document.createElement('div');
  playRate.style.cssText = `position: fixed; top: 0; left: 0; z-index : 9999; 
  width: 50px;
  height : 50px;
  background-color:white;
  `;
  playRate.setAttribute('id', 'pr');
  playRate.innerHTML = vt.playbackRate;

  vt.insertAdjacentElement('beforebegin',playRate);

  let pr = $('#pr');
  pr.addEventListener('click', () => {
    vt.playbackRate += 0.5;
    playRate.innerHTML = vt.playbackRate;
  });

  // Your code here...
})();
