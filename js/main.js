/**
 * It is as if you were on your phone
 * Pippin Barr
 * 
 * Helps the user/player to simulate the outward manifestations of being on their
 * phone so that they can relax and just not be on their phone.
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

const sounds = {
    gongs: []
};

// Going to be using hammer
let hammer = undefined;

// Possible activities
const activities = [Phoning]; //tos, Typing, Dating, Browsing];

// Current mode
let activity;

/**
 * Load media (sounds)
 */
function preload() {
    // Load our three (for now) gong sounds
    for (let i = 1; i <= 3; i++) {
        const sound = loadSound(`assets/sounds/gong-${i}.wav`);
        sounds.gongs.push(sound);
    }
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

    hammer.get('tap').set({ enable: false });
    hammer.on('tap', handleTap);

    hammer.get('swipe').set({ enable: false, direction: Hammer.DIRECTION_ALL });
    hammer.on('swipe', handleSwipe);

    hammer.get('pan').set({ enable: false, direction: Hammer.DIRECTION_ALL });
    hammer.on('pan', handlePan);

    hammer.get('press').set({ enable: false, time: 10 });
    hammer.on('press', handlePress);

    addEventListener('touchend', handleTouchEnd);

    startNewActivity();
}

function startNewActivity() {
    const NextActivity = random(activities);
    activity = new NextActivity();
}

/**
 * Frame ticker
*/
function draw() {
    activity.update();
    activity.display();

    if (activity.isComplete()) {
        activity.deconstruct();
        startNewActivity();
    }
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

function bangAGong() {
    const gong = random(sounds.gongs);
    gong.play();
}

function handleTap(event) {
    activity.handleTap(event);
}

function handleSwipe(event) {
    activity.handleSwipe(event);
}

function handlePan(event) {
    activity.handlePan(event);
}

function handlePress(event) {
    activity.handlePress(event);
}

function handleTouchEnd(event) {
    activity.handleTouchEnd(event);
}

// function mousePressed(event) {
//     activity.handleMousePressed(event);
// }

function mouseReleased(event) {
    activity.handleMouseReleased(event);
}
