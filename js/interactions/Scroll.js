
class Scroll extends Interaction {
    constructor() {
        super();

        this.name = "Scroll";
        this.scroll = undefined;
    }

    update() {
        super.update();

        if (this.scroll.active) {
            this.scroll.progress += abs(this.scroll.velocity);
        }

        if (this.scroll.progress >= 1 && this.scroll.active) {
            this.scroll.progress = 1;
            this.scroll.active = false;
            this.complete = true;
        }
    }

    display() {
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
        if (this.scroll.direction === event.direction && this.scroll.progress === 0) {
            // If it's the right swipe, use its velocity on the indicator
            this.scroll.velocity = event.velocityY * 0.05;
        }
    }

    handlePan(event) {

    }
}