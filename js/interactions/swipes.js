function randomSwipeData() {
    const generator = random([swipeLeftData, swipeRightData, swipeUpData, swipeDownData]);
    return generator();
}

function swipeLeftData() {
    const swipe = swipeData();
    swipe.emoji = "←";
    swipe.name = "Swipe left";
    swipe.direction = Hammer.DIRECTION_LEFT;
    return swipe;
}

function swipeRightData() {
    const swipe = swipeData();
    swipe.emoji = "→";
    swipe.name = "Swipe right";
    swipe.direction = Hammer.DIRECTION_RIGHT;
    return swipe;
}

function swipeUpData() {
    const swipe = swipeData();
    swipe.emoji = "↑";
    swipe.name = "Swipe up";
    swipe.direction = Hammer.DIRECTION_UP;
    return swipe;
}

function swipeDownData() {
    const swipe = swipeData();
    swipe.emoji = "↓";
    swipe.name = "Swipe down";
    swipe.direction = Hammer.DIRECTION_DOWN;
    return swipe;
}

function swipeData() {
    return {
        name: "Swipe",
        emoji: "-",
        direction: -1,
        velocity: {
            x: 0,
            y: 0
        },
        booster: 10,
        speed: 50,
        active: true
    };
}