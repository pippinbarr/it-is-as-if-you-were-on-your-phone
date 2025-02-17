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
     * 
     * (This used to be probabilistic but is now pure random)
     */
    chooseNewInteraction() {
        const interaction = random(this.interactions);
        this.interaction = new interaction.class(interaction.generator);
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