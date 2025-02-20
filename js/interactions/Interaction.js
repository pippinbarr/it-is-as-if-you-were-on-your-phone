const InteractionStates = {
    ACTIVE: "Active",
    ENDING: "Ending",
    COMPLETE: "Complete"
};

class Interaction extends Action {
    constructor(generator, config = {}) {
        super();

        this.name = "Interaction";
        this.seen = config.seen;
        this.interactive = true;
        this.state = InteractionStates.ACTIVE;
    }

    update() {

    }

    display() {
        if (!this.seen) {
            this.displayInstruction();
        }
        this.displayIcon();
    }

    handleTap(event) {

    }

    handleSwipe(event) {

    }

    handlePan(event) {

    }

    handlePress(event) {

    }

    handleMousePressed(event) {
        handlePress(event);
    }

    handleTouchEnd(event) {

    }

    handleMouseReleased(event) {
        handleTouchEnd(event);
    }

    end() {
        this.state = InteractionStates.ENDING;
    }

    isComplete() {
        return this.state === InteractionStates.COMPLETE;
    }
}