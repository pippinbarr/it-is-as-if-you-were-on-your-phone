class Browsing extends Activity {
    constructor() {
        // Set our events list based on the interactions
        const config = {
            hammerEvents: [...Tap.events, ...Scroll.events],
            interactions: [{
                class: Tap,
                probability: 0.2,
                generator: tapData
            },
            {
                class: Scroll,
                probability: 0.8,
                generator: scrollDownData
            }]
        };

        // Let the super class do the setup
        super(config);
    }
}