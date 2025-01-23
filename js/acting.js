// A starting point for telling the player how to act
const acts = [
    "Scratch your left eyebrow at the outside corner",
    "Breathe in deeply through your nose",
    "Shake your head briefly",
    "Nod slowly for at least three nods",
    "Sigh, then run a hand over the top of your head",
    "Narrow your eyes for two seconds",
    "Shift the weight of your body from one side to the other",
    "Compress your lips"
];
// The current act
let act = undefined;

function scheduleAct() {
    setTimeout(() => {
        act = random(acts);
        setTimeout(() => {
            act = undefined;
            scheduleAct();
        }, act.length * 150);
    }, random(1000, 2000));
}

function drawAct() {
    if (act) {
        push();
        textSize(width * 0.05);
        fill(255);
        textAlign(LEFT, TOP);
        text(act, 0.1 * width, 0.1 * width, 0.8 * width, height - 0.2 * width);
        pop();
    }
}