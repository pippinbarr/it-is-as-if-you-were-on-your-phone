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
    fg: "#ffffff",
    bg: "#333333"
}

// Store the current set of tap locations to tap
const taps = [];

/**
 * Gets us ready
*/
function setup() {
    createCanvas(windowWidth, windowHeight);

    // Create a taps
    addTap();
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
        drawTap(tap);
    }
}

/**
 * Draws a single tap icon
 */
function drawTap(tap) {
    push();
    noStroke();
    fill(colors.fg);
    ellipse(tap.x, tap.y, tap.size);
    pop();
}

/**
 * Adds a tap to the screen
 */
function addTap() {
    const tapSize = width * 0.1;
    const tap = {
        x: random(0 + tapSize / 2, width - tapSize / 2),
        y: random(0 + tapSize / 2, height - tapSize / 2),
        size: tapSize
    };
    taps.push(tap);
}

/**
 * Respond to window resizing so we're always full bleed
 */
function canvasResized() {
    resizeCanvas(windowWidth, windowHeight);
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
    for (let tap of taps) {
        const d = dist(x, y, tap.x, tap.y);
        if (d < tap.size / 1.5) {
            const index = taps.indexOf(tap);
            taps.splice(index, 1);
            setTimeout(() => {
                addTap();
            }, random(500, 4000));
        }
    }
}