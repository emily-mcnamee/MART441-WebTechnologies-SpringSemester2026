
// checkerboard background
const checkerboard = document.getElementById("checkerboard");

// array of image tags
var imageTags = ["image1", "image2", "image3", "image4", "image5", "image6", "image7", "image8", "image9", "image10", "image11", "image12"];
var blankImagePath = "./images/BoC.jpg";
var actualImages = new Array();
var player = {"firstname":"", "lastname":"", "age":"",};
var matchedCards = [];
var firstCard = null;
var secondCard = null;
var lockBoard = false; 
var attempts = 0;

function printBlanks(){
    createRandomArray();
    // for loop
    for(var i = 0; i < imageTags.length; i++)
        document.getElementById(imageTags[i]).src = blankImagePath;
}


    function createRandomArray(){

        var actualimagePath = [
            "./images/1.jpg",
            "./images/2.jpg",
            "./images/3.jpg",
            "./images/4.jpg",
            "./images/Queen.jpg",
            "./images/King.jpg"
        ];

        actualImages = actualimagePath.concat(actualimagePath); // duplicate
        actualImages.sort(() => Math.random() - 0.5); // shuffle

        console.log(actualImages);
    }

function flipImage(number)
{
    // stop if board is locked (return function)
    if (lockBoard) return;

    // stop if the cards are already matched
    if (matchedCards.includes(number)) return;

    // stop if you click the same card twice
    if (firstCard === number) return;

    // flip image
    document.getElementById(imageTags[number]).src = actualImages[number];

    if (firstCard === null) {
        firstCard = number;
        return;
    }

    attempts++;
    document.getElementById("attemptCounter").textContent = attempts;
    secondCard = number;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    if (actualImages[firstCard] === actualImages[secondCard]){
        matchedCards.push(firstCard);
        matchedCards.push(secondCard);

        resetTurn();

        if (matchedCards.length === actualImages.length){
            setTimeout(showFinalScreen,500);
        }
    } else {
        setTimeout(function() {
            document.getElementById(imageTags[firstCard]).src = blankImagePath;
            document.getElementById(imageTags[secondCard]).src = blankImagePath;

            resetTurn();
        }, 1000);
    }
}

    function resetTurn(){
        firstCard = null;
        secondCard = null;
        lockBoard = false;
    }

function addPlayerinfo(event){

    event.preventDefault();
        var firstName = document.getElementById("inputFirstName").value;
    //console.log(firstName);
            var lastName = document.getElementById("inputLastName").value;
    //console.log(lastName);
         var age = document.getElementById("inputAge").value;
      //console.log(age);
    player.firstname = firstName;
    player.lastname = lastName;
    player.age = age;
    localStorage.setItem("playerInfo", JSON.stringify(player));

    window.location = "game.html";
}

function showFinalScreen(){
    // Hide game board
    document.getElementById("gameBoard").style.display = "none";

    // show final screen instead
    document.getElementById("finalScreen").style.display = "flex";

    // show final attempt counter
    document.getElementById("finalAttempts").textContent = attempts;

    // bring in player info

    /*2262026 for some reason the finalMessage doesn't play, only lists the final Attempts. */
    var storedPlayer = JSON.parse(localStorage.getItem("playerInfo"));
    if (storedPlayer){
        document.getElementById("finalMessage").textContent =
        "Great job" + storedPlayer.firstname + "!";
    }
}
function playerInfo()
{
    var playerInformation = localStorage.getItem("playerInfo");
    player = JSON.parse(playerInformation);
    console.log(player);
}