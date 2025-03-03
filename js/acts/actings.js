const acts = [
    "act",
    "act",
    "act duration",
    "act act",
    "act duration act",
    "act act duration"
];
let previousAct = undefined;

function generateAct() {
    const act = {
        text: "",
        time: random(6000, 9000)
    };

    // We want to alternate deadface and one of the varied acts
    let category = undefined;
    if (previousAct !== "deadface") {
        category = "deadface";
    }
    else {
        category = random(acts);
    }

    // Choose two random acts and a duration for constructing
    let act1 = randomAct();
    let act2 = randomAct();
    while (act2 === act1) {
        act2 = randomAct();
    }
    let duration = randomActDuration();


    // Set up the text (and time) based on the category
    switch (category) {
        case "deadface":
            act.text = `${random(strings.actings.deadfaces[lang])}.`;
            act.time = random(9000, 12000);
            break;

        case "act":
            act.text = `${act1}.`;
            break;

        case "act duration":
            act.text = `${act1} ${duration}.`;
            break;

        case "act act":
            act.text = `${act1} then ${act2.toLowerCase()}.`;
            break;

        case "act duration act":
            act.text = `${act1} ${duration} then ${act2.toLowerCase()}.`;
            break;

        case "act act duration":
            act.text = `${act1} then ${act2.toLowerCase()} ${duration}.`;
            break;

    }

    // Remember the category we chose (for alternation)
    previousAct = category;
    // Send it back
    return act;
}

function randomAct() {
    return random(strings.actings.actions[lang]);
}

function randomActDuration() {
    return random(strings.actings.durations[lang]);
}

