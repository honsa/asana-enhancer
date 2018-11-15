// ==UserScript==
// @name         Asana Enhancer
// @namespace    https://app.asana.com
// @version      0.3
// @description  Enhance asana web gui
// @author       honsa
// @include        https://app.asana.com/*
// @include        http://app.asana.com/*
// @match          https://app.asana.com/*
// @match          http://app.asana.com/*
// @grant        none
// ==/UserScript==

(function() {
   'use strict';
   initAsanaEnhancer();

   function initAsanaEnhancer() {
      console.log('%c init asana enhancer', 'color: #77a7ba');

      taskListDetailsOnDblClick();
      removeTopBar();
      hideUpgradeBtn();
   }

   function taskListDetailsOnDblClick() { //open task list details on double click

      let taskListItems = document.querySelectorAll('.TaskList .SubtaskTaskRow-taskName');

      for(let i = 0; i < taskListItems.length; i++) {
         taskListItems[i].addEventListener('dblclick', openTaskDetails);
      }

      console.log('show tasklist details on double click is active');
   }

   function openTaskDetails(e) { //open task list details
      e.target.parentNode.parentNode.parentNode.querySelector('.SubtaskTaskRow-detailsButton').click();
   }

   function removeTopBar() {
      let topBar = document.getElementById('topbar');

      if(topBar) {
         topBar.style.display = 'none';
         console.log('topbar removed');
      }
   }

   function hideUpgradeBtn(){
       let upgradeBtn = document.querySelector('.TopbarPageHeaderGlobalActions-upgradeButton');
       if(upgradeBtn){
          upgradeBtn.style.display = 'none';
       }
   }
   function getUrlParams(url) {
      let params = {};
      url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
         params[key] = value;
      });

      return params;
   }

   (function(open) {
      XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {

         this.addEventListener("readystatechange", function() {

            if(this.readyState === 4) {
               let urlParams = getUrlParams(this.responseURL);
               if(!urlParams.idle) { //just re-initialise if not an idle request
                  initAsanaEnhancer();
               }
            }
         }, false);

         open.call(this, method, url, async, user, pass);
      };

   })(XMLHttpRequest.prototype.open);

})();