const checkerboard = document.getElementById("checkerboard");
// empty array
var myViewFinderArray = [];
var lastIndex = -1;

window.onload = function () {
    initializeArray();      
    accessInformation();   
    document.body.style.zoom = "0.9"; // 90% zoom
};

class ViewFinder
{
    constructor(image, title, description, author, year)
    {
        this.image = image;
        this.title = title;
        this.description = description;
        this.author = author;
        this.year = year;
    }


toString(){
    let str;
    str =
    "<div class='artCard'>" +
        "<img src='" + this.image + "' class='artImage'>" +
        "<div class='artCaption'>" +
            "<h3>" + this.title + "</h3>" +
            "<p class='artAuthor'>" + this.author + ", " + this.year + "</p>" +
            "<p class='artDesc'>" + this.description + "</p>" +
        "</div>" +
    "</div>";

    return str;
}
    get newArt(){
        return this.title + this.description + this.author + this.year;
    }
}   

function initializeArray(){
     var myViewFinder = new ViewFinder("images/Hunger.jpg", "Hunger" , "Joyce J. Scott confronts racism, sexism, and classism in varied media. Her necklace Hunger juxtaposes hand-beaded skeletons and images of malnourished children with a large white face, critiquing global famine and white complicity." , "Joyce J. Scott" , "1991");
     var myViewFinder1 = new ViewFinder("images/Selma.jpg", "Selma" , "Barbara Pennington created this monumental painting in response to the Selma marches, drawing from media images of violence and protest in her home state of Alabama. The canvas weaves these elements into a visceral, moving scene that conveys both tragedy and collective determination. Even decades later, it remains a powerful reminder of the courage and unity sparked by the struggle for civil rights." , "Barbara Pennington" , "1965");
     var myViewFinder2 = new ViewFinder("images/Community.jpg", "Community ii" , "This work reflects on what it means to sustain a community through hardship. During the pandemic, Allston witnessed neighbors stepping in to support one another through mutual aid, revealing both pain and resilience. The piece celebrates the quiet heroism and hope found in ordinary people lifting each other in difficult times." , "Langston Allston" , "2022");
     var myViewFinder3 = new ViewFinder("images/Neon.jpg", "Neon" , "Pulse memorializes the 2016 shooting at an Orlando gay nightclub through argon pink neon, combining symbols of a rose, light, and title to evoke both mourning and remembrance. At the same time, its pulsing glow celebrates life, resilience, and community in the queer and allied population. The work transforms grief into a tribute to survival and solidarity." , "Adam Farcus and Marjorie Inman" , "2021");
     var myViewFinder4 = new ViewFinder("images/Displacement.jpg", "Displacement" , "Part of a broader ethnographic project, Displacement documents the daily lives of elderly and children left behind by China’s migrant workers. The photographs reveal how migration reshapes family life, highlighting both absence and adaptation. By focusing on those left behind, the project illuminates the human cost of one of the largest internal migrations in the world." , "Kang Sun" , "2022");
     myViewFinderArray.push(myViewFinder);
     myViewFinderArray.push(myViewFinder1);
     myViewFinderArray.push(myViewFinder2);
     myViewFinderArray.push(myViewFinder3);
     myViewFinderArray.push(myViewFinder4);
}

function accessInformation()
{
    var randomNumber;

    // reroll until the number is different from the previous one
    do {
        randomNumber = Math.floor(Math.random() * myViewFinderArray.length);
    } while (randomNumber === lastIndex);

    lastIndex = randomNumber;

    document.getElementById("newArt").innerHTML =
        myViewFinderArray[randomNumber].toString();
}
