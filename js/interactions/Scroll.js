


class Scroll extends Interaction {

    static events = ["swipe", "pan", "press"];

    constructor(generator) {
        super();

        this.name = "Scroll";
        this.scroll = generator();
        this.velocityDamper = 0.05;
    }

    update() {
        super.update();

        if (this.state !== InteractionStates.ACTIVE) return;

        if (!this.scroll.active) return;

        if (this.scroll.active) {
            this.scroll.progress += this.scroll.velocity;
            this.scroll.progress = constrain(this.scroll.progress, 0, 1);
        }

        if (this.scroll.progress === 1) {
            this.scroll.progress = 1;
            this.scroll.velocity = 0;
            this.scroll.active = false;

            setTimeout(() => {
                this.state = InteractionStates.COMPLETE;
            }, 500);
        }
    }

    display() {
        super.display();

        const arrow = {
            x: width / 2 - width / 10,
            y: height / 2,
            size: 128,
            text: this.scroll.emoji,
            fill: colors.fg
        };
        const bar = {
            x: width / 2,
            y: height / 2,
            width: width * 0.05,
            height: width * 0.5,
            bevel: width * 0.05,
            weight: 2,
            fill: colors.fg
        };
        const pipSize = width * 0.05;
        const ratio = lerp(this.scroll.start, this.scroll.end, this.scroll.progress);
        const pip = {
            x: bar.x,
            y: bar.y - bar.height / 2 + pipSize / 2 + (ratio * (bar.height - pipSize)),
            size: pipSize,
            fill: colors.fg
        };

        // Display the guiding arrow
        push();
        textSize(arrow.size);
        textAlign(CENTER, CENTER);
        fill(arrow.fill);
        text(arrow.text, arrow.x, arrow.y);
        pop();

        // Display the bar
        push();
        noFill();
        stroke(bar.fill);
        strokeWeight(bar.weight);
        rectMode(CENTER);
        rect(bar.x, bar.y, bar.width, bar.height, bar.bevel);
        pop();

        // Display the pip
        push();
        noStroke();
        fill(colors.fg);
        ellipse(pip.x, pip.y, pip.size);
        pop();
    }

    handleSwipe(event) {
        if (!this.scroll.active) return;

        if (this.scroll.direction.includes(event.direction)) {
            // If it's the correct swipe, use the appropriate velocity on the indicator
            if (this.scroll.type === Hammer.DIRECTION_VERTICAL) {
                this.scroll.velocity = -event.velocityY * this.velocityDamper;
            }
            else if (this.scroll.type === Hammer.DIRECTION_HORIZONTAL) {
                this.scroll.velocity = event.velocityX * this.velocityDamper;
            }
            this.scroll.swiping = true;
        }
    }

    handlePan(event) {
        if (!this.scroll.active) return;

        if (this.scroll.swiping) {
            return;
        }

        if (this.scroll.direction.includes(event.direction)) {
            // If it's the correct swipe, use the appropriate velocity on the indicator
            if (this.scroll.type === Hammer.DIRECTION_HORIZONTAL) {
                this.scroll.progress += event.deltaX * this.scroll.panDamper;
            }
            else if (this.scroll.type === Hammer.DIRECTION_VERTICAL) {
                this.scroll.progress += -event.deltaY * this.scroll.panDamper;
            }
        }
    }

    handlePress(event) {
        if (!this.scroll.active) return;

        if (this.scroll.swiping) {
            this.scroll.swiping = false;
            this.scroll.velocity = 0;
        }
    }
}