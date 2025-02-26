class Info extends State {
    constructor(config) {
        super();

        this.infos = [
            {
                icon: "📱",
                text: "Being on your phone all the time and not being on your phone all the time has never been more important!\n\nTreat yourself to  \"It is as if you were on your phone\", a phone-based experience for pretending to be on your phone without needing to be on your phone. All on your phone!\n\nRelax and self-soothe with familiar gestures and realistic human behaviour, safe in the knowledge that you're not really on your phone."
            }
        ];

        this.returnText = "Tap anywhere to return.";
    }

    update() {

    }

    display() {
        background(colors.bg);

        let x = titlePaddingRatio * width;
        let y = titlePaddingRatio * width
        let w = width - (2 * titlePaddingRatio * width);
        let h = height - (2 * titlePaddingRatio * width);

        for (let info of this.infos) {
            push();
            fill(colors.fg);
            textSize(0.2 * width);
            textStyle(NORMAL);
            textAlign(LEFT, TOP);
            text(info.icon, x, y, w);

            y += textAscent() + textDescent();
            pop();

            push();
            fill(colors.fg);
            textSize(0.05 * width);
            textStyle(NORMAL);
            textAlign(LEFT, TOP);
            text(info.text, x, y, w);
            pop();

            y += 0.6 * width;
        }

        push();
        fill(colors.ui);
        textSize(0.05 * width);
        textStyle(BOLD);
        textAlign(RIGHT, BOTTOM);
        y = height - (titlePaddingRatio * width);
        text(this.returnText, x, y, w);
        pop();
    }

    handleTap(event) {
        state = new Menu();
    }
}