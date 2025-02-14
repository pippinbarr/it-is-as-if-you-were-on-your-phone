function randomVerticalScrollData() {
    if (random() < 0.5) {
        return scrollUpData();
    }
    else {
        return scrollDownData();
    }
}

function verticalScrollData() {
    return {
        text: "Scroll",
        emoji: "-",
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

function scrollDownData() {
    const scroll = verticalScrollData();
    scroll.text = "Scroll down";
    scroll.emoji = "⬇";
    scroll.start = 0;
    scroll.end = 1;
    return scroll;
}

function scrollUpData() {
    const scroll = verticalScrollData();
    scroll.text = "Scroll up";
    scroll.emoji = "⬆️";
    scroll.start = 1;
    scroll.end = 0;
    return scroll;
}