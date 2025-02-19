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
        width: touchableSize,
        height: touchableSize,
        source: source,
        target: target,
        state: DragStates.READY,
    };
}