const DragStates = {
    READY: "Ready",
    DRAGGING: "Dragging",
    COMPLETE: "Complete",
};

function dragData() {
    const source = randomTouchablePositionInPlayable();
    source.instruction = strings.instructions.drag.source[lang];
    const target = randomTouchablePositionInPlayableAvoiding(source);
    target.instruction = strings.instructions.drag.target[lang];

    return {
        name: "Drag",
        width: touchableSizeRatio.x,
        height: touchableSizeRatio.y,
        source: source,
        target: target,
        state: DragStates.READY,
    };
}