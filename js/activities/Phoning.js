class Phoning extends Activity {
    constructor() {
        // Set our events list based on the interactions
        const config = {
            hammerEvents: [...Tap.events, ...Scroll.events, ...Swipe.events],
            interactions: [
                // {
                //     class: Tap,
                //     generator: tapData
                // },
                // {
                //     class: Scroll,
                //     generator: randomVerticalScrollData
                // },
                {
                    class: Swipe,
                    generator: randomSwipeData
                },
                // {
                //     class: Type,
                //     generator: typeData
                // },
                // {
                //     class: DoubleTap,
                //     generator: doubleTapData
                // },
                // {
                //     class: LookHere,
                //     generator: lookHereData
                // },
                // {
                //     class: LookBox,
                //     generator: lookBoxData
                // },
            ]
        };

        // Let the super class do the setup
        super(config);

        clearTimeout(this.activityTimeout);
    }
}