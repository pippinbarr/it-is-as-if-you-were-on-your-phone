function lookHereData() {
    return {
        name: "Look Here",
        instruction: "Look here",
        x: random(0, width),
        y: random(0, height),
        size: 0.1,
        weight: 0.015,
        time: random(3000, 5000)
    };
}

function lookBoxData() {
    return {
        name: "Look Box",
        instruction: "Watch here",
        size: 0.75,
        weight: 0.015,
        dashSize: width * 0.015,
        time: random(3000, 5000)
    };
}