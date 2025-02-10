
class SwipeUp extends SwipeHorizontal {
    constructor() {
        super();

        this.name = "SwipeUp";

        const swipeData =
        {
            emoji: "⬆️",
            direction: [Hammer.DIRECTION_UP]
        }

        this.swipe = {
            text: "Swipe",
            emoji: swipeData.emoji,
            type: Hammer.DIRECTION_VERTICAL,
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