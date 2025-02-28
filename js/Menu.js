class Menu extends State {
    constructor(config) {
        super();

        this.title = {
            text: strings.menu.title[lang],
            x: 0,
            y: 0,
            align: {
                horizontal: LEFT,
                vertical: TOP
            }
        }

        const buttonY = 0.7;
        const buttonSize = 0.25;
        const standardButton = new Button({
            text: "Standard",
            icon: strings.menu.play[lang],
            x: 0.22,
            y: buttonY,
            size: buttonSize,
            callback: () => {
                state = new Phoning();
            }
        });
        const helpButton = new Button({
            text: "Help",
            icon: strings.menu.info[lang],
            x: 0.55,
            y: buttonY,
            size: buttonSize,
            callback: () => {
                state = new Info();
            }
        });
        this.buttons = [standardButton, helpButton];
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