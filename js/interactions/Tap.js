const TAP_TWEEN_IN_SPEED = 0.05;
const TAP_TWEEN_OUT_SPEED = 0.15;

const TapStates = {
    TWEEN_IN: "Tweening in",
    ACTIVE: "Actively in place",
    TAPPED_ONCE: "Tapped one",
    TWEEN_OUT: "Tweening out",
    INACTIVE: "Not active"
};

class Tap extends Interaction {

    static events = ["tap"];

    constructor() {
        super();

        this.name = "Tap";

        this.x = random(0, width);
        this.y = random(0, height);
        this.size = 0.1;
        this.state = TapStates.TWEEN_IN;
        this.tween = 0;
        this.complete = false;
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
                    this.complete = true;
                }
                break;
        }
    }

    display() {
        push();
        noStroke();
        fill(colors.fg);
        ellipse(this.x, this.y, this.size * width * this.tween);
        pop();
    }

    handleTap(event) {
        const d = dist(event.center.x, event.center.y, this.x, this.y);
        if (d < this.size * width && !this.complete) {
            // Tap achieved!
            // Play a random gong
            bangAGong();
            // Get it fading out
            this.state = TapStates.TWEEN_OUT;
        }
    }

    isComplete() {
        return this.complete;
    }
}