class Menu extends State {
    constructor(config) {
        super();

        this.title = {
            text: "It is as if you were on your phone.",
            x: 0,
            y: 0,
            align: {
                horizontal: LEFT,
                vertical: TOP
            }
        }

        const buttonY = 0.85;
        const buttonSize = 0.25;
        const standardButton = new Button({
            text: "Standard",
            icon: "📱",
            x: 0.2,
            y: buttonY,
            size: buttonSize,
            callback: () => {
                state = new Phoning({
                    sounds: undefined,
                    actTextFunction: generateStandardActText,
                    actTimingFunction: generateStandardActTime,
                });
            }
        });
        const zenButton = new Button({
            text: "Zen",
            icon: "🧘",
            x: 0.5,
            y: buttonY,
            size: buttonSize,
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
            icon: "ℹ️",
            x: 0.8,
            y: buttonY,
            size: buttonSize,
            callback: () => {
                state = new Info();
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
        fill(colors.fg);
        textLeading(titleTextLineHeight * width);
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