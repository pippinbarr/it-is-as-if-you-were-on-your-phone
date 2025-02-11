/**
 * Dating
 * 
 * Should simulate a rough approximation of dating so:
 * - Swiping left and right most obviously
 * - Swiping up for "super like"
 * - And maybe tap (low down) and then scroll for profile?
 *   (Or is this a bit much?)
 */
class Dating extends Activity {
    constructor() {
        // Set our events list based on the interactions
        const config = {
            hammerEvents: [...Swipe.events],
            interactions: [{
                class: Swipe,
                probability: 0.7,
                generator: swipeLeftData
            },
            {
                class: Swipe,
                probability: 0.2,
                generator: swipeRightData
            },
            {
                class: Swipe,
                probability: 0.1,
                generator: swipeUpData
            }]
        };

        // Let the super class do the setup
        super(config);
    }
}