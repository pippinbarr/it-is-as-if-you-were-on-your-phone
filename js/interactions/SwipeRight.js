
class SwipeRight extends SwipeHorizontal {
    constructor() {
        super();

        this.name = "SwipeLeft";

        const swipeData =
        {
            emoji: "➡️",
            direction: [Hammer.DIRECTION_RIGHT]
        }

        this.swipe = {
            text: "Swipe",
            emoji: swipeData.emoji,
            type: Hammer.DIRECTION_HORIZONTAL,
            direction: swipeData.direction,
            active: true,
        };
    }

    update() {
        super.update();
    }

    display() {
        super.display();
    }
}