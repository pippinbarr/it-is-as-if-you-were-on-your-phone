class Button {
    constructor(config) {
        this.text = config.text;
        this.x = 0.5;
        this.y = config.y;
        this.width = 0.8;
        this.height = 0.1;
        this.callback = config.callback;
    }

    update() {

    }

    display() {
        push();
        noStroke();
        fill(colors.fg);
        rectMode(CENTER);
        rect(0.5 * width, this.y * height, this.width * width, this.height * height, width)

        textAlign(CENTER, CENTER);
        textSize(0.075 * width);
        textStyle(BOLD);
        fill(colors.ui);
        text(this.text, 0.5 * width, this.y * height);
        pop();
    }

    handleTap(event) {
        const dx = abs(event.center.x / width - this.x);
        const dy = abs(event.center.y / height - this.y);

        if (dx < this.width * 0.5 && dy < this.height * 0.5) {
            this.callback();
        }
    }

    handlePress(event) {

    }

    handleMousePressed(event) {

    }

    handleMouseReleased(event) {

    }

    handleTouchEnd(event) {

    }
}