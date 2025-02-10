
class SwipeHorizontal extends Swipe {
    constructor() {
        super();

        this.name = "SwipeHorizontal";

        this.swipes = [
            {
                emoji: "⬅️",
                direction: [Hammer.DIRECTION_LEFT]
            },
            {
                emoji: "➡️",
                direction: [Hammer.DIRECTION_RIGHT]
            }
        ];

        const swipeData = random(this.swipes);
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