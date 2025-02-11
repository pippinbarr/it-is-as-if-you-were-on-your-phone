const keyboardColumns = 10;
const keyboardRows = 4;

class Type extends Interaction {

    static events = ["tap"];

    constructor(generator) {
        super();

        this.name = "Type";
        this.keyboard = [];
        this.createKeyboard();

        this.addTaps();
    }

    createKeyboard() {
        const t = tapData();
        for (let r = 0; r < keyboardRows; r++) {
            for (let c = 0; c < keyboardColumns; c++) {
                const x = width * t.size * 0.5 + c * width * t.size;
                const y = height - width * t.size - r * width * t.size;
                this.keyboard.push({
                    x: x,
                    y: y,
                    tap: undefined
                });
            }
        }

    }

    addTaps() {
        const numKeys = random(5, 8);
        for (let i = 0; i < numKeys; i++) {
            this.addKeyboardTap();
        }

    }

    addKeyboardTap() {
        let placed = false;
        while (!placed) {
            const key = random(this.keyboard);
            if (!key.tap) {
                key.tap = new Tap(typeData, { x: key.x, y: key.y });
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

    display() {
        for (let key of this.keyboard) {
            if (key.tap) key.tap.display();
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