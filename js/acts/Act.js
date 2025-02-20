const ACT_HEIGHT = 0.2;

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
        this.actions = [
            "Look up",
            "Smile to yourself",
            "Narrow your eyes",
            "Nod",
            "Shake your head",
            "Breathe in",
            "Close your eyes",
            "Grimace",
            "Smile with the left side of your mouth",
            "Wince",
            "Glance away",
            "Shrug",
            "Look down at your feet",
            "Compress your lips",
            "Furrow your brow",
            "Look away to the right",
            "Look to the left",
            "Squeeze the phone",
            "Stretch your neck",
            "Laugh under your breath",
            "Mutter something unintelligible"
        ];
        this.durations = [
            "briefly",
            "quickly",
            "for a tiny moment",
            "for a count of three",
            "for a count of two",
            "momentarily",
            "minutely",
            "subtly",
            "for a moment",
        ];
        this.text = random(this.actions) + " " + random(this.durations) + ".";

        setTimeout(() => {
            this.state = ActStates.COMPLETE;
        }, random(5000, 6000));
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