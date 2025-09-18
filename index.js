let img = document.querySelector("img");
let button = document.querySelector("button");
let scream = new Audio("/gay/howie.mp3");

//evil jumpscare of despair
button.addEventListener("click", () => {
  if(img.style.display == "block") return;
  img.style.display = "block";
  scream.play();
  setTimeout(() => {img.style.display = "hidden";}, 6000);
});

//RUUUNNNN
button.addEventListener("mousemove", (e) => {
  let buttonPos = button.getBoundingClientRect(); //x and y of button

  let pointA = {x: Math.round(button.clientWidth * 0.5) + 4,  y: 0}; //the x value if it intercepts the side lines,
  let pointB = {y: Math.round(button.clientHeight * 0.5) + 4, x: 0}; //and the y value for the top and bottom lines.
                                                                 //incidently 1/2 width/height of the button
  
  //mouse X and Y relative to the center point of the button, which is (0, 0)
  let mouseX = e.clientX - buttonPos.left - pointA.x;
  let mouseY = e.clientY - buttonPos.top - pointB.y;

  let slope = mouseY/mouseX;

  if(mouseX < 0) {pointA.x *= -1;} //calculate intersection on the side of the button that is moving
  if(mouseY < 0) {pointB.y *= -1;} //away from the mouse, so it doesn't clip across the screen

  //complete points of intersection
  pointA.y = Math.round(slope * pointA.x);
  pointB.x = Math.round(pointB.y / slope);

  //pythagoras mothafucka!
  if((pointA.x**2 + pointA.y**2) < (pointB.x**2 + pointB.y**2)) {
    button.style.left = buttonPos.left - (pointA.x - mouseX) + 1;
    button.style.top = buttonPos.top - (pointA.y - mouseY) + 1;
  } else {
    button.style.left = buttonPos.left - (pointB.x - mouseX);
    button.style.top = buttonPos.top - (pointB.y - mouseY);
  }
});
