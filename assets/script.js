const timer = document.getElementById("timer");
const startBtn = document.getElementById("startBtn")
const startingMinutes = 5;
let time = startingMinutes * 60;

startBtn.addEventListener("click", countdown)


function countdown() {
  const minutes = Math.floor(time/60);
  let seconds = time % 60;
  const timeInterval = setInterval(function() {
  timer.innerHTML = `${minutes}: ${seconds}`;
  time--;

  if (time === 0) {
    clearInterval(timer);
   alert("You are out of time!")
  }
  },1000)
}

