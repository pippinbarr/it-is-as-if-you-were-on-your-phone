


class Scroll extends Interaction {

    static events = ["swipe", "pan", "press"];

    constructor() {
        super();

        this.name = "Scroll";
        this.scroll = undefined;
        this.velocityDamper = 0.05;
    }

    update() {
        super.update();

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
                this.complete = true;
            }, 500);
        }
    }

    display() {
        super.display();

        // Display the guiding arrow
        push();
        textSize(128);
        textAlign(CENTER, CENTER);
        fill(colors.fg);
        text(this.scroll.emoji, width / 2 - width / 10, height / 2);
        pop();

        // Display the bar
        push();
        noFill();
        stroke(colors.fg);
        strokeWeight(2);
        rectMode(CENTER);
        const barX = width / 2;
        const barY = height / 2;
        const barWidth = width * 0.05;
        const barHeight = width * 0.5;
        const barBevel = width * 0.05;
        rect(barX, barY, barWidth, barHeight, barBevel);
        pop();

        // Display the pip
        push();
        noStroke();
        fill(colors.fg);
        const size = width * 0.05;
        const ratio = lerp(this.scroll.start, this.scroll.end, this.scroll.progress);
        const pipY = barY - barHeight / 2 + size / 2 + (ratio * (barHeight - size));
        ellipse(barX, pipY, size);
        pop();
    }

    handleSwipe(event) {
        if (!this.scroll.active) return;

        if (this.scroll.direction.includes(event.direction)) {
            // If it's the correct swipe, use the appropriate velocity on the indicator
            if (this.scroll.type === Hammer.DIRECTION_VERTICAL) {
                this.scroll.velocity = event.velocityY * this.velocityDamper;
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
                this.scroll.progress += event.deltaY * this.scroll.panDamper;
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