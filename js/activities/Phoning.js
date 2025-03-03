class Phoning extends Activity {
    constructor(typeConfig) {
        // Set our events list based on the interactions
        const config = {
            hammerEvents: [...Tap.events, ...Drag.events, ...Swipe.events],
            interactions: [
                // {
                //     class: Tap,
                //     generator: tapData,
                //     sizeRatio: touchableSizeRatio
                // },
                // {
                //     class: Drag,
                //     generator: dragData,
                // },
                // {
                //     class: Swipe,
                //     generator: randomSwipeData,
                // },
                // {
                //     class: Type,
                //     generator: typeData,
                // },
                // {
                //     class: DoubleTap,
                //     generator: doubleTapData,
                // },
                {
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