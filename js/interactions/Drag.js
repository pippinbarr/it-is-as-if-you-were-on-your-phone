


class Drag extends Interaction {

    static events = ["pan", "press"];

    constructor(generator, config = {}) {
        super(generator, config);

        const data = generator();

        this.name = data.name;
        this.state = data.state;
        this.source = data.source;
        this.target = data.target;
        this.width = data.width;
        this.height = data.height;
        this.instruction.text = data.instruction;

    }

    update() {
        super.update();

        if (this.state !== InteractionStates.ACTIVE) return;

        switch (this.state) {
            case DragStates.READY:
                break;
            case DragStates.DRAGGING:
                break;
            case DragStates.COMPLETE:
                this.state = InteractionStates.ENDING;

                setTimeout(() => {
                    this.state = InteractionStates.COMPLETE;
                }, 500);
        }
    }

    displayInstruction() {
        this.displayInstructionFor(this.source);
        this.displayInstructionFor(this.target);
    }

    displayInstructionFor(icon) {
        const config = {
            text: icon.instruction,
            x: undefined,
            y: icon.y,
            align: {
                horizontal: undefined,
                vertical: CENTER
            }
        };

        push();
        if (icon.x < 0.5) {
            config.x = icon.x + this.width * 0.75;
            config.align.horizontal = LEFT;
        }
        else {
            config.x = icon.x - this.width * 0.75;
            config.align.horizontal = RIGHT;
        }

        super.displayInstruction(config);
    }

    displayIcon() {
        const w = touchableSizeRatio.x * width;
        const h = touchableSizeRatio.y * height;

        // Source
        push();
        noStroke();
        fill(colors.ui);
        ellipse(this.source.x * width, this.source.y * height, w, h);
        pop();

        // Target
        push();
        noFill();
        stroke(colors.ui);
        strokeWeight(lineWeight);
        ellipse(this.target.x * width, this.target.y * height, w, h);
        pop();
    }

    handlePan(event) {
        if (this.state !== DragStates.DRAGGING) return;

        this.source.x = event.center.x / width;
        this.source.y = event.center.y / height;
    }

    handlePress(event) {
        if (this.state !== DragStates.READY) return;

        const dx = abs(event.center.x / width - this.source.x);
        const dy = abs(event.center.y / height - this.source.y);

        if (dx < touchableSizeRatio.x * 0.5 && dy < touchableSizeRatio.y * 0.5) {
            this.fadeOutInstruction();
            this.state = DragStates.DRAGGING;
        }
    }

    handleTouchEnd(event) {

        if (this.state === DragStates.DRAGGING) {

            const dx = this.target.x - this.source.x;
            const dy = this.target.y - this.source.y;

            if (dx < touchableSizeRatio.x * 0.5 && dy < touchableSizeRatio.y * 0.5) {
                this.source.x = this.target.x;
                this.source.y = this.target.y;
                this.state = DragStates.COMPLETE;
            }
            else {
                this.state = DragStates.READY;
            }
        }
    }
}