
class ScrollDown extends Scroll {
    constructor() {
        super();

        this.name = "ScrollDown";
        this.scroll = {
            text: "Scroll down",
            emoji: "⬇",
            type: Hammer.DIRECTION_VERTICAL,
            direction: [Hammer.DIRECTION_DOWN, Hammer.DIRECTION_UP],
            start: 0,
            end: 1,
            progress: 0,
            active: true,
            velocity: 0,
            panDamper: 0.00005,
            swiping: false
        };
    }

    update() {
        super.update();
    }

    display() {
        super.display();
    }
}