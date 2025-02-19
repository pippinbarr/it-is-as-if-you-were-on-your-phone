const DragStates = {
    READY: "Ready",
    DRAGGING: "Dragging",
    COMPLETE: "Complete",
};

function dragData() {
    const source = randomTouchablePositionInPlayable();
    source.instruction = "Drag this";
    const target = randomTouchablePositionInPlayableAvoiding(source);
    target.instruction = "to here";

    return {
        name: "Drag",
        width: touchableSizeRatio.x,
        height: touchableSizeRatio.y,
        source: source,
        target: target,
        state: DragStates.READY,
    };
}