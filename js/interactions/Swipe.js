


class Swipe extends Interaction {

    static events = ["swipe"];

    constructor(generator) {
        super();

        this.swipe = generator();
        this.swipe.x = width / 2;
        this.swipe.y = height / 2;
    }

    update() {
        super.update();

        this.swipe.x += this.swipe.velocity.x;
        this.swipe.y += this.swipe.velocity.y;

        if (this.swipe.x < 0 || this.swipe.x > width ||
            this.swipe.y < 0 || this.swipe.y > height) {
            this.state = InteractionStates.COMPLETE;
        }
    }

    display() {
        super.display();

        const arrow = {
            x: this.swipe.x,
            y: this.swipe.y,
            size: arrowSize,
            text: this.swipe.emoji,
            fill: colors.ui,
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

        if (this.swipe.direction === event.direction) {
            // If it's the correct swipe
            if ([Hammer.DIRECTION_LEFT, Hammer.DIRECTION_RIGHT].includes(event.direction)) {
                this.swipe.velocity.x = Math.sign(event.velocityX) * this.swipe.speed;
            }
            else if ([Hammer.DIRECTION_UP, Hammer.DIRECTION_DOWN].includes(event.direction)) {
                this.swipe.velocity.y = Math.sign(event.velocityY) * this.swipe.speed;
            }

            console.log(this.swipe.velocity);
        }
    }
}