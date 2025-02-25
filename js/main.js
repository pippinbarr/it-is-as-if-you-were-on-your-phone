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

// Sounds for standard and zen modes
const soundSets = {
    standard: {
        taps: [],
        swipes: [],
        drags: []
    },
    zen: {
        taps: [],
        swipes: [],
        drags: []
    }
};

// Going to be using hammer
let hammer = undefined;

// Possible activities
const activities = [Phoning]; //tos, Typing, Dating, Browsing];

// Current mode
let state = undefined;

// Menu data
let menu = undefined;
const buttons = [];

/**
 * Load media (sounds)
 */
function preload() {
    // Load our gong sounds
    for (let i = 1; i <= 3; i++) {
        soundSets.zen.taps.push(loadSound(`assets/sounds/zen/gong-${i}.wav`));
        soundSets.zen.swipes.push(loadSound(`assets/sounds/zen/gong-${i}.wav`));
    }
    // Load our tone sounds
    soundSets.standard.taps.push(loadSound(`assets/sounds/standard/tap.mp3`));
    soundSets.standard.swipes.push(loadSound(`assets/sounds/standard/swipe.mp3`));
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
    state.update();
    state.display();
}

/**
 * Respond to window resizing so we're always full bleed
 */
function windowResized() {

    let newWidth = window.innerWidth;
    let newHeight = window.innerHeight;
    let newRatio = newWidth / newHeight;

    if (newRatio > 0.75) {
        newWidth = newHeight / 16 * 9;
    }

    ratio = newWidth / newHeight;

    setSizes();
    resizeCanvas(newWidth, newHeight);
}

function handleTap(event) {
    state.handleTap(event);
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
