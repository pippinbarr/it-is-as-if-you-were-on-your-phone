


class Drag extends Interaction {

    static events = ["pan", "press"];

    constructor(generator) {
        super();

        const data = generator();

        this.name = data.name;
        this.instruction = data.instruction;
        this.source = data.source;
        this.target = data.target;
        this.instruction = data.instruction;
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

    display() {
        super.display();

        this.displayInstruction();
        this.displayIcon();
    }

    displayInstruction() {
        this.displayInstructionFor(this.source);
        this.displayInstructionFor(this.target);
    }

    displayInstructionFor(icon) {
        let x = 0;
        let y = icon.y;

        push();
        if (icon.x < width / 2) {
            x = icon.x + this.width * 0.75;
            textAlign(LEFT, CENTER);
        }
        else {
            x = icon.x - this.width * 0.75;
            textAlign(RIGHT, CENTER);
        }
        fill(colors.fg);
        textSize(instructionTextSize);
        text(icon.instruction, x, y);
        pop();
    }

    displayIcon() {

        // Source
        push();
        noStroke();
        fill(colors.ui);
        ellipse(this.source.x, this.source.y, touchableSize);
        pop();

        // Target
        push();
        noFill();
        stroke(colors.ui);
        strokeWeight(lineWeight);
        ellipse(this.target.x, this.target.y, touchableSize);
        pop();
    }

    handlePan(event) {
        if (this.state !== DragStates.DRAGGING) return;
        this.source.x = event.center.x;
        this.source.y = event.center.y;
    }

    handlePress(event) {
        if (this.state !== DragStates.READY) return;
        const d = dist(event.center.x, event.center.y, this.source.x, this.source.y);
        if (d < touchableSize * 0.5) {
            this.state = DragStates.DRAGGING;
        }
    }

    handleTouchEnd(event) {
        if (this.state === DragStates.DRAGGING) {
            const d = dist(this.source.x, this.source.y, this.target.x, this.target.y);
            if (d < touchableSize * 0.5) {
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