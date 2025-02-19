class Tap extends Interaction {

    static events = ["tap"];

    constructor(generator, config = {}) {
        super();

        const data = generator(config);
        this.name = data.name;
        this.instruction = data.instruction;
        this.seen = config.seen;
        this.x = data.x;
        this.y = data.y;
        this.width = touchableSize;
        this.height = touchableSize;
        this.state = data.state;
        this.tween = data.tween;
    }

    update() {
        super.update();

        switch (this.state) {
            case TapStates.TWEEN_IN:
                this.tween += TAP_TWEEN_IN_SPEED;
                if (this.tween >= 1) {
                    this.tween = 1;
                    this.state = TapStates.ACTIVE;
                }
                break;
            case TapStates.ACTIVE:
                break;
            case TapStates.TWEEN_OUT:
                this.tween -= TAP_TWEEN_OUT_SPEED;
                if (this.tween <= 0) {
                    this.state = TapStates.INACTIVE;
                    this.state = InteractionStates.COMPLETE;
                }
                break;
        }
    }

    display() {
        this.displayInstruction();
        this.displayIcon();
    }

    displayIcon() {
        push();
        noStroke();
        fill(colors.ui);
        ellipse(this.x, this.y, touchableSize * this.tween);
        pop();
    }

    displayInstruction() {
        let x = 0;
        let y = this.y;

        push();
        if (this.x < width / 2) {
            x = this.x + this.width * 0.75;
            textAlign(LEFT, CENTER);
        }
        else {
            x = this.x - this.width * 0.75;
            textAlign(RIGHT, CENTER);
        }
        fill(colors.fg);
        textSize(instructionTextSize);
        text(this.instruction, x, y);
        pop();
    }

    handleTap(event) {
        if (this.state === InteractionStates.COMPLETE) return;

        const d = dist(event.center.x, event.center.y, this.x, this.y);
        if (d < touchableSize * 0.5) {
            // Tap achieved!
            // Play a random gong
            bangAGong();
            // Get it fading out
            this.state = TapStates.TWEEN_OUT;
        }
    }
}