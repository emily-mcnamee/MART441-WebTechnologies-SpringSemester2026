
function storyFunction(choice){
    // adding variables answer1 and 2 allows for more paths to be created in the game alongside the choices. The game will automatically update these variables as you go through the game.
    var answer1 = document.getElementById("choice1").innerHTML;
    var answer2 = document.getElementById("choice2").innerHTML;
    // If Player chooses choice1 and clicks Left, then do this, but if player choose choice2 and clicks Right, then do that.
    if (choice == 1 && answer1 == "Left") {
        document.getElementById("story").innerHTML = "The cold and glassy walls press up against you, making it awfully clausterphobic. Rock dig into your chest as the squeeze gets tighter. Too late to turn back now."
        document.getElementById("choice1").innerHTML = "Cough";
        document.getElementById("choice2").innerHTML = "Push through";
    } else if (choice == 2 && answer2 == "Right"){
        document.getElementById("story").innerHTML = "The path is slippery, water dripping from above. Your shoes' squeaks echo throughout the walls. Suddenly, your foot meets the air instead of rock and plunges down further than you expected. It appears you have stumbled across a stairway down even further in the cave."
        document.getElementById("choice1").innerHTML = "Go down."
        document.getElementById("choice2").innerHTML = "Absolutely not."
    }

}