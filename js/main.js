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

const touchData = {
    isDown: false,
    start: {
        x: 0,
        y: 0,
        t: 0
    },
    current: {
        x: 0,
        y: 0,
        t: 0
    },
    end: {
        x: 0,
        y: 0,
        t: 0
    }
};

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
    pixelDensity(1)
    windowResized();
    setSizes();

    const container = document.getElementById("container");
    container.appendChild(canvas.elt);

    colors.fg = color("#ffffff");
    colors.bg = color("#333333");
    colors.ui = color("#fc6c85");

    addEventListener('touchstart', handleTouchStart);
    addEventListener('touchmove', handleTouchMove);
    addEventListener('touchend', (event) => {
        handleTouchEnd(event);
    });

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

function handleTouchStart(event) {
    touchData.isDown = true;
    touchData.start.x = event.changedTouches[0].clientX;
    touchData.start.y = event.changedTouches[0].clientY;
    touchData.start.t = millis();

    state.handlePress();
}

function handleTouchMove(event) {

    touchData.current.x = event.changedTouches[0].clientX;
    touchData.current.y = event.changedTouches[0].clientY;
    touchData.current.t = millis();

    if (touchData.isDown) {
        state.handlePan();
    }
}

function handleTouchEnd(event) {
    touchData.end.x = event.changedTouches[0].clientX;
    touchData.end.y = event.changedTouches[0].clientY;
    touchData.end.t = millis();

    const dt = millis() - touchData.start.t;

    const d = dist(touchData.end.x, touchData.end.y, touchData.start.x, touchData.start.y);
    if (d > width * 0.05) {
        handleSwipe();
    }
    else if (d < width * 0.01 && dt < 300) {
        state.handleTap();
    }

    state.handleTouchEnd();
}

function handleSwipe(event) {
    const dx = touchData.end.x - touchData.start.x;
    const dy = touchData.end.y - touchData.start.y;

    const swipeData = {
        direction: undefined
    };

    if (abs(dx) > abs(dy)) {
        if (dx < 0) {
            swipeData.direction = Swipes.LEFT;
        }
        else {
            swipeData.direction = Swipes.RIGHT
        }
    }
    else {
        if (dy < 0) {
            swipeData.direction = Swipes.UP;
        }
        else {
            swipeData.direction = Swipes.DOWN;
        }
    }

    state.handleSwipe(swipeData);
}

function handlePan() {
    state.handlePan();
}

function handlePress() {
    state.handlePress();
}

// function mouseReleased() {
//     state.handleMouseReleased();
// }
