
var textArray = [];
var imageArray = [];
var shapeArray = [];

function initializeImageArray() {
    //images
    imageArray.push("./images/Dream1.png");
    imageArray.push("./images/Dream2.png");
    imageArray.push("./images/Dream3.png");
    imageArray.push("./images/Dream4.png");
    imageArray.push("./images/Dream5.png");
    imageArray.push("./images/Dream6.png");
    imageArray.push("./images/Dream8.png");
    imageArray.push("./images/Dream9.png");
    imageArray.push("./images/Dream10.png");

    //shapes
    shapeArray.push("star");
    shapeArray.push("star2");

    //phrases
    textArray.push("Stay soft");
    textArray.push("Keep your head in the clouds");
    textArray.push("What do your dreams say?");
    textArray.push("Sometimes, a dream is just that")
    textArray.push("Do machines dream of electric sheep?")

}

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function updateContent() {
    var img1 = getRandom(imageArray);
    var img2 = getRandom(imageArray);

    var shape1 = getRandom(shapeArray);
    var shape2 = getRandom(shapeArray);
    var shape3 = getRandom(shapeArray);

    var text1 = getRandom(textArray);
    var text2 = getRandom(textArray);

    console.log(img1, img2);

    $("#image1").animate({ left: "70%", opacity: 0 }, 500, function(){
        $(this)
            .attr("src", img1)
            .css("left", "30%")
            .animate({ left: "50%", opacity: 1 }, 500);
    });

    $("#image2").animate({ left: "-200px", opacity: 0 }, 500, function(){
        $(this)
            .attr("src", img2)
            .css("left", "200px")
            .animate({ left: "0px", opacity: 1 }, 500);
    });

    // Shapes
    $("#shape1").attr("class", "shape " + shape1);
    $("#shape2").attr("class", "shape " + shape2);
    $("#shape3").attr("class", "shape " + shape3);

    // Text
    $("#text1").text(text1);
    $("#text2").text(text2);
}

$(document).ready(function(){

    initializeImageArray();

    updateContent();
    movetext();
    moveStar();


    $("button").click(function(){
        updateContent();

    $("#third").fadeOut();
    });
});

    function movetext(){
        $("#text1").animate({ top: "200px" }, 1000, "swing").animate({ top: "100px" }, 1000, "swing", movetext);
        $("#text2").animate({ bottom: "200px" }, 1000).animate({ bottom: "100px" }, 1000, movetext); // loop
    }

function moveStar() {
    $("#shape3")
        .animate({ right: "20px", bottom: "20px" }, 1000)
        .animate({ right: "60px", bottom: "20px" }, 1000)
        .animate({ right: "60px", bottom: "60px" }, 1000)
        .animate({ right: "20px", bottom: "60px" }, 1000, moveStar);
}