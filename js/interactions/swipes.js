function swipeLeftData() {
    const swipe = swipeHorizontalData();
    swipe.emoji = "⬅️";
    swipe.name = "Swipe left";
    swipe.direction = [Hammer.DIRECTION_LEFT];
    return swipe;
}

function swipeRightData() {
    const swipe = swipeHorizontalData();
    swipe.emoji = "➡️";
    swipe.name = "Swipe right";
    swipe.direction = [Hammer.DIRECTION_RIGHT];
    return swipe;
}

function swipeUpData() {
    const swipe = swipeVerticalData();
    swipe.emoji = "⬆️";
    swipe.name = "Swipe up";
    swipe.direction = [Hammer.DIRECTION_UP];
    return swipe;
}

function swipeHorizontalData() {
    const swipe = swipeData();
    swipe.type = Hammer.DIRECTION_HORIZONTAL;
    return swipe;
}

function swipeHorizontalData() {
    const swipe = swipeData();
    swipe.type = Hammer.DIRECTION_VERTICAL;
    return swipe;
}

function swipeData() {
    return {
        name: "Swipe",
        emoji: "-",
        type: undefined,
        direction: [],
        active: true
    };
}