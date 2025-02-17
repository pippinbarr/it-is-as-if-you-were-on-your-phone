/**
 * Being a bit coy and not calling it "Instagram"...
 */

class Photos extends Activity {
    constructor() {
        // Set our events list based on the interactions
        const config = {
            hammerEvents: [...Tap.events, ...Scroll.events],
            interactions: [
                {
                    class: Tap,
                    probability: 0.1,
                    generator: tapData
                },
                {
                    class: DoubleTap,
                    probability: 0.2,
                    generator: doubleTapData
                },
                {
                    class: Scroll,
                    probability: 0.7,
                    generator: scrollDownData
                }
            ]
        };

        // Let the super class do the setup
        super(config);
    }
}