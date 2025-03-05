/**
 * It is as if you were on your phone
 * Pippin Barr
 * 
 * Helps the user/player to simulate the outward manifestations of being on their
 * phone so that they can relax and just not be on their phone, on their phone.
 * 
 * Uses:
 * p5.js (for now)
*/

"use strict";

const colors = {
    fg: undefined,
    bg: undefined,
    ui: undefined,
};

// Going to be using hammer
let hammer = undefined;

// Possible activities
const activities = [Phoning]; //tos, Typing, Dating, Browsing];

// Current mode
let state = undefined;

// Current aspect
let landscape = undefined;

// Menu data
let menu = undefined;
const buttons = [];

// Language data
let lang = "en";
let strings = undefined;

/**
 * Load media (JSON)
 */
function preload() {
    strings = loadJSON(`assets/data/lang.json`);
}

/**
 * Gets us ready
*/
function setup() {
    const canvas = createCanvas(window.innerWidth, window.innerHeight);
    windowResized();
    setSizes();

    const container = document.getElementById("container");
    container.appendChild(canvas.elt);

    colors.fg = color("#ffffff");
    colors.bg = color("#333333");
    colors.ui = color("#fc6c85");

    // Setup swipes
    hammer = new Hammer(document, {});

    hammer.get('tap').set();
    hammer.on('tap', handleTap);

    hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    hammer.on('swipe', handleSwipe);

    hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    hammer.on('pan', handlePan);

    hammer.get('press').set({ time: 10 });
    hammer.on('press', handlePress);

    addEventListener('touchend', handleTouchEnd);
    addEventListener('orientationchange', windowResized);

    state = new Menu();
}

function startNewActivity() {
    const NextActivity = random(activities);
    state = new NextActivity();
}

/**
 * Frame ticker
*/
function draw() {
    if (!landscape) {
        state.update();
        state.display();
    }
    else {
        showLandscapeMessage();
    }
}

function showLandscapeMessage() {
    background(colors.bg);

    push();
    textAlign(CENTER, CENTER);
    fill(colors.fg);
    textSize(0.2 * height);
    text("📱", width * 0.5, height * 0.4);
    textSize(0.0555 * height);
    rectMode(CENTER);
    text("For phones in portrait mode only.\n\nTap/click this screen to go to the game's information page.", width * 0.5, height * 0.6, width * 0.8);
    pop();
}

/**
 * Respond to window resizing so we're always full bleed
 */
function windowResized() {

    let newWidth = window.innerWidth;
    let newHeight = window.innerHeight;
    let newRatio = newWidth / newHeight;

    landscape = newWidth > newHeight;

    // if (newRatio > 0.75) {
    //     newWidth = newHeight / 16 * 9;
    // }

    ratio = newWidth / newHeight;

    setSizes();
    resizeCanvas(newWidth, newHeight);
}

function handleTap(event) {
    if (!landscape) {
        state.handleTap(event);
    }
    else {
        window.open("https://pippinbarr.com/it-is-as-if-you-were-on-your-phone/info");
    }
}

function handleSwipe(event) {
    state.handleSwipe(event);
}

function handlePan(event) {
    state.handlePan(event);
}

function handlePress(event) {
    state.handlePress(event);
}

function handleTouchEnd(event) {
    state.handleTouchEnd(event);
}

function mouseReleased(event) {
    state.handleMouseReleased(event);
}
