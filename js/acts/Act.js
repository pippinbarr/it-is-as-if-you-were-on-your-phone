const ACT_HEIGHT = 0.2;

const ActStates = {
    ACTIVE: "Active",
    ENDING: "Ending",
    COMPLETE: "Complete"
}

class Act extends Action {
    constructor(config) {
        super();

        this.name = "Act";
        this.interactive = false;
        this.fill = color(colors.fg.toString());
        this.alpha = 0;
        this.alphaDirection = 1;
        this.alphaSpeed = uiAlphaSpeed;

        this.actTextFunction = config.actTextFunction;
        this.actTimingFunction = config.actTimingFunction;

        this.text = this.actTextFunction();

        this.endTimeout = setTimeout(() => {
            this.end()
        }, this.actTimingFunction());
    }

    update() {
        this.alpha += this.alphaDirection * this.alphaSpeed;
        if (this.alpha >= 255) {
            this.alpha = 255;
            this.alphaDirection = 0;
        }
        else if (this.alpha <= 0 && this.state === ActStates.ENDING) {
            this.alpha = 0;
            this.alphaDirection = 0;
            this.state = ActStates.COMPLETE;
        }
    }

    display() {
        // Text of the act
        push();
        textSize(width * 0.05);
        this.fill.setAlpha(this.alpha);
        fill(this.fill);
        textAlign(LEFT, TOP);
        text(this.text, 0.1 * width, 0.05 * height, width * 0.8);
        pop();
    }

    end() {
        if (this.endTimeout) clearTimeout(this.endTimeout);
        this.state = ActStates.ENDING;
        this.alphaDirection = -1;
    }

    isComplete() {
        return this.state === ActStates.COMPLETE;
    }
}