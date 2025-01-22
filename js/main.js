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

// A starting point for telling the player how to act
const acts = [
    "Scratch your left eyebrow at the outside corner",
    "Breathe in deeply through your nose",
    "Shake your head briefly",
    "Nod slowly for at least three nods",
    "Sigh, then run a hand over the top of your head",
    "Narrow your eyes for two seconds",
    "Shift the weight of your body from one side to the other",
    "Compress your lips"
];
// The current act
let act = undefined;

// Store the current set of tap locations to tap
const taps = [];

// For now I'm separating the keyboard, but it's likely the exact some thing?
// A 40 element array because we need to be able to look at specific positions
const keyboardColumns = 10;
const keyboardRows = 4;
let keyboard = [];

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
            hammer.get('tap').set({ enable: true });
            // Create a tap
            scheduleTap();
            break;

        case Mode.RANDOM_SWIPING:
            swipe = random(swipes)();
            hammer.get('swipe').set({ enable: true });
            break;

        case Mode.RANDOM_TYPING:
            addStartingKeyboardKeys();
            hammer.get('tap').set({ enable: true });
            break;
    }

    scheduleAct();
}

function addStartingKeyboardKeys() {
    keyboard = [];
    for (let r = 0; r < keyboardRows; r++) {
        for (let c = 0; c < keyboardColumns; c++) {
            const x = width * TAP_WIDTH_RATIO * 0.5 + c * width * TAP_WIDTH_RATIO;
            const y = height - width * TAP_WIDTH_RATIO - r * width * TAP_WIDTH_RATIO;
            keyboard.push(createTap(x, y, TapStates.INACTIVE));
        }
    }
    const numKeys = random(5, 8);
    for (let i = 0; i < numKeys; i++) {
        addKeyboardTap();
    }
}

function scheduleAct() {
    setTimeout(() => {
        act = random(acts);
        setTimeout(() => {
            act = undefined;
            scheduleAct();
        }, act.length * 150);
    }, random(1000, 2000));
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

function drawAct() {
    if (act) {
        push();
        textSize(width * 0.05);
        fill(255);
        textAlign(LEFT, TOP);
        text(act, 0.1 * width, 0.1 * width, 0.8 * width, height - 0.2 * width);
        pop();
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

/**
 * Adds a tap to the screen
 */
function addTap() {
    const x = random(0 + tapSize / 2, width - tapSize / 2);
    const y = random(0 + tapSize / 2, height - tapSize / 2);
    const tap = createTap(x, y);
    taps.push(tap);
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

function addKeyboardTap() {
    let placed = false;
    while (!placed) {
        let index = floor(random(0, keyboard.length));
        if (keyboard[index].state === TapStates.INACTIVE) {
            keyboard[index].state = TapStates.TWEEN_IN;
            placed = true;
        }
    }
}

function handleTyping() {
    const taps = keyboard.filter(a => a !== undefined);
    for (let tap of taps) {
        updateTap(tap);
        drawTap(tap);
        console.log("Tapp...")
    }
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