class Menu extends State {
    constructor(config) {
        super();

        this.title = {
            text: "It is as if you were on your phone",
            x: 0,
            y: 0,
            align: {
                horizontal: LEFT,
                vertical: TOP
            }
        }

        const standardButton = new Button({
            text: "Standard",
            y: 0.6,
            callback: () => {
                state = new Phoning({
                    sounds: soundSets.standard,
                    actTextFunction: generateStandardActText,
                    actTimingFunction: generateStandardActTime,
                });
            }
        });
        const zenButton = new Button({
            text: "Zen",
            y: 0.75,
            callback: () => {
                state = new Phoning({
                    sounds: soundSets.zen,
                    actTextFunction: generateZenActText,
                    actTimingFunction: generateZenActTime,
                });
            }
        });
        const helpButton = new Button({
            text: "Help",
            y: 0.9,
            callback: () => {
                state = new Phoning();
            }
        });
        this.buttons = [standardButton, zenButton, helpButton];
    }

    update() {
        for (let button of this.buttons) {
            button.update();
        }
    }

    display() {
        background(colors.bg);

        push();
        fill(colors.ui);
        textAlign(this.title.align.horizontal, this.title.align.vertical);
        textSize(titleTextSize * width);
        textStyle(BOLD);
        text(this.title.text, (this.title.x + titlePaddingRatio) * width, this.title.y * height + titlePaddingRatio * width, width - (2 * titlePaddingRatio * width));
        pop();

        for (let button of this.buttons) {
            button.display();
        }
    }

    handleTap(event) {
        for (let button of this.buttons) {
            button.handleTap(event);
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