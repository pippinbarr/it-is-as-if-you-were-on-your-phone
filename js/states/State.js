class State {
    constructor() {
        this.complete = false;
    }

    update() {

    }

    display() {
        background(colors.bg);
    }

    deconstruct() {

    }

    handleTap(event) {

    }

    handleSwipe(event) {
        // console.log(`==== Swipe event`);
        // console.log(event);
    }

    handlePan(event) {
        // console.log(`==== Pan event`);
        // console.log(event);
    }

    handlePress(event) {
        // console.log(`==== Press event`);
        // console.log(event);
    }

    isComplete() {
        return this.complete;
    }
}