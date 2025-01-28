class State {
    constructor() {
        this.complete = false;
    }

    update() {
        this.display();
    }

    display() {
        background(colors.bg);
    }

    deconstruct() {

    }

    handleTap(event) {

    }

    handleSwipe(event) {

    }

    isComplete() {
        return this.complete;
    }
}