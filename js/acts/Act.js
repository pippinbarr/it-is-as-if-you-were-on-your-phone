const ActStates = {
    ACTIVE: "Active",
    ENDING: "Ending",
    COMPLETE: "Complete"
}

class Act extends Action {
    constructor() {
        super();

        this.name = "Act";
        this.interactive = false;
        this.acts = [
            "Scratch your left eyebrow at the outside corner",
            "Breathe in deeply through your nose",
            "Shake your head briefly",
            "Nod slowly for at least three nods",
            "Sigh, then run a hand over the top of your head",
            "Narrow your eyes for two seconds",
            "Shift the weight of your body from one side to the other",
            "Compress your lips"
        ];
        this.text = random(this.acts);

        setTimeout(() => {
            this.state = ActStates.COMPLETE;
        }, random(2000, 3000));
    }

    update() {

    }

    display() {
        // Text of the act
        push();
        textSize(width * 0.05);
        fill(255);
        textAlign(LEFT, TOP);
        text(this.text, 0.1 * width, 0.05 * height, width * 0.8);
        pop();
    }

    end() {
        this.state = ActStates.ENDING;
    }

    isComplete() {
        return this.state === ActStates.COMPLETE;
    }
}