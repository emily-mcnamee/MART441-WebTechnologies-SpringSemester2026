# Webpage and code created for MART441 - Homework 7

This assignment involves using generative AI tools for coding assisstance and debugging. I have reviewed and critically evaluated the AI-generated content and incorporated my original ideas and judgment.

## Reflection:

ChatGpt helped me with bootstrap css debugging, as well as helping me figure out how to pull the CSS into my jQuery code in order to animate it. While the AI assisted a little bit more than usual this assignment due to the bigger size of the project, most of the array work and initialization/implementation was from me using the past few assignments as my guide. AI helped in asset creation and figuring out how I can access the same function using different variables (see the function updateImages();).

I specifically kept running into positioning issues on the HTML page, as in order to animate the images they needed to be in Position: Absolute while their div container needed to be in Position: relative for the title card. It caused a lot of Bootstrap/jQuery conflicts that made it hard to determine what I had to do to fix it (I was quite particular in where everything fit). Eventually, I figured out that the jQuery animation needs to first match the css transform function if I'm going to use both, though in the future I will most likely just let the jQuery position instead of trying to fight both bootstrap and jQuery. After the initial prompt helping me animate the image portion of the project, I applied similar code to the shapes and text, as well as looking up how to rotate the stars (turns out you can't really do that with jQuery, so you have to use css instead).

I'm still not compeltely happy with how it looks, but at least the jQuery code functions which was the main purpose of the assignment anyways. 