


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
        let x = 0;
        let y = icon.y;

        push();
        if (icon.x < 0.5) {
            x = icon.x + this.width * 0.75;
            textAlign(LEFT, CENTER);
        }
        else {
            x = icon.x - this.width * 0.75;
            textAlign(RIGHT, CENTER);
        }
        fill(colors.fg);
        textSize(instructionTextSize);
        text(icon.instruction, x * width, y * height);
        pop();
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