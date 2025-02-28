/**
 * Helper functions for things like positioning
 */

let ratio = undefined;
const playableTop = 0.2;
const touchableSizeRatio = {
    x: 0.15,
    y: undefined
};
const doubleTapTouchableSizeRatio = {
    x: 0.16,
    y: undefined
};

const titleTextSize = 0.16;
const titleTextLineHeight = 0.17;

const lineWeightRatio = 0.005;
const arrowSizeRatio = 0.4;
const instructionTextSizeRatio = 0.05;
const instructionPaddingRatio = 0.01;
const titlePaddingRatio = 0.1;

const uiAlphaSpeed = 3;

let touchableSize = undefined;
let lineWeight = undefined;
let arrowSize = undefined;
let instructionTextSize = undefined;
let instructionPadding = undefined;

function setSizes() {
    ratio = width / height;
    touchableSizeRatio.y = ratio * touchableSizeRatio.x;
    doubleTapTouchableSizeRatio.y = ratio * doubleTapTouchableSizeRatio.x;

    lineWeight = lineWeightRatio * width;
    arrowSize = arrowSizeRatio * width;
    instructionTextSize = instructionTextSizeRatio * width;
    instructionPadding = instructionPaddingRatio * width;
}

function randomTouchablePositionInPlayable(sizeRatio = touchableSizeRatio) {
    const position = {
        x: 0,
        y: 0
    };
    position.x = random(sizeRatio.x * 0.5, 1 - sizeRatio.x * 0.5);
    position.y = random(playableTop + sizeRatio.y * 0.5, 1 - sizeRatio.y * 0.5);
    return position;
}

function randomTouchablePositionInPlayableAvoiding(avoid) {
    let position = randomTouchablePositionInPlayable();

    let dx = abs(position.x - avoid.x);
    let dy = abs(position.y - avoid.y);

    while (dy < touchableSizeRatio.y) {
        // Experimenting with only caring about y distance to avoid
        // overlapping instructions...
        position = randomTouchablePositionInPlayable();
        dx = abs(position.x - avoid.x);
        dy = abs(position.y - avoid.y);
    }
    return position;
}