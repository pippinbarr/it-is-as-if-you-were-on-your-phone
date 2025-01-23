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

function setupSwiping() {
    swipe = random(swipes)();
    hammer.get('swipe').set({ enable: true });
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