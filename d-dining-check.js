// ==UserScript==
// @name         Disney Dining Checker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Cameron Urnes
// @match        https://*.disney.go.com/dining/*/availability-modal*
// @icon         none
// @grant        none
// @run-at       context-menu
// ==/UserScript==

//  To use, go to reservations page for any Disney restaurant and click "check availability" to bring up the popup
//  Next, select the date, time period, and party size
//  (Optionally) hit search
//  Finally, right click the page > Tampermonkey > Disney Dining Checker
//
//  To verify that its running, check developer console for loop timestamps

(function() {
    'use strict';

    console.log("starting!");
    loop()
})();

async function loop() {
    const timer = ms => new Promise(res => setTimeout(res,ms))
    do {
        var timestamp = new Date().toLocaleString();
        console.log("Looping: ",timestamp);
        clickButton()
        await timer(4000);
        var state = sorryCheck();
        console.log("State: ",state)
        if( state == true ){
            beep()
        }
        var rand = getRand();
        await timer(rand);
    }
    while( state == false )
}

function sorryCheck() {
    if(document.querySelector("#modal-content-1 > div.body > finder-availability-modal > div > div.availability > div > finder-button:nth-child(1) > button")){
        return true;
    }
    else { return false; }
}

function beep() {
    var audio = new Audio('https://secure.cdn1.wdpromedia.com/dam/disneyland/destinations/disneyland/star-wars-galaxys-edge/disneyland-star-wars-galaxys-edge-video-1280x720.mp4');
    audio.play();
}

function clickButton() {
    document.querySelector("#search-time-button > button").click();
}

function getRand() {
    return Math.floor(Math.random() * (120000 - 65000) + 65000);
}