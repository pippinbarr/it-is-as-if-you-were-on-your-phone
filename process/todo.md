# To-do

## Sound

- Think through the sound design of standard and zen
    - Current instinct: no sound for normal, sound for zen

## Writing it
- More Acts
    - Jiggle your leg, make sure your mouth is turned down, chew, flex your jaw, smile, crinkle your eyes, sit back, look more closely at your phone, mutter under your breath, say random words under your breath, look over at someone else, bring your phone close to your face, nod, bob your head to an unheard rhythm, tilt your head back
    - Put away your phone and take it out (a classic gesture -- Matt!)
- Zen Acts
- Help text

## Building it

- ~~Instruction fades~~
- **For now let's say NO to mute button, even though it's bad design** ~~Maybe a mute button as well? Argh, buttons.~~
- ~~Drag instruction fade~~
- ~~Act fades?~~
- ~~Add Zen Mode~~
- ~~Add title screen and menu~~
- **I think it's alright** ~~Think about relationship of instructions to movement (swipes, drags) -- notably if you swipe up~~

- Help screen
- Maybe a back button at the top in the act zone? (Back to menu)
- Acts move inside the Watch Box when it no longer has a tutorial (should there be watch box specific acts?) -- great idea from Matt
- JSON the language (maybe consider French? Although already a bit painful)

---

# Archival to-dos (as of 2025-02-21)

## Big questions

- **We're doing it, don't worry** ~~Zen versus Social Camouflage?~~
    - ~~What about "Zen Mode" as a thing; it makes total sense~~
    - ~~Gongs and Acts that are meditative and more spaced out~~
- **I think it's the happy marriage of "both" - words and icons to start with, then just icons ~~Words versus Icons for communicating tasks?~~
    - ~~I'd assumed icons were better (more attractive), but is there a power to the blankness and clarity of words? A lack of glamour?~~

## Research

- ~~Spend some time on my phone just trying to see typical interactions and interaction clusters and interaction sequences~~
- **This is likely more important for when I'm working on the suite?** ~~Spend time in specific apps and take notes on typical interaction~~

## Visual design

- ~~Do some sketches of how this could look in terms of the actual screens and most especially the interaction indicators~~
- ~~Make some visual prototypes in Keynote or similar~~
- ~~How to indicate "swipe" and "scroll" ~~
    - **Yes but only for now** ~~Is this sort of "fixed for now" with the arrow plus scrollbar?~~
- ~~Make more visual prototypes~~
    - **I think this was misleading for this project, may bring it back for the Suite** ~~Specifically explore more iconic representation? "Text" that is just lines across the screen, images as boxes, ... very different universe but perhaps it would work... in a way even more pleasingly abstract? (At what point would it make more sense to implement it as a webpage though... hmmmmmmmmm)~~
- ~~Spend more time on the representation (swipe vs. pan is a big one)~~

## Prototyping

- ~~Checking on proportional positioning and sizing and a resizing canvas~~
- ~~Checking on basic feel of random-location bubble popping (plus points?)~~
- ~~Explore Zen sound effects~~
- ~~Explore simple animations for feedback~~
- ~~Exploration of swipe~~
- ~~Esablish "modes"~~
- **Calling them "acts" for now** ~~Add instructions for face etc.~~
- **Feels good, though can be tweaked** ~~Checking on the feel of "keyboard input" idea~~
- ~~Activities and a general state/modular model~~
- ~~Scrolling (think about the relationship of pan and swipe)~~
- ~~Bring in a second activity (Dating?)~~
- ~~Inter-interaction delay system~~
- ~~Bring back acting~~
    - ~~Try it out with a serial mode (e.g. an act is another interaction - will need to change the overall structure of that system to have an "action" base class with acts and interactions subclassed?)~~
- ~~Bring in typing~~
- ~~Switching activities~~
- ~~Bring in Instagram (incl. double tap)~~
- ~~Set up a more generic activity of "Being on your phone" that mixes and matches everything randomly~~
- ~~Add Look at this box interaction~~
- ~~Add Look Here locational interaction~~
- ~~Add splash of colour~~
- ~~Animate swipes~~
- ~~Fix scroll representation which is now a "drag"~~

## Writing

- ~~Work on the Acts, build up a big set~~
- ~~Contemplate Tracery? ... probably not?~~

## Sound

- Think through the sound design of standard and zen

## Actually building

- ~~Make the whole thing responsive in the OOP model~~
- ~~Create a better representation of tap size and location (as below as well I guess, just make it better)~~
- ~~Need better control over where taps (and all elements generate), e.g. x y (that is we need the idea of the Playable Area)~~
- ~~Add instructions~~
- ~~Maybe make it display in a phone ratio if you're on a wide screen thing?~~
- ~~Convert positioning to ratio~~
- **I think this works now?** ~~Make it playable on desktop if need be?~~
- ~~Make instructions disappear after some number of views?~~
- ~~Bring back Acts~~
- ~~Add sounds~~

- Add Zen Mode
- Add title screen and menu
- Maybe a back button at the top in the act zone?
- Maybe a mute button as well? Argh, buttons.
- Think about relationship of instructions to movement (swipes, drags) -- notably if you swipe up
- JSON the language (maybe consider French? Although already a bit painful)

## Issues

- **I think so anyway?** ~~Remove text selection on the page~~
- ~~Think about "modes" that correspond to specific UIs, this could build toward the bigger "ecosystem" idea~~
- ~~Think about thumb radius (most of the time UIs don't require interactions further than a thumb away?)~~
- **SEEMS TO BE SOLVED** ~~Lag on press on mobile (same as the debug view, so testable)~~
    - ~~This remains a problem after some initial testing~~
    - ~~Further testing makes me think this is a series issue, at least in p5 seems to come down to whether a conditional is evaluated or not which... seems insane to me~~
    - ~~Even further reflection has me wondering about using a different library (PixiJS?)~~
- Was being caused by the interaction being cleared but the pan still triggering ~~Crash on holding a pan at the bottom of a scroll?~~
- ~~Sometimes on mobile it gets to a state where the page scrolls instead of the ui element...~~
- ~~If you hold a pan it seems to hold over to the next interaction which feels a bit wrong? Like we need to require a touch up first? ~~
- **Eliminating this only because I don't have a scroll anymore, this may come back to haunt** ~~Also if you hold a pan it seems to manage to scroll up sometimes when you mean down or..?~~