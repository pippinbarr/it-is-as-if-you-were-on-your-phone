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
        name: "Tap",
        instruction: "Tap this",
        x: position.x,
        y: position.y,
        state: TapStates.TWEEN_IN,
        tween: 0
    };
}

function doubleTapData() {
    const data = tapData();
    data.name = "Double tap";
    data.instruction = "Double tap this";
    return data;
}

function typeData() {
    return {
        name: "Type",
        instruction: "Tap these",
    };
}

function positionedTapData({ x, y }) {
    return {
        name: "Positioned Tap",
        x: x,
        y: y,
        state: TapStates.TWEEN_IN,
        tween: 0
    };
}