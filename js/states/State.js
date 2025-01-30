class State {
    constructor(config) {
        this.hammerEvents = config.hammerEvents;
        this.interactions = config.interactions;

        // Enable events (set by subclass)
        for (let e of this.hammerEvents) {
            hammer.get(e).set({ enable: true });
        }
        // Set our first interaction
        this.interaction = undefined;
        this.chooseNewInteraction();
        // Not done yet (when are we?)
        this.complete = false;
    }

    chooseNewInteraction() {
        const NewInteraction = random(this.interactions);
        this.interaction = new NewInteraction();
    }

    update() {
        this.interaction.update();

        if (this.interaction.complete) {
            this.chooseNewInteraction();
        }
    }

    display() {
        background(colors.bg);

        this.interaction.display();
    }

    deconstruct() {

    }

    handleTap(event) {
        this.interaction.handleTap(event);
    }

    handleSwipe(event) {
        this.interaction.handleSwipe(event);
    }

    handlePan(event) {
        this.interaction.handlePan(event);
    }

    handlePress(event) {
        this.interaction.handlePress(event);
    }

    isComplete() {
        return this.complete;
    }

    deconstruct() {
        for (let e of this.hammerEvents) {
            hammer.get(e).set({ enable: false });
        }
    }
}