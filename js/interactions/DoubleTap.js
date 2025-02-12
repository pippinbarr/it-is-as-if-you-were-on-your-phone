class DoubleTap extends Tap {

    static events = ["tap"];

    constructor(generator, config = {}) {
        super(generator, config);

        this.tap.taps = 0;

        this.name = "DoubleTap";
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
        // Inner tap
        super.display();

        if (this.tap.taps === 0) {
            // Outer tap
            push();
            stroke(colors.fg);
            strokeWeight(5);
            noFill();
            ellipse(this.tap.x, this.tap.y, this.tap.size * 1.2 * width * this.tap.tween);
            pop();
        }
    }

    handleTap(event) {
        if (this.state === InteractionStates.COMPLETE) return;

        const d = dist(event.center.x, event.center.y, this.tap.x, this.tap.y);
        if (d < this.tap.size * width) {
            if (this.tap.taps === 0) {
                this.tap.taps++;
                this.doubleTapTimeout = setTimeout(() => {
                    this.tap.taps = 0;
                }, 300);
            }
            else {
                if (this.doubleTapTimeout) clearTimeout(this.doubleTapTimeout);
                super.handleTap(event);
            }
        }
    }
}