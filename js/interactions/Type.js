const keyboardColumns = 6;
const keyboardRows = 4;

class Type extends Interaction {

    static events = ["tap"];

    constructor(generator, config = {}) {
        super(generator, config);

        const data = generator();

        this.name = data.name;
        this.instruction = data.instruction;

        this.keyboard = this.createKeyboard();

        this.addTaps();

        setTimeout(() => {
            this.state = InteractionStates.ENDING;
        }, random(10000, 15000));
    }

    createKeyboard() {
        const keyboard = [];

        const startX = (1 - keyboardColumns * touchableSizeRatio.x) * 0.5;
        for (let r = 0; r < keyboardRows; r++) {
            for (let c = 0; c < keyboardColumns; c++) {
                const x = startX + touchableSizeRatio.x * 0.5 + c * touchableSizeRatio.x;
                const y = (1 - touchableSizeRatio.y * 0.5) - (r * touchableSizeRatio.y);
                keyboard.push({
                    x: x,
                    y: y,
                    tap: undefined
                });
            }
        }
        return keyboard;
    }

    addTaps() {
        const numKeys = random(3, 5);
        for (let i = 0; i < numKeys; i++) {
            this.addKeyboardTap();
        }

    }

    addKeyboardTap() {
        let placed = false;
        while (!placed) {
            const key = random(this.keyboard);
            if (!key.tap) {
                key.tap = new Tap(positionedTapData, { x: key.x, y: key.y });
                placed = true;
            }
        }
    }

    update() {
        super.update();

        let activeTaps = 0;
        for (let key of this.keyboard) {
            if (key.tap) {
                activeTaps++;
                key.tap.update();
                key.tap.display();
                if (key.tap.isComplete()) {
                    key.tap = undefined;
                    setTimeout(() => {
                        if (this.state === InteractionStates.ACTIVE) {
                            this.addKeyboardTap();
                        }
                    }, 200);
                }
            }
        }
        if (activeTaps === 0 && this.state === InteractionStates.ENDING) {
            this.state = InteractionStates.COMPLETE;
        }
    }

    displayInstruction() {
        const x = 0.5;
        const y = 1 - touchableSizeRatio.y * 0.5 - keyboardRows * touchableSizeRatio.y;

        push();
        fill(colors.fg);
        textAlign(CENTER, CENTER);
        textSize(instructionTextSize);
        text(this.instruction, x * width, y * height)
        pop();
    }

    displayIcon() {
        for (let key of this.keyboard) {
            if (key.tap) key.tap.displayIcon();
        }
    }

    handleTap(event) {
        for (let key of this.keyboard) {
            if (key.tap) key.tap.handleTap(event);
        }
    }

    isComplete() {
        return this.state === InteractionStates.COMPLETE;
    }
}