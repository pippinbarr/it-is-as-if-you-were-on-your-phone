class Info extends State {
    constructor(config) {
        super();

        this.infos = [
            {
                icon: "📱",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac semper ipsum, sed semper mauris. Curabitur ex nunc, porttitor sed gravida et, maximus ut erat. Fusce pharetra gravida ligula, at bibendum diam tincidunt non. Sed malesuada ornare enim, eu viverra leo viverra eget. Aliquam sed porttitor arcu. Proin porta egestas lorem. In justo nisl, mattis sit amet justo quis, vestibulum elementum purus."
            },
            {
                icon: "🧘",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac semper ipsum, sed semper mauris. Curabitur ex nunc, porttitor sed gravida et, maximus ut erat. Fusce pharetra gravida ligula, at bibendum diam tincidunt non. Sed malesuada ornare enim, eu viverra leo viverra eget. Aliquam sed porttitor arcu. Proin porta egestas lorem. In justo nisl, mattis sit amet justo quis, vestibulum elementum purus."
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
            textSize(0.1 * width);
            textStyle(NORMAL);
            textAlign(LEFT, TOP);
            text(info.icon, x, y, w);

            y += textAscent() + textDescent();
            pop();

            push();
            fill(colors.fg);
            textSize(0.04 * width);
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