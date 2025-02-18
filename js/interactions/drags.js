const DragStates = {
    READY: "Ready",
    DRAGGING: "Dragging",
    COMPLETE: "Complete",
};

function dragData() {
    const source = randomTouchablePositionInPlayable();
    const target = randomTouchablePositionInPlayableAvoiding(source);

    return {
        source: source,
        target: target,
        state: DragStates.READY,
    };
}