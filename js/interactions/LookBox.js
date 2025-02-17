class LookBox extends Interaction {

    static events = [];

    constructor(generator, config = {}) {
        super();

        this.name = "Look Box";
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
        const x = width / 2;
        const y = height / 2;
        const size = width * this.data.size;

        push();
        noFill();
        stroke(colors.fg);
        strokeWeight(0.01 * width);
        rectMode(CENTER);
        drawingContext.setLineDash([this.data.dashSize]);
        rect(x, y, size);
        pop();
    }
}