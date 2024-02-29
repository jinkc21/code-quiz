const startBtn = document.getElementById("start-btn")
const nextBtn = document.getElementById("next-btn")
const questionCtnr = document.getElementById('question-container')
const questionEl = document.getElementById('question')
const answerBtn = document.getElementById('answer-btns')



let shuffledQuestions, currentQuestions

startBtn.addEventListener('click', startQuiz)
nextBtn.addEventListener('click', () => {
  currentQuestions++
  setNext()
})


function startQuiz() {
  startBtn.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestions = 0
  questionCtnr.classList.remove('hide')
  setNext()
}

function setNext() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestions])
}

function showQuestion(question) {
  questionEl.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerBtn.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextBtn.classList.add('hide')
  while (answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild)
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target
  const correct = selectedBtn.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerBtn.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if(shuffledQuestions.length > currentQuestions + 1){
      nextBtn.classList.remove('hide')
  } else {
    startBtn.innerHTML = 'Restart'
    startBtn.classList.remove('hide')
  }

}



function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('incorrect')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('incorrect')
}

const questions = [
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "create specific sample", correct: false },
      { text: "cascading style sheets", correct: true },
      { text: "copy selected string", correct: false },
      { text: "console sources security", correct: false }
    ]
  },
  {
    question: "What tag is used to render or transform text into a italics?",
    answers: [
      { text: "<strong>", correct: false },
      { text: "<em>", correct: true },
      { text: "<br>", correct: false },
      { text: "<ital>", correct: false }
    ]
  },
  {
    question: "Which of the following is NOT a commonly used element in HTML?",
    answers: [
      { text: "<body>", correct: false },
      { text: "<title>", correct: false },
      { text: "<meta>", correct: false },
      { text: "<page>", correct: true }
    ]
  },
  {
    question: "Which of the following can be used in css to show a list in a line?",
    answers: [
      { text: "display: block", correct: false },
      { text: "position: straight", correct: false },
      { text: "display: flex", correct: true },
      { text: "position: absolute", correct: false }
    ]
  },
]

// const timer = document.getElementById("timer");
// var seconds = 60;
// var score = 0;



// // console.log(questions[0].question)

// startBtn.addEventListener("click", startQuiz)


// function countdown() {
//   const timeInterval = setInterval(function () {
//     timer.innerHTML = `${seconds} remaining`;
//     seconds--;

//     if (seconds === 0) {
//       clearInterval(timeInterval);
//       alert("You are out of time!")
//     }
//   }, 1000)

// }


// function startQuiz() {
//   document.getElementById("main").style.display='none'
//   countdown();
//   showQuiz();
// }
// function showQuiz(){
//   var question = document.createElement("h1")
//   question.textContent= questions[0].question
//   document.getElementById('quiz').appendChild(question)
// for (var i=0; i<questions[0].choices.length; i++){
//   // console.log(questions[0].choices[i])
//   var choicesBtn = document.createElement("button")
//   choicesBtn.textContent= questions[0].choices[i]
//   choicesBtn.onclick = function(event){
//     // console.log("hello")
//     checkAnswer(event)
//   }
//   document.getElementById('quiz').appendChild(choicesBtn)
// }

// }
// function checkAnswer(event) {
//   if (choicesBtn.textContent === questions.answer) {
//     score+=20
//     console.log(score)
//   };

// }