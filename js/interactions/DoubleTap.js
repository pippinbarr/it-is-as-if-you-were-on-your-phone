class DoubleTap extends Tap {

    static events = ["tap"];

    constructor(generator, config = {}) {
        super(generator, config);

        this.taps = 0;
        this.width = touchableSize * 1.2;
        this.height = touchableSize * 1.2;
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

    displayIcon() {
        // Inner tap
        super.displayIcon();

        if (this.taps === 0) {
            // Outer tap
            push();
            stroke(colors.ui);
            strokeWeight(lineWeight);
            noFill();
            ellipse(this.x, this.y, touchableSize * 1.25 * this.tween);
            pop();
        }
    }

    handleTap(event) {
        if (this.state === InteractionStates.COMPLETE) return;

        const d = dist(event.center.x, event.center.y, this.x, this.y);
        if (d < touchableSize) {
            if (this.taps === 0) {
                this.taps++;
                this.doubleTapTimeout = setTimeout(() => {
                    this.taps = 0;
                }, 300);
            }
            else {
                if (this.doubleTapTimeout) clearTimeout(this.doubleTapTimeout);
                super.handleTap(event);
            }
        }
    }
}