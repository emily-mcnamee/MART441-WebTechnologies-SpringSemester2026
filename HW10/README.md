# Webpage and code created for MART441 - Homework 12

This assignment involves using generative AI tools for coding assisstance and debugging. I have reviewed and critically evaluated the AI-generated content and incorporated my original ideas and judgment.


## Reflection:

For this assignment, I used a combination of resources to make the assignment. As usual, I started with the week's example modules to use as a skeleton of the assignment. Then, I started pulling code from an older project repository for MART120 as the assignment reminded me of an older project that I did. Using the older repository I was able to remember how to code a bounding box for the squares to stay inside the canvas, looping movement for the NPC square, and collision sensing. I found a couple of forum resources that helped me with the audio control using javascript and some bootstrap help. I had a bit of trouble with plugging the class constructors into the javascript, and using those variables in creating the "growth animation" and changing the background when it senses the collision. The LLM was used as well with the getKey(event, isDown) function and setting it up to listen when the keys are pressed, however whatever changed within the code also broke the setIntervel function so more coding had to be done to figure out how to make the movement smoother. The LLM was also used in helping debug and plug in the variables from the class conductors into other functions as I kept forgetting myself and breaking the webpage, as well as making the code more efficient in certain areas; such as including Math.() functions in order to make animations and movement at a constant rate. 

Altogether, I think I created a basic start to a game like Pong or Peggle; where you need to bounce a ball to break blocks. With a little more time I would probably limit the character to only move left or right, the bouncing object more ball-like and a fail-state where the ball can't hit the gutter space behind the player character. I am quite happy with how it came out, however I think the drawSquare() function could probably be cleaned up some. 

Toby Fox - Undertale Soundtrack Reuploaded - Internet Archive:
https://archive.org/details/undertaleost_202004/Undertale+-+Lossless+Soundtrack+(toby+fox)/toby+fox+-+UNDERTALE+Soundtrack+-+42+Thundersnail.flac

HTML 5 Background Audio looper fix resource link:
https://stackoverflow.com/questions/3273552/html5-audio-looping

