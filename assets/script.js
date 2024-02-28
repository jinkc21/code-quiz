const timer = document.getElementById("timer");
const startBtn = document.getElementById("startBtn")
var seconds = 60;
var score = 0;

var questions = [
  {
    question: "What does CSS stand for?",
    choices: ["create solid state", "cascading style sheets", "copy single string"],
    answer: "cascading style sheets",
  }

]

// console.log(questions[0].question)

startBtn.addEventListener("click", startQuiz)


function countdown() {
  const timeInterval = setInterval(function () {
    timer.innerHTML = `${seconds} remaining`;
    seconds--;

    if (seconds === 0) {
      clearInterval(timeInterval);
      alert("You are out of time!")
    }
  }, 1000)

}


function startQuiz() {
  document.getElementById("main").style.display='none'
  countdown();
  showQuiz();
}
function showQuiz(){
  var question = document.createElement("h1")
  question.textContent= questions[0].question
  document.getElementById('quiz').appendChild(question)
for (var i=0; i<questions[0].choices.length; i++){
  // console.log(questions[0].choices[i])
  var choicesBtn = document.createElement("button")
  choicesBtn.textContent= questions[0].choices[i]
  choicesBtn.onclick = function(event){
    // console.log("hello")
    checkAnswer(event)
  }
  document.getElementById('quiz').appendChild(choicesBtn)
}

}
function checkAnswer(event) {
  if (choicesBtn.textContent === questions.answer) {
    score+=20
    console.log(score)
  };


}