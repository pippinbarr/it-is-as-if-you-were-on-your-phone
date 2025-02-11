class Typing extends Activity {
    constructor() {
        // Set our events list based on the interactions
        const config = {
            hammerEvents: [...Tap.events],
            interactions: [{
                class: Type,
                probability: 1.0,
                generator: typeData
            }]
        };

        // Let the super class do the setup
        super(config);
    }
}