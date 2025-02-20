class LookBox extends Interaction {

    static events = [];

    constructor(generator, config = {}) {
        super(generator, config);

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

    displayInstruction() {
        push();
        fill(colors.fg);
        textSize(instructionTextSize);
        textAlign(CENTER, CENTER);
        text(this.instruction, this.x * width, this.y * height);
        pop();
    }

    displayIcon() {
        push();
        noFill();
        stroke(colors.ui);
        strokeWeight(lineWeight);
        rectMode(CENTER);
        rect(this.x * width, this.y * height, this.sizeRatio * width);
        pop();
    }
}