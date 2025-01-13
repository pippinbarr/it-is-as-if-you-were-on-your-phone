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

const TAP_WIDTH_RATIO = 0.1;
const TAP_TWEEN_IN_SPEED = 0.05;
const TAP_TWEEN_OUT_SPEED = 0.15;

const tapStates = {
    TWEEN_IN: "Tweening in",
    ACTIVE: "Actively in place",
    TWEEN_OUT: "Tweening out"
};

const colors = {
    fg: undefined,
    bg: undefined,
};

const sounds = {
    gongs: []
};

// Store the current set of tap locations to tap
const taps = [];

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
    createCanvas(window.innerWidth, window.innerHeight);

    colors.fg = color("#fff");
    colors.bg = color("#333");

    // Create a tap
    scheduleTap();
}

/**
 * Frame ticker
*/
function draw() {
    background(colors.bg);

    handleTaps();
}

/**
 * Handle taps
 */
function handleTaps() {
    for (let tap of taps) {
        updateTap(tap);
        drawTap(tap);
    }
}

/**
 * Animate tap
 */
function updateTap(tap) {
    switch (tap.state) {
        case tapStates.TWEEN_IN:
            tap.tween += TAP_TWEEN_IN_SPEED;
            if (tap.tween >= 1) {
                tap.tween = 1;
                tap.state = tapStates.ACTIVE;
            }
            break;
        case tapStates.ACTIVE:
            break;
        case tapStates.TWEEN_OUT:
            tap.tween -= TAP_TWEEN_OUT_SPEED;
            if (tap.tween <= 0) {
                removeTap(tap);
                scheduleTap();
            }
            break;
    }
}

/**
 * Draws a single tap icon
 */
function drawTap(tap) {
    push();
    noStroke();
    const toFill = colors.fg;
    toFill.setAlpha(tap.tween * 255);
    fill(toFill);
    ellipse(tap.x, tap.y, tap.size * tap.tween);
    pop();
}

/**
 * Adds a tap to the screen
 */
function addTap() {
    const tapSize = width * TAP_WIDTH_RATIO;
    const tap = {
        x: random(0 + tapSize / 2, width - tapSize / 2),
        y: random(0 + tapSize / 2, height - tapSize / 2),
        size: tapSize,
        tween: 0,
        state: tapStates.TWEEN_IN,
    };
    taps.push(tap);
}

/**
 * Remove the provided tap from the list
 */
function removeTap(tap) {
    // Remove the icon
    const index = taps.indexOf(tap);
    taps.splice(index, 1);
}

/**
 * Schedule tap
 */
function scheduleTap() {
    // Schedule the next one
    setTimeout(() => {
        addTap();
    }, random(500, 4000));
}

/**
 * Respond to window resizing so we're always full bleed
 */
function canvasResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}

/**
 * Using mousePressed as a proxy for tap - is this okay?
 */
function mousePressed(event) {
    checkTapPressed(event.clientX, event.clientY);
}

/**
 * Check if any of the taps were pressed
 */
function checkTapPressed(x, y) {
    const tappables = taps.filter(a => a.state !== tapStates.TWEEN_OUT);
    for (let tap of tappables) {
        const d = dist(x, y, tap.x, tap.y);
        if (d < tap.size * 0.75) {
            // Tap achieved!
            // Play a random gong
            bangAGong();
            // Get it fading out
            tap.state = tapStates.TWEEN_OUT;
            // Just one
            break;
        }
    }
}

function bangAGong() {
    const gong = random(sounds.gongs);
    gong.play();
}