// For now I'm separating the keyboard, but it's likely the exact some thing?
// A 40 element array because we need to be able to look at specific positions
const keyboardColumns = 10;
const keyboardRows = 4;
let keyboard = [];

function setupTyping() {
    addStartingKeyboardKeys();
    hammer.get('tap').set({ enable: true });
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
    }
}
