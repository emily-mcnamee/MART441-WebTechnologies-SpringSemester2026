let courage = 0; // variable

function choosePath(choice) {
  let storyText = "";
  let image = "";

  if (choice === 1) {
    courage += 1; // addition
    storyText = "You step into the dark path and discover a hidden cave. Your bravery grows.";
    image = "cave.jpg";
  } 
  else if (choice === 2) {
    courage += 2;
    storyText = "You follow the river and find fresh water and glowing fireflies guiding you forward.";
    image = "river.jpg";
  } 
  else if (choice === 3) {
    courage += 3;
    storyText = "You climb the hill and see the entire forest below. Hope fills your heart.";
    image = "hill.jpg";
  }

  // DOM updates
  document.getElementById("story").textContent = storyText;
  document.getElementById("sceneImage").src = image;
  document.getElementById("score").textContent =
    "Courage: " + courage; // concatenation
}