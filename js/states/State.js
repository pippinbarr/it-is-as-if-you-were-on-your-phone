class State {
    constructor(config) {
        this.hammerEvents = config.hammerEvents;
        this.interactions = config.interactions;

        // Enable events (set by subclass)
        for (let e of this.hammerEvents) {
            hammer.get(e).set({ enable: true });
        }
        // Set our first interaction
        this.action = undefined;
        this.chooseNewAction();
        // Not done yet (when are we?)
        this.complete = false;
    }

    chooseNewAction() {
        let NewAction;
        if (random() < 0.3) {
            NewAction = Act;
        }
        else {
            NewAction = random(this.interactions);
        }
        this.action = new NewAction();
    }

    update() {
        if (!this.action) return;

        this.action.update();

        if (this.action.complete) {
            this.action = undefined;
            setTimeout(() => {
                this.chooseNewAction();
            }, random(500, 1000));
        }
    }

    display() {
        background(colors.bg);

        if (this.action) {
            this.action.display();
        }
    }

    handleTap(event) {
        if (this.action && this.action.interactive) {
            this.action.handleTap(event);
        }
    }

    handleSwipe(event) {
        if (this.action && this.action.interactive) {
            this.action.handleSwipe(event);
        }
    }

    handlePan(event) {
        if (this.action && this.action.interactive) {
            this.action.handlePan(event);
        }
    }

    handlePress(event) {
        if (this.action && this.action.interactive) {
            this.action.handlePress(event);
        }
    }

    isComplete() {
        return this.complete;
    }

    deconstruct() {
        for (let e of this.hammerEvents) {
            hammer.get(e).set({ enable: false });
        }
    }
}