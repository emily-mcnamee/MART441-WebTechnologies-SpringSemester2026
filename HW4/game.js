 function getChoice1()
        {
            var myChoice = document.getElementById("choice").value;
            var myQuestion = document.getElementById("question");

            if(myChoice === "left")
            { 
                document.getElementById("mainImage").src = "./images/Choice2.jpg"
                // display:none causes choice to go away
                document.getElementById("choice").style.display="none";
                document.getElementById("btnSubmit").style.display="none";

                // display:block lets choice2 start
                document.getElementById("choice2").style.display="inline";
                document.getElementById("btnSubmit2").style.display="inline";
                
                // choice 2 question
                myQuestion.innerHTML = "The cold and glassy walls press up against you, making it awfully clausterphobic. Rock dig into your chest as the squeeze gets tighter. Too late to turn back now. Do you try to push through?";
            }
            else if(myChoice === "right")
            { 
                document.getElementById("mainImage").src = "./images/CAVE copy.jpg"

                // get rid of choice1 display
                document.getElementById("choice").style.display="none";
                document.getElementById("btnSubmit").style.display="none";

                // start choice3
                document.getElementById("choice3").style.display="inline";
                document.getElementById("btnSubmit3").style.display="inline";

                // choice 3 question
                myQuestion.innerHTML = "The path is slippery, water dripping from above. Your shoes' squeaks echo throughout the walls. Suddenly, your foot meets the air instead of rock and plunges down further than you expected. It appears you have stumbled across a stairway down even further in the cave. Do you go down the staircase?";

            }
            else
            {
                myQuestion.innerHTML = "Invalid answer";
            }
        
        }

// left answer
function getChoice2()
        {
            var answer = document.getElementById("choice2").value;
            var myQuestion = document.getElementById("question");

            if(answer === "yes")
            {
                // get rid of choice2 display
                document.getElementById("choice2").style.display="none";
                document.getElementById("btnSubmit2").style.display="none";

                // Restart display
                document.getElementById("choice5").style.display="inline";
                document.getElementById("btnSubmit5").style.display="inline";

                // choice5 question
                myQuestion.innerHTML = "You do your best to push through the pain, but the rocks just dig in even more. Eventually you are forced to completely stop, and you do not move again. Restart?";
            }
            else if(answer === "no")
            {
                // get rid of choice2 display
                document.getElementById("choice2").style.display="none";
                document.getElementById("btnSubmit2").style.display="none";

                // Restart display
                document.getElementById("choice5").style.display="inline";
                document.getElementById("btnSubmit5").style.display="inline";

                myQuestion.innerHTML = "You try to go back, but the hallway keeps going. And going. You never get to end of the path. Restart?";
            }
            else
            {
                myQuestion.innerHTML = "Invalid answer";
            }

        }

// right answer
function getChoice3()
        { 

            var answer = document.getElementById("choice3").value;
            var myQuestion = document.getElementById("question");

            if(answer === "yes")
            {
                //document.getElementById("mainImage").src = "together.jpg"

                // get rid of choice3 display
                document.getElementById("choice3").style.display="none";
                document.getElementById("btnSubmit3").style.display="none";

                // choice 5 display
                document.getElementById("choice5").style.display="inline";
                document.getElementById("btnSubmit5").style.display="inline";

                myQuestion.innerHTML = "You try to take another step down the staircase, but then your foot slips on the wet rock. You fall down into the abyss, painfully hitting every step on the way down. You do not get back up. Restart?";
            }
            else if(answer === "no")
            {
                // get rid of choice3 display
                document.getElementById("choice3").style.display="none";
                document.getElementById("btnSubmit3").style.display="none";

                // choice 5 display
                document.getElementById("choice5").style.display="inline";
                document.getElementById("btnSubmit5").style.display="inline";

                myQuestion.innerHTML = "You turn around, expecting to go right back from where you come from. But for reason you can't find it. The room you're in is blocked off, no exit in sight. You try to find the staircase again, but that is somehow gone too. You wander endlessly. Restart?";
            }
            else
            {
                myQuestion.innerHTML = "Invalid answer";
            }

        }

//Restart function

function resetGame()
 {

    var myQuestion = document.getElementById("question");

    // Reset question text
    myQuestion.innerHTML = "You've been lost in this glacial cave for a very long time, barely able to see ahead a few feet. You see the walls split left or right.";

    // Clear all input values
    document.getElementById("choice").value = "";
    document.getElementById("choice2").value = "";
    document.getElementById("choice3").value = "";
    document.getElementById("choice5").value = "";

    // Show first choice
    document.getElementById("mainImage").src = "./images/CAVE.jpg"
    document.getElementById("choice").style.display = "inline";
    document.getElementById("btnSubmit").style.display = "inline";

    // Hide all other choices
    document.getElementById("choice2").style.display = "none";
    document.getElementById("btnSubmit2").style.display = "none";
    
    document.getElementById("choice3").style.display = "none";
    document.getElementById("btnSubmit3").style.display = "none";

    document.getElementById("choice5").style.display = "none";
    document.getElementById("btnSubmit5").style.display = "none";


 }


 // loops game back to start
function getChoice5()
        {
        var answer = document.getElementById("choice5").value.toLowerCase();

        if(answer === "yes")
        {
            resetGame();
        }
        else
        {
            document.getElementById("question").innerHTML = "Invalid answer";
        }
    }