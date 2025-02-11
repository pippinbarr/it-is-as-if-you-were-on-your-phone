function scrollDownData() {
    return {
        text: "Scroll down",
        emoji: "⬇",
        type: Hammer.DIRECTION_VERTICAL,
        direction: [Hammer.DIRECTION_DOWN, Hammer.DIRECTION_UP],
        start: 0,
        end: 1,
        progress: 0,
        active: true,
        velocity: 0,
        panDamper: 0.00005,
        swiping: false
    };
}