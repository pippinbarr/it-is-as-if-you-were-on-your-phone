class Browsing extends State {
    constructor() {
        super();

        this.hammerEvents = ["tap", "swipe"];
        for (let e of this.hammerEvents) {
            hammer.get(e).set({ enable: true });
        }

        this.interactions = [Tap, ScrollDown, ScrollDown, ScrollDown];
        this.interaction = undefined;

        this.chooseNewInteraction();
    }

    chooseNewInteraction() {
        const NewInteraction = random(this.interactions);
        this.interaction = new NewInteraction();
    }

    update() {
        super.update();

        this.interaction.update();

        if (this.interaction.complete) {
            this.chooseNewInteraction();
        }
    }

    display() {
        super.display();

        this.interaction.display();
    }

    handleTap(event) {
        this.interaction.handleTap(event);
    }

    handleSwipe(event) {
        this.interaction.handleSwipe(event);
    }

    /**
     * To be called when this state exits
     */
    deconstruct() {
        for (let e of this.hammerEvents) {
            hammer.get(e).set({ enable: false });
        }
    }
}