const ActivityStates = {
    ACTIVE: "Active",
    COMPLETE: "Complete",
    ENDING: "Ending"
};

class Activity extends State {
    constructor(config) {
        super();

        this.hammerEvents = config.hammerEvents;
        this.interactions = config.interactions;

        // Enable events (set by subclass)
        for (let e of this.hammerEvents) {
            hammer.get(e).set({ enable: true });
        }

        this.state = ActivityStates.ACTIVE;

        // These will reflect our current action and act
        // which will both flow along in parallel
        this.interaction = undefined;
        this.act = undefined;

        this.chooseNewInteraction();
        this.chooseNewAct();
    }

    /**
     * Selects and configures a new interaction object from
     * the available set
     * 
     * (This used to be probabilistic but is now pure random)
     */
    chooseNewInteraction() {
        let nextInteraction = random(this.interactions);
        while (this.currentInteraction && nextInteraction.name === this.currentInteraction.name) {
            nextInteraction = random(this.interactions)
        }
        this.currentInteraction = nextInteraction;

        this.interaction = new this.currentInteraction.class(this.currentInteraction.generator, {
            seen: this.currentInteraction.seen,
            activity: this,
            sizeRatio: this.currentInteraction.sizeRatio
        });
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
            this.currentInteraction.seen = true;
            // this.currentInteraction = undefined;
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

        if (this.act) {
            this.act.update();
        }

        if (this.act && this.act.isComplete()) {
            this.act = undefined;
            setTimeout(() => {
                if (this.state === ActivityStates.ENDING) {
                }
                else {
                    this.chooseNewAct();
                }
            }, random(2000, 2000));
        }
    }

    display() {
        background(colors.bg);

        if (this.interaction) {
            this.interaction.display();
        }

        // Act area
        push();
        noStroke();
        fill(colors.bg);
        rect(0, 0, width, ACT_HEIGHT * height);
        pop();

        push();
        stroke(colors.fg);
        line(0, ACT_HEIGHT * height, width, ACT_HEIGHT * height);
        pop();

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

    handleMousePressed(event) {
        handlePress({
            center: {
                x: mouseX,
                y: mouseY
            }
        });
    }

    handleTouchEnd(event) {
        if (this.interaction && this.interaction.interactive) {
            this.interaction.handleTouchEnd(event);
        }
    }

    handleMouseReleased(event) {
        handleTouchEnd({
            center: {
                x: mouseX,
                y: mouseY
            }
        });
    }

    isComplete() {
        return this.state === ActivityStates.COMPLETE;
    }

}