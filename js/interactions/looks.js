function lookHereData() {
    const position = randomTouchablePositionInPlayable();
    return {
        name: "Look Here",
        instruction: "Look here",
        x: position.x,
        y: position.y,
        time: random(3000, 5000)
    };
}

function lookBoxData() {
    return {
        name: "Look Box",
        instruction: "Watch here",
        size: 0.75,
        time: random(3000, 5000)
    };
}