function generateStandardActText() {
    return random(strings.actings.actions[lang]) + " " + random(strings.actings.durations[lang]) + "."
}
function generateStandardActTime() {
    return random(5000, 6000);
}
