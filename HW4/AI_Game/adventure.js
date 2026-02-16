// Game state variables
let currentScene = 1;
let health = 100;
let gameOver = false;

// Function that RETURNS a value
function changeHealth(amount)
{
    health += amount;

    // While loop requirement
    while (health > 100)
    {
        health = 100;
    }

    return health;
}

// Function that updates image + background style
function updateScene(text, imageUrl, bgColor)
{
    document.getElementById("storyText").innerHTML = text;
    document.getElementById("sceneImage").src = imageUrl;
    document.body.style.backgroundColor = bgColor;
}

// Main decision function (takes parameter)
function processChoice(choice)
{
    if (currentScene === 1)
    {
        if (choice === "north")
        {
            currentScene = 2;
            updateScene(
                "You find a river. Swim or build a raft?",
                "https://picsum.photos/400/250?random=2",
                "lightblue"
            );
        }
        else if (choice === "south")
        {
            currentScene = 3;
            updateScene(
                "A wolf appears! Fight or run?",
                "https://picsum.photos/400/250?random=3",
                "lightgray"
            );
        }
        else
        {
            alert("Invalid choice.");
        }
    }

    else if (currentScene === 2)
    {
        switch(choice)
        {
            case "swim":
                changeHealth(-30);
                currentScene = 4;
                updateScene(
                    "You barely survive the cold water. Enter the cave or rest?",
                    "https://picsum.photos/400/250?random=4",
                    "darkblue"
                );
                break;

            case "raft":
                currentScene = 5;
                updateScene(
                    "You safely cross. Climb the hill or follow the path?",
                    "https://picsum.photos/400/250?random=5",
                    "green"
                );
                break;

            default:
                alert("Invalid choice.");
        }
    }

    else if (currentScene === 3)
    {
        if (choice === "fight")
        {
            changeHealth(-50);
            endGame("You defeated the wolf but died from injuries.");
        }
        else if (choice === "run")
        {
            currentScene = 5;
            updateScene(
                "You escaped! Climb the hill or follow the path?",
                "https://picsum.photos/400/250?random=6",
                "green"
            );
        }
        else
        {
            alert("Invalid choice.");
        }
    }

    else if (currentScene === 4)
    {
        if (choice === "enter")
        {
            endGame("You found treasure! You win!");
        }
        else if (choice === "rest")
        {
            endGame("You froze while resting. Game over.");
        }
    }

    else if (currentScene === 5)
    {
        if (choice === "climb")
        {
            endGame("You see civilization in the distance. You win!");
        }
        else if (choice === "follow")
        {
            endGame("The path leads nowhere. You are lost forever.");
        }
    }
}

// Function to process textbox input
function processInput()
{
    if (gameOver) return;

    let input = document.getElementById("userInput").value.toLowerCase();
    document.getElementById("userInput").value = "";

    processChoice(input);
}

// End game function
function endGame(message)
{
    gameOver = true;
    updateScene(
        message + " Click restart to play again.",
        "https://picsum.photos/400/250?random=7",
        "black"
    );

    document.getElementById("storyText").style.color = "white";
}

// Restart function
function restartGame()
{
    currentScene = 1;
    health = 100;
    gameOver = false;

    document.getElementById("storyText").style.color = "black";

    updateScene(
        "You wake up in a dark forest. Do you go north or south?",
        "https://picsum.photos/400/250?random=1",
        "white"
    );
}