class Button {
    constructor(config) {
        this.text = config.text;
        this.icon = config.icon;
        this.x = config.x;
        this.y = config.y;
        this.size = config.size;
        this.width = 0.2;
        this.height = 0.1;
        this.callback = config.callback;
    }

    update() {

    }

    display() {
        push();
        noStroke();
        fill(colors.ui);
        rectMode(CENTER);
        ellipse(this.x * width, this.y * height, this.size * width)

        textAlign(CENTER, CENTER);
        textSize(0.1 * width);
        textStyle(BOLD);
        fill(colors.ui);
        text(this.icon, this.x * width, this.y * height);
        pop();
    }

    handleTap(event) {
        const dx = abs(event.center.x / width - this.x);
        const dy = abs(event.center.y / height - this.y);

        if (dx < this.size * 0.5 && dy < this.size * 0.5) {
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