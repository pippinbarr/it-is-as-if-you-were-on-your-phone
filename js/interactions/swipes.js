function randomSwipeData() {
    const generator = random([swipeLeftData, swipeRightData, swipeUpData, swipeDownData]);
    return generator();
}

function swipeLeftData() {
    const swipe = swipeData();
    swipe.emoji = "←";
    swipe.name = "Swipe left";
    swipe.instruction = strings.instructions.swipe.left[lang];
    swipe.direction = Hammer.DIRECTION_LEFT;
    return swipe;
}

function swipeRightData() {
    const swipe = swipeData();
    swipe.emoji = "→";
    swipe.name = "Swipe right";
    swipe.instruction = strings.instructions.swipe.right[lang];
    swipe.direction = Hammer.DIRECTION_RIGHT;
    return swipe;
}

function swipeUpData() {
    const swipe = swipeData();
    swipe.emoji = "↑";
    swipe.name = "Swipe up";
    swipe.instruction = strings.instructions.swipe.up[lang];
    swipe.direction = Hammer.DIRECTION_UP;
    return swipe;
}

function swipeDownData() {
    const swipe = swipeData();
    swipe.emoji = "↓";
    swipe.name = "Swipe down";
    swipe.instruction = strings.instructions.swipe.down[lang];
    swipe.direction = Hammer.DIRECTION_DOWN;
    return swipe;
}

function swipeData() {
    return {
        name: "Swipe",
        emoji: "-",
        textSize: arrowSize,
        instruction: "Swipe",
        x: 0.5,
        y: 0.5,
        direction: -1,
        velocity: {
            x: 0,
            y: 0
        },
        speed: 0.05,
        active: true
    };
}