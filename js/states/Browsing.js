class Browsing extends State {
    constructor() {
        super();

        this.hammerEvents = ["tap"];
        for (let e of this.hammerEvents) {
            hammer.get(e).set({ enable: true });
        }

        this.interactions = [Tap];
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
        this.interaction.display();

        if (this.interaction.complete) {
            this.chooseNewInteraction();
        }
    }

    handleTap(e) {
        this.interaction.handleTap(e);
    }
}