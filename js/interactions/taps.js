const TAP_TWEEN_IN_SPEED = 0.05;
const TAP_TWEEN_OUT_SPEED = 0.15;

const TapStates = {
    TWEEN_IN: "Tweening in",
    ACTIVE: "Actively in place",
    TAPPED_ONCE: "Tapped one",
    TWEEN_OUT: "Tweening out",
    INACTIVE: "Not active"
};

function tapData(config = { sizeRatio: touchableSizeRatio }) {

    const position = randomTouchablePositionInPlayable(config.sizeRatio);

    return {
        name: "Tap",
        instruction: strings.instructions.tap[lang],
        x: position.x,
        y: position.y,
        state: TapStates.TWEEN_IN,
        tween: 0
    };
}

function doubleTapData() {
    const data = tapData({ sizeRatio: doubleTapTouchableSizeRatio });
    data.name = "Double tap";
    data.instruction = strings.instructions.doubleTap[lang];
    return data;
}

function typeData() {
    return {
        name: "Type",
        instruction: strings.instructions.type[lang],
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