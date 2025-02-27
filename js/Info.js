class Info extends State {
    constructor(config) {
        super();
    }

    update() {

    }

    display() {
        background(colors.bg);

        let x = titlePaddingRatio * width;
        let y = titlePaddingRatio * width
        let w = width - (2 * titlePaddingRatio * width);
        let h = height - (2 * titlePaddingRatio * width);

        push();
        fill(colors.fg);
        textSize(0.05 * width);
        textStyle(NORMAL);
        textAlign(LEFT, TOP);
        text(strings.info.explanation[lang], x, y, w);
        pop();

        y += 0.6 * width;

        push();
        fill(colors.ui);
        textSize(0.05 * width);
        textStyle(BOLD);
        textAlign(RIGHT, BOTTOM);
        y = height - (titlePaddingRatio * width);
        text(strings.info.return[lang], x, y, w);
        pop();
    }

    handleTap(event) {
        state = new Menu();
    }
}