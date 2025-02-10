/**
 * Dating
 * 
 * Should simulate a rough approximation of dating so:
 * - Swiping left and right most obviously
 * - Swiping up for "super like"
 * - And maybe tap (low down) and then scroll for profile?
 *   (Or is this a bit much?)
 */
class Dating extends State {
    constructor() {
        // Should this just be a configuration object at this point??

        // Set our events list based on the interactions
        const interactions = Array(20).fill(SwipeLeft);
        interactions.push(SwipeRight, SwipeRight, SwipeRight);
        interactions.push(SwipeUp);
        const config = {
            hammerEvents: [...Swipe.events],
            interactions: interactions
        }

        // Let the super class do the setup
        super(config);
    }
}