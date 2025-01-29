class Browsing extends State {
    constructor() {
        super();

        // Get our events list based on the interactions
        this.hammerEvents = [...Tap.events, ...ScrollDown.events];

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
        super.handleSwipe(event);

        this.interaction.handleSwipe(event);
    }

    handlePan(event) {
        super.handlePan(event);

        this.interaction.handlePan(event);
    }

    handlePress(event) {
        super.handlePress(event);

        this.interaction.handlePress(event);
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