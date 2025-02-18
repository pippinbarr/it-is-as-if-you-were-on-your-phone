


class Drag extends Interaction {

    static events = ["pan", "press"];

    constructor(generator) {
        super();

        this.name = "Drag";
        this.data = generator();
    }

    update() {
        super.update();

        if (this.state !== InteractionStates.ACTIVE) return;

        switch (this.data.state) {
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

        // Source
        push();
        noStroke();
        fill(colors.ui);
        ellipse(this.data.source.x, this.data.source.y, this.data.size * width);
        pop();

        // Target
        push();
        noFill();
        stroke(colors.ui);
        strokeWeight(0.005 * width);
        drawingContext.setLineDash([this.data.dashSize]);
        ellipse(this.data.target.x, this.data.target.y, this.data.size * width);
        pop();
    }

    handlePan(event) {
        if (this.data.state !== DragStates.DRAGGING) return;

        this.data.source.x = event.center.x;
        this.data.source.y = event.center.y;
    }

    handlePress(event) {
        if (this.data.state !== DragStates.READY) return;
        const d = dist(event.center.x, event.center.y, this.data.source.x, this.data.source.y);
        if (d < this.data.size * width / 2) {
            this.data.state = DragStates.DRAGGING;
        }
    }

    handleTouchEnd(event) {
        if (this.data.state === DragStates.DRAGGING) {
            const d = dist(this.data.source.x, this.data.source.y, this.data.target.x, this.data.target.y);
            if (d < this.data.size * width / 2) {
                this.data.source.x = this.data.target.x;
                this.data.source.y = this.data.target.y;
                this.data.state = DragStates.COMPLETE;
            }
            else {
                this.data.state = DragStates.READY;
            }
        }
    }
}