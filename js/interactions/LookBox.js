class LookBox extends Interaction {

    static events = [];

    constructor(generator, config = {}) {
        super();

        const data = generator(config);

        this.name = data.name;
        this.instruction = data.instruction;
        this.x = data.x;
        this.y = data.y;
        this.sizeRatio = data.sizeRatio;
        this.time = data.time;

        // Set the timer for when this is done
        this.timeout = setTimeout(() => {
            this.state = InteractionStates.COMPLETE;
        }, this.time);
    }

    update() {
        super.update();
    }

    display() {
        this.displayInstruction();
        this.displayIcon();
    }

    displayInstruction() {
        push();
        fill(colors.fg);
        textSize(instructionTextSize);
        textAlign(CENTER, CENTER);
        text(this.instruction, this.x, this.y);
        pop();
    }

    displayIcon() {
        const size = width * this.sizeRatio;

        push();
        noFill();
        stroke(colors.ui);
        strokeWeight(lineWeight);
        rectMode(CENTER);
        rect(this.x, this.y, size);
        pop();
    }
}