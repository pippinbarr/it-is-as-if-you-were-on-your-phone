const ActivityStates = {
    ACTIVE: "Active",
    COMPLETE: "Complete",
    ENDING: "Ending"
};

class Activity {
    constructor(config) {
        this.hammerEvents = config.hammerEvents;
        this.interactions = config.interactions;

        // Enable events (set by subclass)
        for (let e of this.hammerEvents) {
            hammer.get(e).set({ enable: true });
        }

        // These will reflect our current action and act
        // which will both flow along in parallel
        this.interaction = undefined;
        this.act = undefined;

        this.chooseNewInteraction();
        this.chooseNewAct();

        this.state = ActivityStates.ACTIVE;

        // End the state at a set time
        this.activityTimeout = setTimeout(() => {
            this.state = ActivityStates.ENDING;
            if (this.interaction) this.interaction.end();
            if (this.act) this.act.end();
        }, random(10000, 20000));
    }

    /**
     * Selects and configures a new interaction object from
     * the available set
     */
    chooseNewInteraction() {
        // Random number for probability
        const p = random();
        // Our current threshold for choosing an interaction starts
        // at 0 and we will add the probability of each interaction reviewed
        let threshold = 0;
        // Go through all possible interactions
        for (let interaction of this.interactions) {
            // Add their probability to the threshold
            threshold += interaction.probability;
            // Check if our random number falls within this range
            if (p < threshold) {
                // If so, create the appropriate class with the
                // appropriate data generator
                this.interaction = new interaction.class(interaction.generator);
                break;
            }
        }
        // Fallback? If I fuck up the probabilities it would be possible
        // to fail, so may want a fallback that's a tap or something?
        if (!this.interaction) {
            console.warn("Did not select a new interaction, generating tap.");
            this.interaction = new Tap(tapData);
        }
    }

    chooseNewAct() {
        if (this.state === ActivityStates.ACTIVE) {
            this.act = new Act();
        }
    }

    update() {
        if (this.state === ActivityStates.COMPLETE || !this.interaction) return;

        this.interaction.update();

        if (this.interaction && this.interaction.isComplete()) {
            this.interaction = undefined;
            setTimeout(() => {
                if (this.state === ActivityStates.ENDING) {
                    this.act = undefined;
                    this.state = ActivityStates.COMPLETE;
                }
                else {
                    this.chooseNewInteraction();
                }
            }, random(500, 1000));
        }

        if (this.act && this.act.isComplete()) {
            this.act = undefined;
            setTimeout(() => {
                if (this.state === ActivityStates.ENDING) {
                }
                else {
                    this.chooseNewAct();
                }
            }, random(1000, 10000));
        }
    }

    display() {
        background(colors.bg);

        // Line separating out the Act and Interaction sections
        push();
        stroke(colors.fg);
        line(0, 0.2 * height, width, 0.2 * height);
        pop();

        if (this.interaction) {
            this.interaction.display();
        }

        if (this.act) {
            this.act.display();
        }
    }

    handleTap(event) {
        if (this.interaction && this.interaction.interactive) {
            this.interaction.handleTap(event);
        }
    }

    handleSwipe(event) {
        if (this.interaction && this.interaction.interactive) {
            this.interaction.handleSwipe(event);
        }
    }

    handlePan(event) {
        if (this.interaction && this.interaction.interactive) {
            this.interaction.handlePan(event);
        }
    }

    handlePress(event) {
        if (this.interaction && this.interaction.interactive) {
            this.interaction.handlePress(event);
        }
    }

    isComplete() {
        return this.state === ActivityStates.COMPLETE;
    }

    deconstruct() {
        for (let e of this.hammerEvents) {
            hammer.get(e).set({ enable: false });
        }
    }
}