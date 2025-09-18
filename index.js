let img = document.querySelector("img");
let button = document.getElementById("center");
let allButtons = document.querySelectorAll("button");
let scream = new Audio("/gay/howie.mp3");

function repositionButtons() {
  let buttonPos = button.getBoundingClientRect();
  for(let i = 0; i < allButtons.length; i++) {
    if(allButtons[i].id == "center") i++;
    if(allButtons[i].id == "left") {
      allButtons[i].style.left = buttonPos.left - window.innerWidth;
      allButtons[i].style.top = buttonPos.top;
    }
    else if(allButtons[i].id == "right") {
      allButtons[i].style.left = buttonPos.left + window.innerWidth;
      allButtons[i].style.top = buttonPos.top;
    }
    else if(allButtons[i].id == "up") {
      allButtons[i].style.left = buttonPos.left;
      allButtons[i].style.top = buttonPos.top - window.innerHeight;
    }
    else if(allButtons[i].id == "down") {
      allButtons[i].style.left = buttonPos.left;
      allButtons[i].style.top = buttonPos.top + window.innerHeight;
    }
  }
}
    

for(let i = 0; i < allButtons.length; i++) {
  //evil jumpscare of despair
  allButtons[i].addEventListener("click", () => {
    if(img.style.display == "block") return;
    img.style.display = "block";
    scream.play().then(() => {img.style.display = "none";});
  });


  //RUUUNNNN
  allButtons[i].addEventListener("mousemove", (e) => {
    let buttonPos = allButtons[i].getBoundingClientRect(); //x and y of button

    let pointA = {x: Math.round(allButtons[i].clientWidth * 0.5) + 2,  y: 0}; //the x value if it intercepts the side lines,
    let pointB = {y: Math.round(allButtons[i].clientHeight * 0.5) + 2, x: 0}; //and the y value for the top and bottom lines.
                                                                     //incidently 1/2 width/height of the button
  
    //mouse X and Y relative to the center point of the button, which is (0, 0)
    let mouseX = e.clientX - buttonPos.left - pointA.x;
    let mouseY = e.clientY - buttonPos.top - pointB.y;

    let slope = mouseY/mouseX;

    if(mouseX < 0) {pointA.x *= -1; pointA.x--;} //calculate intersection on the side of the button that is moving
    if(mouseY < 0) {pointB.y *= -1; pointB.y--;} //away from the mouse, so it doesn't clip across the screen

    //complete points of intersection
    pointA.y = Math.round(slope * pointA.x);
    pointB.x = Math.round(pointB.y / slope);

    //pythagoras mothafucka!
    if((pointA.x**2 + pointA.y**2) < (pointB.x**2 + pointB.y**2)) {
      let movementLeft = buttonPos.left - (pointA.x - mouseX);
      if(movementLeft < 0) movementLeft += window.innerWidth;
      if(movementLeft > window.innerWidth) movementLeft -= window.innerWidth;
      button.style.left = movementLeft;

      let movementTop = buttonPos.top - (pointA.y - mouseY);
      if(movementTop < 0) movementTop += window.innerHeight;
      if(movementTop > window.innerHeight) movementTop -= window.innerHeight;
      button.style.top = movementTop;
    } else {
      let movementLeft = buttonPos.left - (pointB.x - mouseX);
      if(movementLeft < 0) movementLeft += window.innerWidth;
      if(movementLeft > window.innerWidth) movementLeft -= window.innerWidth;
      button.style.left = movementLeft;

      let movementTop = buttonPos.top - (pointB.y - mouseY);
      if(movementTop < 0) movementTop += window.innerHeight;
      if(movementTop > window.innerHeight) movementTop -= window.innerHeight;
      button.style.top = movementTop;
    }
    repositionButtons();
  });
}
