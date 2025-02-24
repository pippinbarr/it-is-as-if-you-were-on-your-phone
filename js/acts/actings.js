const standardActs = {
    actions: [
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
    ],
    durations: [
        "briefly",
        "quickly",
        "for a tiny moment",
        "for a count of three",
        "for a count of two",
        "momentarily",
        "minutely",
        "subtly",
        "for a moment",
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
        "Ohmmm etc."
    ]
}

function generateZenActText() {
    return random(zenActs.koans);
}

function generateZenActTime() {
    return random(30000, 60000);
}