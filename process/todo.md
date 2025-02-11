# To-do

## Big questions

- Zen versus Social Camouflage?
    - What about "Zen Mode" as a thing; it makes total sense
    - Gongs and Acts that are meditative and more spaced out
- Words versus Icons for communicating tasks?
    - I'd assumed icons were better (more attractive), but is there a power to the blankness and clarity of words? A lack of glamour?

## Research

- ~~Spend some time on my phone just trying to see typical interactions and interaction clusters and interaction sequences~~

- Spend time in specific apps and take notes on typical interaction
    - Instagram
    - Browser
    - TikTok
    - Facebook
    - Messages
    - BlueSky/generic social media?
    - Discord/Slack
    - This is likely more important for when I'm working on the suite?

## Visual design

- ~~Do some sketches of how this could look in terms of the actual screens and most especially the interaction indicators~~
- ~~Make some visual prototypes in Keynote or similar~~
- ~~How to indicate "swipe" and "scroll" ~~
    - **Yes but only for now** ~~Is this sort of "fixed for now" with the arrow plus scrollbar?~~

- Make more visual prototypes
- The bigger question of language and/or symbols

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

- Bring in Instagram (incl. double tap)

## Actually building

- ~~Make the whole thing responsive in the OOP model~~

## Issues

- **I think so anyway?** ~~Remove text selection on the page~~
- ~~Think about "modes" that correspond to specific UIs, this could build toward the bigger "ecosystem" idea~~
- ~~Think about thumb radius (most of the time UIs don't require interactions further than a thumb away?)~~
- **SEEMS TO BE SOLVED** ~~Lag on press on mobile (same as the debug view, so testable)~~
    - ~~This remains a problem after some initial testing~~
    - ~~Further testing makes me think this is a series issue, at least in p5 seems to come down to whether a conditional is evaluated or not which... seems insane to me~~
    - ~~Even further reflection has me wondering about using a different library (PixiJS?)~~
- Was being caused by the interaction being cleared but the pan still triggering ~~Crash on holding a pan at the bottom of a scroll?~~

- If you hold a pan it seems to hold over to the next interaction which feels a bit wrong? Like we need to require a touch up first? 
- Also if you hold a pan it seems to manage to scroll up sometimes when you mean down or..?
- Need better control over where taps (and all elements generate), e.g. x y