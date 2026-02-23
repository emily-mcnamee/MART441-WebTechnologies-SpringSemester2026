
// checkerboard background
const checkerboard = document.getElementById("checkerboard");

// array of image tags
var imageTags = ["image1", "image2", "image3", "image4", "image5", "image6", "image7", "image8", "image9", "image10", "image11", "image12"];
var blankImagePath = "./images/BoC.jpg";
var actualImages = new Array();

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

 
    /* 02202026: Accidentally created an infinite loop using the orignal count array [0,0]. This is due to the original array only allowing 2 index entries. 
    ChatGPT recommended changing the count array to this function instead. 
    By using the .fill(0), the count array will automatically fill as many indexes need be. */
    // create count array same size as image list
    var count = new Array(actualimagePath.length).fill(0);

    while (actualImages.length < 12){

        var randomNumber = Math.floor(Math.random() * actualimagePath.length);

        if (count[randomNumber] < 2){

            actualImages.push(actualimagePath[randomNumber]);
            count[randomNumber]++;
        }
    }
}

function flipImage(number)
{
    // flip image
    document.getElementById(imageTags[number]).src = actualImages[number];
}