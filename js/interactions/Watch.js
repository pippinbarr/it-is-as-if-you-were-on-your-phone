class Watch extends Interaction {

    static events = [];

    constructor(generator, config = {}) {
        super(generator, config);

        const data = generator();

        this.name = data.name;
        this.x = data.x;
        this.y = data.y;
        this.sizeRatio = data.sizeRatio;
        this.time = data.time;
        this.fill = color(colors.fg.toString());
        this.instruction.text = data.instruction;
        this.instruction.x = data.x;
        this.instruction.y = data.y - this.sizeRatio * 0.15;
        this.instruction.align = {
            horizontal: CENTER,
            vertical: CENTER
        };
        this.spinnerAngle = 0;

        // Set the timer for when this is done
        this.timeout = setTimeout(() => {
            this.state = InteractionStates.COMPLETE;
            this.fadeOutInstruction();
        }, this.time);
    }

    update() {
        super.update();
    }

    displayIcon() {
        push();
        noFill();
        stroke(colors.ui);
        strokeWeight(lineWeight);
        rectMode(CENTER);
        rect(this.x * width, this.y * height, this.sizeRatio * width);
        pop();

        // if (this.seen) {
        push();
        this.instruction.fill.setAlpha(this.alpha);
        stroke(colors.ui);
        strokeWeight(lineWeight);
        translate(this.x * width, this.y * height);
        rotate(this.spinnerAngle);
        line(-this.sizeRatio * 0.1 * width, 0, this.sizeRatio * 0.1 * width, 0);
        pop();

        this.spinnerAngle += 0.1;
        // }
    }
}