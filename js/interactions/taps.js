const TAP_TWEEN_IN_SPEED = 0.05;
const TAP_TWEEN_OUT_SPEED = 0.15;

const TapStates = {
    TWEEN_IN: "Tweening in",
    ACTIVE: "Actively in place",
    TAPPED_ONCE: "Tapped one",
    TWEEN_OUT: "Tweening out",
    INACTIVE: "Not active"
};

function tapData() {
    return {
        x: random(0, width),
        y: random(0, height),
        size: 0.1,
        state: TapStates.TWEEN_IN,
        tween: 0
    };
}

function doubleTapData() {
    return tapData();
}

function typeData({ x, y }) {
    return {
        x: x,
        y: y,
        size: 0.1,
        state: TapStates.TWEEN_IN,
        tween: 0
    };
}