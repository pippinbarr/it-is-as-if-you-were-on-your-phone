


class Swipe extends Interaction {

    static events = ["swipe"];

    constructor(generator, config = {}) {
        super(generator, config);

        const data = generator();

        this.name = data.name;
        this.x = data.x;
        this.y = data.y;
        this.velocity = data.velocity;
        this.speed = data.speed;
        this.direction = data.direction;
        this.emoji = data.emoji;
        this.textSize = data.textSize;
        this.active = data.active;

        push();
        textSize(this.textSize);
        this.width = textWidth(this.emoji);
        this.height = textAscent() + textDescent();
        pop();

        this.instruction.text = data.instruction;
        this.instruction.x = data.x;
        this.instruction.y = data.y - (this.height / height) * 0.5 - instructionPaddingRatio;
        this.instruction.align = {
            horizontal: CENTER,
            vertical: CENTER
        };
    }

    update() {
        super.update();

        this.x += this.velocity.x * width;
        this.y += this.velocity.y * height;

        if (this.x < 0 || this.x > 1 ||
            this.y < 0 || this.y > 1) {
            this.state = InteractionStates.COMPLETE;
        }
    }

    displayIcon() {
        push();
        textSize(arrowSizeRatio * width);
        textAlign(CENTER, CENTER);
        fill(colors.ui);
        text(this.emoji, this.x * width, this.y * height);
        pop();
    }

    handleSwipe(event) {
        if (!this.active) return;

        if (this.direction === event.direction) {
            // If it's the correct swipe
            if ([Hammer.DIRECTION_LEFT, Hammer.DIRECTION_RIGHT].includes(event.direction)) {
                this.velocity.x = Math.sign(event.velocityX) / width * this.speed;
            }
            else if ([Hammer.DIRECTION_UP, Hammer.DIRECTION_DOWN].includes(event.direction)) {
                this.velocity.y = Math.sign(event.velocityY) / height * this.speed;
            }
            this.fadeOutInstruction();
        }
    }
}