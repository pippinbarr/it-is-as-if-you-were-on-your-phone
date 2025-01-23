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
    TAPPED_ONCE: "Tapped one",
    TWEEN_OUT: "Tweening out",
    INACTIVE: "Not active"
};

const Mode = {
    RANDOM_TAPPING: "Random tapping",
    RANDOM_SWIPING: "Random swiping",
    RANDOM_TYPING: "Random typing"
};

const colors = {
    fg: undefined,
    bg: undefined,
};

const sounds = {
    gongs: []
};

// Going to be using hammer
let hammer = undefined;

// Current mode
let mode = Mode.RANDOM_TYPING;

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
            setupTapping();
            break;

        case Mode.RANDOM_SWIPING:
            setupSwiping();
            break;

        case Mode.RANDOM_TYPING:
            setupTyping();
            break;
    }

    scheduleAct();
}



/**
 * Frame ticker
*/
function draw() {
    background(colors.bg);

    drawAct();

    switch (mode) {
        case Mode.RANDOM_TAPPING:
            handleTaps();
            break;

        case Mode.RANDOM_SWIPING:
            handleSwipes();
            break;

        case Mode.RANDOM_TYPING:
            handleTyping();
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
                tap.state = TapStates.INACTIVE;
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

function createTap(x, y, state = TapStates.TWEEN_IN) {
    const tapSize = width * TAP_WIDTH_RATIO;
    const tap = {
        x: x,
        y: y,
        size: tapSize,
        tween: 0,
        state: state,
    };
    return tap;
}

/**
 * Remove the provided tap from the list
 */
function removeTap(tap) {
    // Remove the icon
    const index = taps.indexOf(tap);
    if (index !== -1) {
        taps.splice(index, 1);
    }
}

/**
 * Schedule tap
 */
function scheduleTap() {
    switch (mode) {
        case Mode.RANDOM_TAPPING:
            setTimeout(() => {
                addTap();
            }, random(500, 4000));
            break;

        case Mode.RANDOM_TYPING:
            setTimeout(() => {
                addKeyboardTap();
            }, random(500, 750));
    }
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
    let tappables = undefined;
    if (mode === Mode.RANDOM_TYPING) {
        tappables = keyboard.filter(a => a !== undefined && a.state !== TapStates.TWEEN_OUT && a.state !== TapStates.INACTIVE);
    }
    else if (mode === Mode.RANDOM_TAPPING) {
        tappables = taps.filter(a => a.state !== TapStates.TWEEN_OUT && a.state !== TapStates.INACTIVE);
    }

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



