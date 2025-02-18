const DragStates = {
    READY: "Ready",
    DRAGGING: "Dragging",
    COMPLETE: "Complete",
};

function dragData() {
    return {
        source: {
            x: random(0, width),
            y: random(ACT_HEIGHT * height, height),
        },
        target: {
            x: random(0, width),
            y: random(ACT_HEIGHT * height, height),
        },
        size: 0.15,
        weight: 0.015,
        dashSize: width * 0.015,
        state: DragStates.READY,
    };
}