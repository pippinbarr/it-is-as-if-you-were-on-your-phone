const standardActs = {
    actions: [
        "Look up",
        "Smile to yourself",
        "Narrow your eyes",
        "Nod",
        "Shake your head",
        "Breathe in deeply",
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
        "Mutter under your breath",
        "Jiggle one leg",
        "Keep your mouth turned down",
        "Chew some real or imagined gum",
        "Clench your jaw",
        "Smile",
        "Lean backwards",
        "Lean over your phone",
        "Look more closely at your phone",
        "Look up at an imagined noise",
        "Bring your phone closer to your face",
        "Study your phone",
        "Squint at your phone",
        "Nod to an imagined rhythm",
        "Tip your head back",
        "Press two fingers to your lips",
        "Hold the back of your neck",
        "Scratch your knee",
        "Rest your fingertips on your your chin",
        "Blink rapidly",
        "Widen your eyes",
        "Raise your eyebrows",
        "Frown"
    ],
    durations: [
        "then sigh",
        "then breathe out",
        "then smirk",
        "briefly",
        "quickly",
        "momentarily",
        "for a moment",
        "for a count of two",
        "for a count of three",
        "for a count of five",
        "for a while",
    ]
};

function generateStandardActText() {
    return random(standardActs.actions) + " " + random(standardActs.durations) + "."
}
function generateStandardActTime() {
    return random(5000, 6000);
}

const zenActs = {
    koans: [
        "Since death alone is certain, And the time of death is uncertain, What shall I do?",
        "The way you can go isn't the real way",
        "The name you can say isn't the real name",
        "Here you are",
        "Things are as they are",
        "Nothing ever exists entirely alone",
        "An old day passes, a new day arrives",
        "Concentrate the mind on the present moment",
    ]
}

function generateZenActText() {
    return random(zenActs.koans);
}

function generateZenActTime() {
    // All zen moments are five minutes long...?
    return random(5 * 60 * 1000, 5 * 60 * 1000);
}