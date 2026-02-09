
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
        document.getElementById("choice1").innerHTML = "Go down"
        document.getElementById("choice2").innerHTML = "Absolutely not."
    } else if (choice == 1 && answer1 == "Go down") {
        document.getElementById("story").innerHTML = "You try to take another step down the staircase, but then your foot slips on the wet rock. You fall down into the abyss, painfully hitting every step on the way down. You do not get back up. ";
        document.getElementById("choice1").innerHTML = "Restart?";
        document.getElementById("choice2").innerHTML = "I think I'm satified with that.";
    } else if (choice == 2 && answer1 == "Push through"){
        document.getElementById("story").innerHTML = "You do your best to push through the pain, but the rocks just dig in even more. Eventually you are forced to completely stop, and you do not move again.";
        document.getElementById("choice1").innerHTML = "Restart?";
        document.getElementById("choice2").innerHTML = "I think I'm satified with that.";
    } else if (choice == 1 && answer1 == "Cough") {
        document.getElementById("story").innerHTML = "You cough to get rid of the excess air in your chest, making it just a bit easier to squeeze through. But the hallway keeps going. And going. The walls close in even more. You couldn't breathe in even if you wanted to. You never get to end of the path.";
        document.getElementById("choice1").innerHTML = "Restart?";
        document.getElementById("choice2").innerHTML = "I think I'm satified with that.";
    } else if (choice == 2 && answer2 == "Absolutely not."){
        document.getElementById("story").innerHTML = "You turn around, expecting to go right back from where you come from. But for reason you can't find it. The room you're in is blocked off, no exit in sight. You try to find the staircase again, but that is somehow gone too. You wander endlessly.";
        document.getElementById("choice1").innerHTML = "Restart?";
        document.getElementById("choice2").innerHTML = "I think I'm satisfied with that.";
    } else if (choice == 1 && answer1 == "Restart?"){
        document.getElementById("story").innerHTML = "You've been lost in this glacial cave for a very long time, barely able to see ahead a few feet. You see the walls split left or right.";
        document.getElementById("choice1").innerHTML = "Left";
        document.getElementById("choice2").innerHTML = "Right";
    } else if (choice == 2 && answer2 == "I think I'm satified with that."){
        document.getElementById("story").innerHTML = "Goodnight.";

    }
}