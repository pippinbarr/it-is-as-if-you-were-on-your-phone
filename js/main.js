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

const TapStates = {
    TWEEN_IN: "Tweening in",
    ACTIVE: "Actively in place",
    TWEEN_OUT: "Tweening out"
};

const Mode = {
    RANDOM_TAPPING: "Random tapping",
    RANDOM_SWIPING: "Random swiping"
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

// Testing the idea of a swipe instruction
let swipe = undefined;
const swipes = [
    () => ({
        text: "Swipe left",
        emoji: "←",
        hammer: Hammer.DIRECTION_LEFT,
        start: 1,
        end: 0,
        progress: 0,
        active: true,
        velocity: 0
    }),
    () => ({
        text: "Swipe right",
        emoji: "→",
        hammer: Hammer.DIRECTION_RIGHT,
        start: 0,
        end: 1,
        progress: 0,
        active: true,
        velocity: 0
    }),
];

// Going to be using hammer
let hammer = undefined;

// Current mode
let mode = Mode.RANDOM_SWIPING;

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

    // Setup swipes
    hammer = new Hammer(document, {});

    hammer.get('tap').set({ enable: false });
    hammer.on('tap', (e) => {
        handleTap(e);
    });

    hammer.get('swipe').set({ enable: false, direction: Hammer.DIRECTION_ALL });
    hammer.on('swipe', (e) => {
        handleSwipe(e);
    });

    switch (mode) {
        case Mode.RANDOM_TAPPING:
            hammer.get('tap').set({ enable: true });
            // Create a tap
            scheduleTap();
            break;

        case Mode.RANDOM_SWIPING:
            swipe = random(swipes)();
            hammer.get('swipe').set({ enable: true });
            break;
    }
}

/**
 * Frame ticker
*/
function draw() {
    background(colors.bg);

    switch (mode) {
        case Mode.RANDOM_TAPPING:
            handleTaps();
            break;

        case Mode.RANDOM_SWIPING:
            handleSwipes();
            break;
    }
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
        case TapStates.TWEEN_IN:
            tap.tween += TAP_TWEEN_IN_SPEED;
            if (tap.tween >= 1) {
                tap.tween = 1;
                tap.state = TapStates.ACTIVE;
            }
            break;
        case TapStates.ACTIVE:
            break;
        case TapStates.TWEEN_OUT:
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
        state: TapStates.TWEEN_IN,
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
 * Handle swipes (draw it)
 */
function handleSwipes() {

    // Move the indicator based on velocity
    if (swipe.active) {
        swipe.progress += abs(swipe.velocity);
    }

    if (swipe.progress >= 1 && swipe.active) {
        swipe.progress = 1;
        swipe.active = false;
        scheduleNewSwipe();
    }

    // Display the guiding arrow
    push();
    textSize(128);
    textAlign(CENTER, CENTER);
    fill(colors.fg);
    text(swipe.emoji, width / 2, height / 2);
    pop();

    // Display the bar
    push();
    noFill();
    stroke(colors.fg);
    strokeWeight(2);
    rectMode(CENTER);
    const barX = width / 2;
    const barY = height / 2 - height / 8;
    const barWidth = width * 0.5;
    const barHeight = width * 0.05;
    const barBevel = width * 0.05;
    rect(barX, barY, barWidth, barHeight, barBevel);
    pop();

    // Display the pip
    push();
    noStroke();
    fill(colors.fg);
    const size = width * 0.05;
    const ratio = lerp(swipe.start, swipe.end, swipe.progress);
    const pipX = barX - barWidth / 2 + size / 2 + (ratio * (barWidth - size));
    ellipse(pipX, barY, size);
    pop();

    // push();
    // textSize(64);
    // textAlign(CENTER, CENTER);
    // fill(colors.fg);
    // text(swipe.text, width / 2, height / 2);
    // pop();
}

/**
 * Respond to window resizing so we're always full bleed
 */
function canvasResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}

/**
 * Check if any of the taps were pressed
 */
function checkTapPressed(x, y) {
    const tappables = taps.filter(a => a.state !== TapStates.TWEEN_OUT);
    for (let tap of tappables) {
        const d = dist(x, y, tap.x, tap.y);
        if (d < tap.size * 0.75) {
            // Tap achieved!
            // Play a random gong
            bangAGong();
            // Get it fading out
            tap.state = TapStates.TWEEN_OUT;
            // Just one
            break;
        }
    }
}

function bangAGong() {
    const gong = random(sounds.gongs);
    gong.play();
}

function handleTap(event) {
    checkTapPressed(event.center.x, event.center.y);
}

/**
 * For now just ask for a new swipe 
 */
function handleSwipe(event) {
    if (swipe.hammer === event.direction && swipe.progress === 0) {
        // If it's the right swipe, use its velocity on the indicator
        swipe.velocity = event.velocityX * 0.25;
    }
}

/**
 * Schedules a new swipe
 */
function scheduleNewSwipe() {
    setTimeout(() => {
        swipe = random(swipes)();
    }, 2000);
}