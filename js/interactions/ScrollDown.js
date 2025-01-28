
class ScrollDown extends Scroll {
    constructor() {
        super();

        this.name = "ScrollDown";
        this.scroll = {
            text: "Scroll down",
            emoji: "⬇",
            direction: Hammer.DIRECTION_DOWN,
            start: 0,
            end: 1,
            progress: 0,
            active: true,
            velocity: 0
        };
    }

    update() {
        super.update();
    }

    display() {
        super.display();
    }
}