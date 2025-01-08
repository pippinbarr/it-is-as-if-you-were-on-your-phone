# Journal

## Starting point (2025-01-07)

Took some time to think about this by making notes in Things on my phone:

> Points for duration  
> Popping bubbles as typing   
> Precision scrolling  
> Taps and double taps  
> Swiping left and right  
> Don’t fixate too much on it being realistic, just cycling through those ideas  
> Plus emotional instructions  
> Pauses/waits  
> Taps in other places on the screen  
> Game like interactions? Angry birds, fruit ninja, etc? Associated emotions or just random? > I think random right? What is the general affect of a phone user? Take notes. Occasional > smile but mostly dead looking or serious or furrowed?  
> Is there a game over?  
> Are there leaderboards?  
> Can you quit?  
> Keep it fucking simple?  
> Double tap bubble style  
> Some kind of minimalist abstract language of input  

Made a p5 template project which is where we are now. I'll start with that assumption and go from there.

Question: what to do about desktop? Have "it is as if you were on your computer" too which the same stuff but some different interactions? Yes makes sense. But separate projects I suppose. One after the other. Phone first because it's funnier. Computer one is the opposite of Boss Mode which is fun.

## Getting it together (2025-01-07)

While I have a couple of moments let me think some more about the interactions/structure here. I will do a few sketches tomorrow to figure out some of the shape as well.

### Structure

- Intro screen with the title, and then maybe a button for instructions and a button for playing, and maybe a "high score" listed on that front page (assuming the simplest version where people just try to beat their own score rather than a leaderboards thing which sounds like probably the wrong effort/reward? Especially if it's easily hackable and thus kinda pointess)
- Instructions screen that may or may not actually be needed? But could be about how you perform the different interactions like tapping circles, dragging other things, etc. The objectives of the game etc.
- Game screen itself which shows the stuff, has your points building up somewhere and otherwise relatively abstract shapes etc. used to define what you do (see below)
- Game over screen (how would you have a game over though? I guess some kind of timer that triggers at a LACK of interaction and the screen starts going red or whatever as if you're dying, hahaha, and then the game ends after... whatever... five to ten seconds of non-interaction. Love it.) **Meta note here:** classic example of design happening/falling out of some more structured activity like designing screens. In talking about the game over screen you think about what game over is and design it there in that moment.

### Interactions

I probably need to sit with my phone for a bit to truly taxonomize this, and also observe other people, but as a starting point (which if we're being honest is *probably* going to end up being good enough as phones aren't that complex and I'm not really trying to precisely reproduce recognizable apps or anything)

- Bubbles/circles that you tap to dismiss (sound effect?)
    - These can be used to simulate typing (if we cluster them down the bottom and have them kind of repeatedly respawn to allow for a rapid typing motion)
    - These can also be used for any taps we want on the main screen itself as if you're selecting stuff in an app etc.
- Double-bubbles?
    - As in some notation that indicates you should double tap. Just thinking of something like liking an image on Instagram, though it's true that's the *only* double tap I can even immediately think of in that context? Would want some way to indicate it, like a double circle button and you pop the outer and then the inner
- Swipes
    - Most obviously left and right as in a matching app, need to think about look at how this work in terms of whether it's like you're "throwing" or more precisely dragging? Do I need to get into that level of sophistication? Should I distinguish between dragging and swiping at the basic level? Or allow both behaviours to be selected by the player on the same element?
    - One obvious UI element here is the way a slider works, press down to select the handle, drag it to the indicated position, release (much as in It is as if you were playing chess - mentioning that makes me note that there's a failure state there - does the element just reset?)
    - But if it's about a "throw" style of thing maybe a ball with an arrow and you're meant to just physically flick it off the screen rather than drag it? Will this start to get confusion? This is what sketching it for eh
- Scrolls
    - To the extent that doom scrolling is a big thing it obviously gotta be in there, any scrolling, doom or nondoom or predoom
    - I think these can be pretty precise, so they work well with the slider model probably
- Pinches/two finger interactions
    - Pinch in and pinch outs
    - I guess two shapes that you grab and drag into a circle or out of a circle? This one sounds a little informationally dense and might be hard to represent? Unsure about that one...
    
Are those the main ones?

### Sequencing

And then there's the question of sequencing. I don't like the idea of *simulating* a specific app experience, but I think it's true that there are kind of higher level organizatinos that are worth preserving right? Like swipe down then double tap, swipe down then double tap (Instagram where you're liking pictures), or swipe right, scroll down, swipe left, etc... (and note that these could *potentially* be paired with emotion/face notes... but it may be best not to... I can feel this very real tension around whether I'm implying a narrative/real use or not - **note** that this seems key to me and that as of right now my heart/mind lies with the idea of NOT trying to do any simulation)

What are some of the larger organizational units we might think about (more and more this is seeming like I need some sort of small field study - if only of myself - of using apps and seeing what the behaviour is over time?)

- Instagram - scrolling down interspersed with (double? doesn't have to be) tapping, maybe even commenting
- Matching - swiping left/right pairs with scrolling (through a profile? I literally don't know how this software works - do you even scroll up/down in it??? I have asked Femke, but I can also just get one of these apps I guess -- **later** she reports in that you go left/right for no-match/match, up fast for super-like, up slow for scrolling the profile)
- Reading the news/internet more generally? Scrolling, tapping, scrolling more... but a slower kind of scrolling I suppose; could arguably involve back swiping to change to previous page, but that's seeming more simulation-y
- Settings? Where you're kind of tapping through a hierarchical menu... e.g. just a sequence of taps and scrolls... I guess that's basically just the previous one though so maybe that doesn't matter
- Match-3 game: targeted small swipes all over the screen
- Angry Birds: targets small swipes at edge, followed by extensive waiting (too extensive really for the purpose)

### Who are you trying to fool?

In amongst all this, a key question: WHO is meant to be fooled? Not the player, they're meant to *look like they're on their phone* which means mostly just a cursory glance from someone on the metro. But COULD mean they're at home or at a party looking busy which might get more scrutiny. But still, it's not like you ever look at anyone and think you know what they're doing? Maybe matching swipes. Or games.

This is where the sort of metanarrative of the game comes in I guess. Much as in the previous two... the idea that it's a *tool* with a *purpose*. In this case my working theory (which I really like) is that it's a tool both to look like you're on your phone (and so a NORMAL PERSON) but also to NOT be on your phone and thus not subject to the abject terrors and punishments of social media and the news and so on... but then of course to ACTUALLY STILL BE ON YOUR PHONE in terms of shutting out the world, hunching, wasting time... but then maybe arguably to ACTUALLY BE MEDITATING??? Ha ha... haaaa? What if...

### The game-iness

A part of all this is that we have a game layer. You score points for

- Duration
- Successful interactions

And I suppose that's all. And that's plenty. Could be really juicy, could be restrained. Unclear for right now. Kind of funny the juicier it is, but the juicier it is the less I can buy into the meditation story... which I do actually quite enjoy?

### Emotional guide; face notes

There's the component of this that refers back to It is as if you were playing chess, which is guidance on how to compose yourself physically, and most obviously facially (though because I just wrote "physically" I'm realizing that postural changes work pretty well here too). I don't think these need to be connected to the interactions - you can smirk, frown, raise an eyebrow, be dead-faced (the most common note, haha) to anything any content any interaction. But this is an important bit for the "urban camouflage" idea involved in this.

God, this is actually pretty good? I'm talking myself into this pretty hard right now. Ah, young love.

## Early sketching (2025-01-08)

The resolution on this image sucks, but it's still legible I think. Or not? Maybe click to view? Struggling with just how terrible it is...

[![](./images/2025-01-08-sketching.png)](./images/2025-01-08-sketching.png)

Next step is some prototyping, indeed.