class Browsing extends State {
    constructor() {
        // Should this just be a configuration object at this point??

        // Set our events list based on the interactions
        const config = {
            hammerEvents: [...Tap.events, ...ScrollDown.events],
            interactions: [Tap, ScrollDown, ScrollDown, ScrollDown]
        }

        // Let the super class do the setup
        super(config);
    }
}