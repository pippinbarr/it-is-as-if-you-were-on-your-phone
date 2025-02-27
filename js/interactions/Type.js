const keyboardColumns = 6;
const keyboardRows = 4;

class Type extends Interaction {

    static events = ["tap"];

    constructor(generator, config = {}) {
        super(generator, config);

        const data = generator();

        this.name = data.name;

        this.instruction.text = data.instruction;
        this.instruction.x = 0.5;
        this.instruction.y = 1 - touchableSizeRatio.y * 0.5 - keyboardRows * touchableSizeRatio.y;
        this.instruction.align = {
            horizontal: CENTER,
            vertical: CENTER
        };

        this.keyboard = this.createKeyboard();

        this.addTaps();

        setTimeout(() => {
            this.state = InteractionStates.ENDING;
        }, random(5000, 20000));
    }

    createKeyboard() {
        const keyboard = [];

        const startX = (1 - keyboardColumns * touchableSizeRatio.x) * 0.5;
        const bottomY = 1 - (touchableSizeRatio.y * 0.5) - ratio * startX;

        for (let r = 0; r < keyboardRows; r++) {
            for (let c = 0; c < keyboardColumns; c++) {
                const x = startX + touchableSizeRatio.x * 0.5 + c * touchableSizeRatio.x;
                const y = bottomY - (r * touchableSizeRatio.y);
                keyboard.push({
                    x: x,
                    y: y,
                    tap: undefined
                });
            }
        }

        this.instruction.y = bottomY - (keyboardRows * touchableSizeRatio.y);
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
            this.fadeOutInstruction();
        }
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
}