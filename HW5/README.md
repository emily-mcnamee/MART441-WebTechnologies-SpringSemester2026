# Webpage and code created for MART441 - Homework 5

This assignment involves using generative AI tools for debugging. I have reviewed and critically evaluated the AI-generated content and incorporated my original ideas and judgment. Times when AI was used will be labelled and highlighted in the code with a developer's comment (Line 33 in game.js.)

### Reflection Questions:

The ChatGPT Game's logic seems sound, and I am beginning to understand the javascript a little bit better with each assignment; I've been able to glean a lot of information from asking the AI why it chose to use certain code and functions over other decisions. This time around, the language model created its shuffle function with what it called the 'Fisher-Yates shuffle algorithm', which is apparently the "best" or at least "default" equation to create a shuffling mechanic in javascript.

Fisher-Yates shuffle algorithm: 
Math.floor(Math.random() * (i + 1));

ChatGPT's Shuffle Code:
    for (var i = actualArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = actualArray[i];
        actualArray[i] = actualArray[j];
        actualArray[j] = temp;
    }

As this is apparently the method that is broadly used in real applications so I would probably change my own code to match it, albeit to fit what I already have. 

As i previously mentioned, the LM's code seems sound, however it first appeared to be nonfunctional despite the consol log saying there was no conflicts. I deduced that the problem could be that it was trying to use images from the web that had broken links or no longer existed, so I went back and replaced the links. Luckily I was correct, as the website ran perfectly fine upon reloading it. 

Asesthetically Im not a major fan of the AI's game design. It's incredibly simplistic and barebones, with very little html/css added to make it look appealing. While the javascript itself was functional (and professional grade), I think my layout with much more aesthetically pleasing. Oddly enough, my game also runs smoother, while the AI's game seems to either lag or stutter. Im not too sure why this is, perhaps the image links need to be loaded in each time and modified to fit into each box,making the webpage react slower to user interaction. Comparitively, I used small jpeg images that are already saved locally in the webpage code itself, making the page run much faster with no lag or stuttering. 