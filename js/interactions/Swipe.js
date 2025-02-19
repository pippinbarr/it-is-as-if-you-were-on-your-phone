


class Swipe extends Interaction {

    static events = ["swipe"];

    constructor(generator) {
        super();

        const data = generator();

        this.name = data.name;
        this.instruction = data.instruction;
        this.x = data.x;
        this.y = data.y;
        this.velocity = data.velocity;
        this.direction = data.direction;
        this.emoji = data.emoji;
        this.textSize = data.textSize;

        push();
        textSize(this.textSize);
        this.width = textWidth(this.emoji);
        this.height = textAscent() + textDescent();
        pop();

    }

    update() {
        super.update();

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (this.x < 0 || this.x > width ||
            this.y < 0 || this.y > height) {
            this.state = InteractionStates.COMPLETE;
        }
    }

    display() {
        super.display();

        this.displayInstruction();
        this.displayIcon();
    }

    displayInstruction() {
        let x = this.x;
        let y = this.y - this.height / 2 - instructionPadding;

        textAlign(CENTER, CENTER);

        fill(colors.fg);
        textSize(instructionTextSize);
        text(this.instruction, x, y);
        pop();
    }

    displayIcon() {
        push();
        textSize(this.textSize);
        textAlign(CENTER, CENTER);
        fill(colors.ui);
        text(this.emoji, this.x, this.y);
        pop();

    }

    handleSwipe(event) {
        if (!this.active) return;

        if (this.direction === event.direction) {
            // If it's the correct swipe
            if ([Hammer.DIRECTION_LEFT, Hammer.DIRECTION_RIGHT].includes(event.direction)) {
                this.velocity.x = Math.sign(event.velocityX) * this.speed;
            }
            else if ([Hammer.DIRECTION_UP, Hammer.DIRECTION_DOWN].includes(event.direction)) {
                this.velocity.y = Math.sign(event.velocityY) * this.speed;
            }

            console.log(this.velocity);
        }
    }
}