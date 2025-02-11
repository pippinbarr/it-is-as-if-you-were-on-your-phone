const InteractionStates = {
    ACTIVE: "Active",
    ENDING: "Ending",
    COMPLETE: "Complete"
};

class Interaction extends Action {
    constructor() {
        super();

        this.name = "Interaction";
        this.interactive = true;
        this.state = InteractionStates.ACTIVE;
    }

    update() {

    }

    display() {

    }

    handleTap(event) {

    }

    handleSwipe(event) {

    }

    handlePan(event) {

    }

    handlePress(event) {

    }

    end() {
        this.state = InteractionStates.ENDING;
    }

    isComplete() {
        return this.state === InteractionStates.COMPLETE;
    }
}