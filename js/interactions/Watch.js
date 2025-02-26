class Watch extends Interaction {

    static events = [];

    constructor(generator, config = {}) {
        super(generator, config);

        const data = generator(config);

        this.name = data.name;
        this.x = data.x;
        this.y = data.y;
        this.sizeRatio = data.sizeRatio;
        this.time = data.time;
        this.fill = color(colors.fg.toString());
        this.instruction.text = data.instruction;
        this.instruction.x = data.x;
        this.instruction.y = data.y;
        this.instruction.align = {
            horizontal: CENTER,
            vertical: CENTER
        };

        // Set the timer for when this is done
        this.timeout = setTimeout(() => {
            this.state = InteractionStates.COMPLETE;
            this.fadeOutInstruction();
        }, this.time);
    }

    update() {
        super.update();


    }

    displayInstruction() {

    }

    displayIcon() {
        push();
        noFill();
        stroke(colors.ui);
        strokeWeight(lineWeight);
        rectMode(CENTER);
        rect(this.x * width, this.y * height, this.sizeRatio * width);
        pop();

        push();

        let watchBoxText = "";
        const watchBoxTextWidth = (this.sizeRatio - (0.1 * 2)) * width;
        const x = (this.x * width) - watchBoxTextWidth / 2;
        const y = (this.y * height - watchBoxTextWidth / 2);

        let alpha = 0;

        if (this.activity.act) this.activity.act.show = false;

        if (!this.seen) {
            watchBoxText = this.instruction.text;
            alpha = this.instruction.alpha;
        }
        else if (this.activity.act) {
            watchBoxText = this.activity.act.text;
            alpha = min(this.activity.act.alpha, this.instruction.alpha);
        }
        this.fill.setAlpha(alpha);

        fill(this.fill);
        textSize(instructionTextSize);
        textAlign(LEFT, TOP);
        text(`${watchBoxText}`, x, y, watchBoxTextWidth);
        pop();
    }
}