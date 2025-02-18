const DragStates = {
    READY: "Ready",
    DRAGGING: "Dragging",
    COMPLETE: "Complete",
};

function dragData() {
    return {
        source: {
            x: random(0, width),
            y: random(0, height),
        },
        target: {
            x: random(0, width),
            y: random(0, height),
        },
        size: 0.1,
        weight: 0.015,
        dashSize: width * 0.015,
        state: DragStates.READY,
    };
}