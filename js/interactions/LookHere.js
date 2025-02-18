class LookHere extends Interaction {

    static events = [];

    constructor(generator, config = {}) {
        super();

        this.name = "Look Here";
        this.data = generator(config);

        // Set the timer for when this is done
        this.timeout = setTimeout(() => {
            this.state = InteractionStates.COMPLETE;
        }, this.data.time);
    }

    update() {
        super.update();
    }

    display() {
        const x = this.data.x;
        const y = this.data.y;
        const size = touchableSize;

        push();
        stroke(colors.ui);
        strokeWeight(lineWeight);
        line(x - size / 2, y - size / 2, x + size / 2, y + size / 2);
        line(x + size / 2, y - size / 2, x - size / 2, y + size / 2);
        pop();
    }
}