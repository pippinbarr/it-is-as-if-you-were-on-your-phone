const InteractionStates = {
    ACTIVE: "Active",
    ENDING: "Ending",
    COMPLETE: "Complete"
};

class Interaction extends Action {
    constructor(generator, config = {}) {
        super();

        this.name = "Interaction";
        this.seen = config.seen;
        this.sounds = config.sounds;
        this.interactive = true;
        this.state = InteractionStates.ACTIVE;

        this.instruction = {
            fill: color(colors.fg.toString()),
            size: instructionTextSizeRatio,
            alpha: 255,
            alphaChange: 0,
            alphaSpeed: uiAlphaSpeed
        }
    }

    update() {
        this.instruction.alpha += this.instruction.alphaChange;
        if (this.instruction.alpha < 0) {
            this.instruction.alpha = 0;
        }
    }

    display() {
        if (!this.seen) {
            this.displayInstruction();
        }
        this.displayIcon();
    }

    displayInstruction(config) {
        if (!this.instruction) {
            console.error("No config for displayInstruction()!");
        }

        if (config) {
            push();
            this.instruction.fill.setAlpha(this.instruction.alpha);
            fill(this.instruction.fill);
            textSize(this.instruction.size * width);

            textAlign(config.align.horizontal, config.align.vertical);
            text(config.text, config.x * width, config.y * height);
            pop();

        }
        else {
            push();
            textAlign(this.instruction.align.horizontal, this.instruction.align.vertical);
            this.instruction.fill.setAlpha(this.instruction.alpha);
            fill(this.instruction.fill);
            textSize(this.instruction.size * width);
            text(this.instruction.text, this.instruction.x * width, this.instruction.y * height);
            pop();
        }
    }

    fadeOutInstruction() {
        this.instruction.alphaChange = -this.instruction.alphaSpeed;
    }

    displayIcon() {

    }

    handleTap(event) {

    }

    handleSwipe(event) {

    }

    handlePan(event) {

    }

    handlePress(event) {

    }

    handleMousePressed(event) {
        handlePress(event);
    }

    handleTouchEnd(event) {

    }

    handleMouseReleased(event) {
        handleTouchEnd(event);
    }

    end() {
        this.state = InteractionStates.ENDING;
    }

    isComplete() {
        return this.instruction.alpha === 0 && this.state === InteractionStates.COMPLETE;
    }
}