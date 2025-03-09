const Swipes = {
    LEFT: "Left",
    RIGHT: "Right",
    UP: "Up",
    DOWN: "Down"
};

function randomSwipeData() {
    const generator = random([swipeLeftData, swipeRightData, swipeUpData, swipeDownData]);
    return generator();
}

function swipeLeftData() {
    const swipe = swipeData();
    swipe.emoji = "←";
    swipe.name = "Swipe left";
    swipe.instruction = strings.instructions.swipe.left[lang];
    swipe.direction = Swipes.LEFT;
    return swipe;
}

function swipeRightData() {
    const swipe = swipeData();
    swipe.emoji = "→";
    swipe.name = "Swipe right";
    swipe.instruction = strings.instructions.swipe.right[lang];
    swipe.direction = Swipes.RIGHT;
    return swipe;
}

function swipeUpData() {
    const swipe = swipeData();
    swipe.emoji = "↑";
    swipe.name = "Swipe up";
    swipe.instruction = strings.instructions.swipe.up[lang];
    swipe.direction = Swipes.UP;
    return swipe;
}

function swipeDownData() {
    const swipe = swipeData();
    swipe.emoji = "↓";
    swipe.name = "Swipe down";
    swipe.instruction = strings.instructions.swipe.down[lang];
    swipe.direction = Swipes.DOWN;
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
        speed: 0.1,
        active: true
    };
}