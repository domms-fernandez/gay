//evil jumpscare of dispair
let button = document.querySelector("button");

button.addEventListener("click", () => {
  document.querySelector("img").style.display = "block";
});

//RUUUNNNN
button.addEventListener("mouseover", (e) => {
  let buttonPos = button.getBoundingClientRect();

  let pointA = Math.round(buttonPos.right * 0.5); //yYDN
  let pointB = Math.round(buttonPos.bottom * 0.5);
  
  let mouseX = e.clientX - buttonPos.left - pointA;
  let mouseY = e.clientY - buttonPos.top - pointB;

  let slope = mouseX/mouseY;
  let invSlope = mouseY/mouseX;

  if(mouseX < 0) {pointA *= -1}
  if(mouseY < 0) {pointB *= -1}
  pointA = Math.round(pointA * slope);
  pointB = Math.round(pointB * invSlope);

  if((buttonPos.right**2 + pointA**2) < (pointB**2 + buttonPos.bottom**2)) {
    button.style.left = (buttonPos.left - mouseX) + "px";
    button.style.top = (buttonPos.top - pointA) + "px";
  } else {
    button.style.left = (buttonPos.left - pointB) + "px";
    button.style.top = (buttonPos.top - mouseY) + "px";
  }
});
