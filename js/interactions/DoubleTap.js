class DoubleTap extends Tap {

    static events = ["tap"];

    constructor(generator, config = {}) {
        super(generator, config);

        this.taps = 0;
        this.width = touchableSizeRatio.x * 1.2;
        this.height = touchableSizeRatio.y * 1.2;
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

        const w = this.width * width * this.tween;
        const h = this.height * height * this.tween;

        if (this.taps === 0) {
            // Outer tap
            push();
            stroke(colors.ui);
            strokeWeight(lineWeight);
            noFill();
            ellipse(this.x * width, this.y * height, w, h);
            pop();
        }
    }

    handleTap(event) {
        if (this.state === InteractionStates.COMPLETE) return;

        const dx = abs(event.center.x / width - this.x);
        const dy = abs(event.center.y / height - this.y);

        if (dx < touchableSizeRatio.x * 0.5 && dy < touchableSizeRatio.y * 0.5) {
            if (this.taps === 0) {
                this.taps++;
                random(this.sounds.taps).play();
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