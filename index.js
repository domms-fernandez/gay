//evil jumpscare of dispair
let button = document.querySelector("button");

button.addEventListener("click", () => {
  document.querySelector("img").style.display = "block";
});

//RUUUNNNN
button.addEventListener("mouseover", (e) => {
  let buttonPos = button.getBoundingClientRect();
  
  let mouseX = e.clientX - buttonPos.left;
  let mouseY = e.clientY - buttonPos.top;

  let slope = mouseX/mouseY;
  let invSlope = mouseY/mouseX;

  let pointA = 150; //yYDN
  let pointB = 200;
  if(mouseX < 0) {pointA *= -1}
  if(mouseY < 0) {pointB *= -1}
  pointA = Math.round(pointA * slope);
  pointB = Math.round(pointB * invSlope);

  if((22500 + pointA**2) < (pointB**2 + 40000)) {
    button.style.left = (buttonPos.left - mouseX) + "px";
    button.style.top = (buttonPos.top - pointA) + "px";
  } else {
    button.style.left = (buttonPos.left - pointB) + "px";
    button.style.top = (buttonPos.top - mouseY) + "px";
  }
});
