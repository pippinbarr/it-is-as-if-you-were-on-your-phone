/**
 * Helper functions for things like positioning
 */

const playableTop = 0.2;
const touchableSizeRatio = 0.15;
const lineWeightRatio = 0.005;
const arrowSizeRatio = 0.4;

let touchableSize = undefined;
let lineWeight = undefined;
let arrowSize = undefined;


function randomTouchablePositionInPlayable() {
    const position = {
        x: 0,
        y: 0
    };
    position.x = random(touchableSize * 0.5, width - touchableSize - 0.5);
    position.y = random(playableTop * height + touchableSize * 0.5, height - touchableSize * 0.5);
    return position;
}

function randomTouchablePositionInPlayableAvoiding(avoid) {
    let position = randomTouchablePositionInPlayable();
    let d = dist(position.x, position.y, avoid.x, avoid.y);
    while (d > touchableSize * width) {
        position = randomTouchablePositionInPlayable();
        d = dist(position.x, position.y, avoid.x, avoid.y);
    }
    return position;
}