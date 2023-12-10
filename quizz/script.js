

let currentQuestionIndex = 0;
let score = 0;
let questions;

// Load questions from the JSON file
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    console.log(questions);
    //console.log(questions.length);  //1 
    //console.log(questions[0].content[0].answers.length);
    console.log("Nb de questions : " + questions[0].content.length);
    renderMathInElement(document.body);
    startQuizz(); // Call startQuizz only when questions are loaded
  })
  .catch(error => console.error("Error loading questions:", error));




const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const skipButton = document.getElementById("skip-btn");

function renderMath() {
  MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
}

function startQuizz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();  
}
//[0].content[0].answers[5]
function showQuestion(){
  resetState();
  let currentQuestion = questions[0].content[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  //console.log(currentQuestion.answers[1]);
  questionElement.innerHTML = "Question n°" + questionNo + ": "+ currentQuestion.question;
  console.log(currentQuestion.answers);
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn")
    answerButtons.appendChild(button);
    renderMathInElement(document.body);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  })
}


function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `Votre note : $$ ${score} / ${questions[0].content.length} $$`;
  renderMathInElement(document.body);
  nextButton.innerHTML = "Play again";
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions[0].content.length){
    showQuestion();
  }else{
    showScore();
  }
}


nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions[0].content.length){
    handleNextButton();
  }else{
    startQuizz();
  }
});


function isNumber(value) {
  return typeof value === 'number';
}

skipButton.addEventListener("click", ()=>{                                       //debug
  var questionDemandee = prompt("A quelle question voulez-vous aller ? (UN CHIFFRE SINON CA CRASH)");
  questionDemandee = parseInt(questionDemandee);  //str to int
  console.log(isNumber(questionDemandee));
  if( isNumber(questionDemandee) ){
    currentQuestionIndex = questionDemandee -1 ;  // -1 for the index (ie : question 4 is index 3)
    showQuestion();
  }
});

src="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.js"    //func for rendering maths with katex
function latex(){
  document.addEventListener("DOMContentLoaded", function() {
    var tex = document.getElementsByClassName("btn");
    for (var i = 0; i < tex.length; i++) {
      katex.render(tex[i].innerHTML, tex[i]);
    }
});
}

