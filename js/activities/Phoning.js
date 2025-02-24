class Phoning extends Activity {
    constructor(typeConfig) {
        // Set our events list based on the interactions
        const config = {
            sounds: typeConfig.sounds,
            actTextFunction: typeConfig.actTextFunction,
            actTimingFunction: typeConfig.actTimingFunction,
            hammerEvents: [...Tap.events, ...Drag.events, ...Swipe.events],
            interactions: [
                {
                    class: Tap,
                    generator: tapData,
                },
                {
                    class: Drag,
                    generator: dragData,
                },
                {
                    class: Swipe,
                    generator: randomSwipeData,
                },
                {
                    class: Type,
                    generator: typeData,
                },
                {
                    class: DoubleTap,
                    generator: doubleTapData,
                },
                {
                    class: LookBox,
                    generator: lookBoxData,
                },
            ]
        };

        // Let the super class do the setup
        super(config);

        clearTimeout(this.activityTimeout);
    }
}