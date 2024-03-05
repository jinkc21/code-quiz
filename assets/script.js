// variables
const startBtn = document.getElementById("start-btn")
const nextBtn = document.getElementById("next-btn")
const submitBtn = document.getElementById("submit-btn")
const questionCtnr = document.getElementById('question-container')
const questionEl = document.getElementById('question')
const answerBtn = document.getElementById('answer-btns')
const scoreEl = document.getElementById('score')
const highScoreEl = document.getElementById('high-score')
const totalScoreEl = document.getElementById('total-score')
const correctAnswersEl = document.getElementById('correct-answers')
const quizHeader = document.getElementById('quiz-header')
const results = document.getElementById('results')
const inputInitials = document.getElementById('input-initials')
const correctBox = document.getElementById('correct-box')
const incorrectBox = document.getElementById('incorrect-box')

const highScores = JSON.parse(window.localStorage.getItem('User Initials and Score') || '[]')
console.log(highScores)

// sets timer
const timer = document.getElementById("timer");
var seconds = 100;
var timeInterval;
var timeElapsed = 0;

function countdown() {
  timeInterval = setInterval(function () {
    timer.innerHTML = `${seconds} seconds remaining`;
    seconds--;
    timeElapsed++;

    if (seconds <= 0) {
      clearInterval(timeInterval);
      alert("You are out of time!");
      renderScore();
      submitBtn.classList.remove('hide');
      results.classList.remove('hide');
      correctBox.classList.add('hide')
      incorrectBox.classList.add('hide')
      resetState()

    }
  }, 1000)
}

function stopTimer() {
  clearInterval(timeInterval);
}

// starts quiz
let shuffledQuestions
let currentQuestions = 0
var correctAnswers = 0

startBtn.addEventListener('click', startQuiz)
nextBtn.addEventListener('click', () => {
  currentQuestions++
  setNext()
})


function startQuiz() {
  countdown();
  startBtn.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestions = 0
  questionCtnr.classList.remove('hide')
  quizHeader.classList.remove('hide')
  setNext()
}

function setNext() {
  resetState()
  answerBtn.classList.remove('hide')
  showQuestion(shuffledQuestions[currentQuestions])
  incorrectBox.classList.add('hide')
  correctBox.classList.add('hide')
}

function showQuestion(question) {
  questionEl.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.setAttribute('value', answer.correct)
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
  var answer = questions[currentQuestions].answers
  const selectedBtn = e.target
  answerBtn.classList.add('hide')
  if (selectedBtn.value === 'false') {
    seconds -= 5;
    incorrectBox.classList.remove('hide');
  }
  if (selectedBtn.value === 'true') {
    scoreCount += 5;
    correctAnswers += 1;
    correctBox.classList.remove('hide')
  }
  const correct = selectedBtn.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerBtn.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestions + 1) {
    nextBtn.classList.remove('hide');
  } else {
    stopTimer();
    renderScore();
    submitBtn.classList.remove('hide');
    results.classList.remove('hide');
    correctBox.classList.add('hide')
    incorrectBox.classList.add('hide')
    resetState()
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('incorrect');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('incorrect');
}

// renders score
var totalScore = 0;
var scoreCount = 0;
var highScore = window.localStorage.getItem("High Score");
highScoreEl.textContent = highScore

function renderScore() {
  totalScore = seconds + scoreCount;
  totalScoreEl.innerText = totalScore;
  correctAnswersEl.innerText = correctAnswers
}
submitBtn.addEventListener('click', submitQuiz)

// submits quiz results and logs score
function submitQuiz(event) {
  event.preventDefault()
  if (!inputInitials.value) {
    alert("Please enter your initials")
  }
  else {

    var initialsScore =
    {
      initials: inputInitials.value,
      score: totalScore
    }

    highScores.push(initialsScore)
    window.localStorage.setItem("User Initials and Score", JSON.stringify(highScores));

    if (totalScore > highScore) {
      window.localStorage.setItem("High Score", JSON.parse(totalScore));
    }
    location.reload();
  };
  }
    //   var initials = inputInitials.value;
    //   var score = totalScore;

  // saveScores()


// let topScores = document.getElementById("top-scores");
// function saveScores() {
//   for (var i = 0; i < highScores.length; i++) {
//     let li = document.createElement('li')
//     li.innerText = highScores[i].initials + " " + highScores[i].score;
//     topScores.appendChild(li);
//   }
// }


// array of questions
const questions = [
  {
    question: "What is the correct syntax for referring to an external script called 'app.js'?",
    answers: [
      { text: "<script href='app.js'>", correct: false },
      { text: "<script src='app.js'>", correct: true },
      { text: "<script name='app.js'>", correct: false },
      { text: "<script file='app.js'>", correct: false }
    ]
  },
  {
    question: "How do you create a function in JavaScript?",
    answers: [
      { text: "function = myFunction()", correct: false },
      { text: "function myFunction()", correct: true },
      { text: "function:myFunction()", correct: false },
      { text: "create myFunction()", correct: false }
    ]
  },
  {
    question: "Which method is used to add an element at the end of an array?",
    answers: [
      { text: "array.pop(element)", correct: false },
      { text: "array.unshift(element)", correct: false },
      { text: "array.shift(element)", correct: false },
      { text: "array.push(element)", correct: true }
    ]
  },
  {
    question: "How can a JavaScript variable be declared conditionally?",
    answers: [
      { text: "var x if (condition)", correct: false },
      { text: "if (condition) var x", correct: false },
      { text: "var x = (condition) ? value1 : value2", correct: true },
      { text: "condition(var x)", correct: false }
    ]
  },
  {
    question: "How do you write a conditional statement for executing some statements only if i is NOT equal to 5?",
    answers: [
      { text: "if (i <> 5)", correct: false },
      { text: "if i =! 5 then", correct: false },
      { text: "if (i != 5)", correct: true },
      { text: "if (i !== 5)", correct: false }
    ]
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    answers: [
      { text: "*", correct: false },
      { text: "-", correct: false },
      { text: "=", correct: true },
      { text: "+", correct: false }
    ]
  },
  {
    question: "Which function of an Array object calls a function for each element in the array?",
    answers: [
      { text: "forEach()", correct: true },
      { text: "every()", correct: false },
      { text: "forEvery()", correct: false },
      { text: "each()", correct: false }
    ]
  },
  {
    question: "What is the correct way to write a JavaScript array?",
    answers: [
      { text: "var colors = (1:'red', 2:'green', 3:'blue')", correct: false },
      { text: "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')", correct: false },
      { text: "var colors = 'red', 'green', 'blue'", correct: false },
      { text: "var colors = ['red', 'green', 'blue']", correct: true }
    ]
  },
  {
    question: "Which method converts JSON data to a JavaScript object?",
    answers: [
      { text: "JSON.toString()", correct: false },
      { text: "JSON.toObject()", correct: false },
      { text: "JSON.parse()", correct: true },
      { text: "JSON.stringify()", correct: false }
    ]
  },
  {
    question: "How does a for loop start?",
    answers: [
      { text: "for (i = 0; i <= 5)", correct: false },
      { text: "for (i <= 5; i++)", correct: false },
      { text: "for (i = 0; i <= 5; i++)", correct: true },
      { text: "for (i++)", correct: false }
    ]
  },
  {
    question: "What does the this keyword refer to in a JavaScript method?",
    answers: [
      { text: "The global object", correct: false },
      { text: "The object that owns the method", correct: true },
      { text: "The document object", correct: false },
      { text: "The window object", correct: false }
    ]
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    answers: [
      { text: "onchange", correct: false },
      { text: "onclick", correct: true },
      { text: "onmouseover", correct: false },
      { text: "onmouseclick", correct: false }
    ]
  },
  {
    question: "Which method is used to serialize an object into a JSON string in JavaScript?",
    answers: [
      { text: "JSON.stringify()", correct: true },
      { text: "JSON.parse()", correct: false },
      { text: "JSON.toObject()", correct: false },
      { text: "JSON.toString()", correct: false }
    ]
  },
  {
    question: "Which HTML attribute is used to define inline JavaScript?",
    answers: [
      { text: "script", correct: true },
      { text: "js", correct: false },
      { text: "src", correct: false },
      { text: "style", correct: false }
    ]
  },
  {
    question: "How do you find the length of a string str in JavaScript?",
    answers: [
      { text: "str.length()", correct: false },
      { text: "str.size()", correct: false },
      { text: "str.length", correct: true },
      { text: "length(str)", correct: false }
    ]
  },
]
