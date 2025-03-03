class Phoning extends Activity {
    constructor(typeConfig) {
        // Set our events list based on the interactions
        const config = {
            hammerEvents: [...Tap.events, ...Drag.events, ...Swipe.events],
            interactions: [
                {
                    name: "Tap",
                    class: Tap,
                    generator: tapData,
                    sizeRatio: touchableSizeRatio
                },
                {
                    name: "Drag",
                    class: Drag,
                    generator: dragData,
                },
                {
                    name: "Swipe",
                    class: Swipe,
                    generator: randomSwipeData,
                },
                {
                    name: "Type",
                    class: Type,
                    generator: typeData,
                },
                {
                    name: "Double tap",
                    class: DoubleTap,
                    generator: doubleTapData,
                },
                {
                    name: "Watch",
                    class: Watch,
                    generator: watchData,
                },
            ]
        };

        // Let the super class do the setup
        super(config);

        clearTimeout(this.activityTimeout);
    }
}