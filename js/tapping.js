// Store the current set of tap locations to tap
const taps = [];

function setupTapping() {
    hammer.get('tap').set({ enable: true });
    // Create a tap
    scheduleTap();
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