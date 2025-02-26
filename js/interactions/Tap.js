class Tap extends Interaction {

    static events = ["tap"];

    constructor(generator, config = {}) {
        super(generator, config);

        const data = generator(config);
        this.name = data.name;
        this.seen = config.seen;
        this.x = data.x;
        this.y = data.y;
        this.width = touchableSizeRatio.x;
        this.height = touchableSizeRatio.y;
        this.state = data.state;
        this.tween = data.tween;

        this.instruction.text = data.instruction;
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
                    this.tween = 0;
                    this.state = TapStates.INACTIVE;
                    this.state = InteractionStates.COMPLETE;
                }
                break;
        }
    }

    displayIcon() {
        const w = (touchableSizeRatio.x * width) * this.tween;
        const h = (touchableSizeRatio.y * height) * this.tween;

        push();
        noStroke();
        fill(colors.ui);
        ellipse(this.x * width, this.y * height, w, h);
        pop();
    }

    displayInstruction() {
        const config = {
            text: this.instruction.text,
            x: this.x + this.width * (this.x < 0.5 ? 0.75 : -0.75),
            y: this.y,
            align: {
                horizontal: this.x < 0.5 ? LEFT : RIGHT,
                vertical: CENTER
            }
        };

        super.displayInstruction(config);
    }

    handleTap(event) {
        if (this.state === InteractionStates.COMPLETE) return;

        // Splitting on x and y to avoid the insane-making issues
        // around using dist() when the two distances are relative to
        // different ratio something something something...
        const dx = abs(event.center.x / width - this.x);
        const dy = abs(event.center.y / height - this.y);

        if (dx < touchableSizeRatio.x * 0.5 && dy < touchableSizeRatio.y * 0.5) {
            // Tap achieved!
            if (this.sounds) random(this.sounds.taps).play();
            // Fade out instruction
            this.fadeOutInstruction();
            // Get it fading out
            this.state = TapStates.TWEEN_OUT;
        }
    }
}