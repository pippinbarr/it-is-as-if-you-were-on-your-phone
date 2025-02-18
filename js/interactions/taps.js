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
    const position = randomTouchablePositionInPlayable();
    return {
        x: position.x,
        y: position.y,
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
        state: TapStates.TWEEN_IN,
        tween: 0
    };
}