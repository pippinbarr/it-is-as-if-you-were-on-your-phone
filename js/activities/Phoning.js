class Phoning extends Activity {
    constructor() {
        // Set our events list based on the interactions
        const config = {
            hammerEvents: [...Tap.events, ...Scroll.events, ...Swipe.events],
            interactions: [{
                class: Tap,
                probability: 0.2,
                generator: tapData
            },
            {
                class: Scroll,
                probability: 0.2,
                generator: randomVerticalScrollData
            },
            {
                class: Swipe,
                probability: 0.2,
                generator: randomSwipeData
            },
            {
                class: Type,
                probability: 0.2,
                generator: typeData
            },
            {
                class: DoubleTap,
                probability: 0.2,
                generator: doubleTapData
            }
            ]
        };

        // Let the super class do the setup
        super(config);

        // clearTimeout(this.activityTimeout);
    }
}