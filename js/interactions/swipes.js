function randomSwipeData() {
    const generator = random([swipeLeftData, swipeRightData, swipeUpData, swipeDownData]);
    return generator();
}

function swipeLeftData() {
    const swipe = swipeData();
    swipe.emoji = "←";
    swipe.name = "Swipe left";
    swipe.instruction = "Swipe left";
    swipe.direction = Hammer.DIRECTION_LEFT;
    return swipe;
}

function swipeRightData() {
    const swipe = swipeData();
    swipe.emoji = "→";
    swipe.name = "Swipe right";
    swipe.instruction = "Swipe right";
    swipe.direction = Hammer.DIRECTION_RIGHT;
    return swipe;
}

function swipeUpData() {
    const swipe = swipeData();
    swipe.emoji = "↑";
    swipe.name = "Swipe up";
    swipe.instruction = "Swipe up";
    swipe.direction = Hammer.DIRECTION_UP;
    return swipe;
}

function swipeDownData() {
    const swipe = swipeData();
    swipe.emoji = "↓";
    swipe.name = "Swipe down";
    swipe.instruction = "Swipe down";
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