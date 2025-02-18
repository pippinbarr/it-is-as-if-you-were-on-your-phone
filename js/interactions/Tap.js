class Tap extends Interaction {

    static events = ["tap"];

    constructor(generator, config = {}) {
        super();

        this.name = "Tap";
        this.tap = generator(config);
    }

    update() {
        super.update();

        switch (this.tap.state) {
            case TapStates.TWEEN_IN:
                this.tap.tween += TAP_TWEEN_IN_SPEED;
                if (this.tap.tween >= 1) {
                    this.tap.tween = 1;
                    this.tap.state = TapStates.ACTIVE;
                }
                break;
            case TapStates.ACTIVE:
                break;
            case TapStates.TWEEN_OUT:
                this.tap.tween -= TAP_TWEEN_OUT_SPEED;
                if (this.tap.tween <= 0) {
                    this.tap.state = TapStates.INACTIVE;
                    this.state = InteractionStates.COMPLETE;
                }
                break;
        }
    }

    display() {
        push();
        noStroke();
        fill(colors.ui);
        ellipse(this.tap.x, this.tap.y, touchableSize * this.tap.tween);
        pop();
    }

    handleTap(event) {
        if (this.state === InteractionStates.COMPLETE) return;

        const d = dist(event.center.x, event.center.y, this.tap.x, this.tap.y);
        if (d < touchableSize * 0.5) {
            // Tap achieved!
            // Play a random gong
            bangAGong();
            // Get it fading out
            this.tap.state = TapStates.TWEEN_OUT;
        }
    }
}