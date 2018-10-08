// ==UserScript==
// @name         Asana Enhancer
// @namespace    https://app.asana.com
// @version      0.1
// @description  Enhance asana web gui
// @author       honsa
// @include        https://app.asana.com/*
// @include        http://app.asana.com/*
// @match          https://app.asana.com/*
// @match          http://app.asana.com/*
// @grant        none
// ==/UserScript==

(function () {
   'use strict';
   initAsanaEnhancer();

   function initAsanaEnhancer(){
      console.log('%c init asana enhancer', 'color: #77a7ba');

      let taskListItems = document.querySelectorAll('.TaskList .SubtaskTaskRow-taskName');

      for(var i = 0; i < taskListItems.length; i++){
         taskListItems[i].addEventListener('dblclick', openTaskDetails);
      }
   }

   function openTaskDetails(e){
      e.target.parentNode.parentNode.parentNode.querySelector('.ItemRow-right .SubtaskTaskRow-detailsButton').click();
   }

   (function (open) {
      XMLHttpRequest.prototype.open = function (method, url, async, user, pass) {

         this.addEventListener("readystatechange", function () {
            let state = this.readyState;
            console.log(this);
            if (this.readyState === 4) {
               initAsanaEnhancer();
            }
         }, false);

         open.call(this, method, url, async, user, pass);
      };

   })(XMLHttpRequest.prototype.open);

})();