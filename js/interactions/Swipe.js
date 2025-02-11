


class Swipe extends Interaction {

    static events = ["swipe"];

    constructor(generator) {
        super();

        this.swipe = generator();
    }

    update() {
        super.update();

    }

    display() {
        super.display();

        const arrow = {
            x: width / 2 - width / 10,
            y: height / 2,
            size: 128,
            text: this.swipe.emoji,
            fill: colors.fg
        };

        // Display the guiding arrow
        push();
        textSize(arrow.size);
        textAlign(CENTER, CENTER);
        fill(arrow.fill);
        text(arrow.text, arrow.x, arrow.y);
        pop();
    }

    handleSwipe(event) {
        if (!this.swipe.active) return;

        if (this.swipe.direction.includes(event.direction)) {
            // If it's the correct swipe, use the appropriate velocity on the indicator
            this.state = InteractionStates.COMPLETE;
        }
    }
}