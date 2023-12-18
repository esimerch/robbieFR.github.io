

let currentQuestionIndex = 0;
let score = 0;
let questions;
let tableVerite = [];

// Load questions from the JSON file
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    //console.log(questions);
    //console.log(questions.length);  //1 
    //console.log(questions[0].content[0].answers.length);
    console.log("Nb de questions : " + questions[0].content.length);
    showIndex();
    renderMathInElement(document.body);

    for (let i = 0; i < questions[0].content.length; i++){
      tableVerite[i] = -1;
    }

    startQuizz(); // Call startQuizz only when questions are loaded

  })
  .catch(error => console.error("Error loading questions:", error));




const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const indexButton = document.getElementById("index-btn");

/*
skipButton.addEventListener("click", ()=>{                                       //debug
  var questionDemandee = prompt("A quelle question voulez-vous aller ? (UN CHIFFRE SINON CA CRASH)");
  questionDemandee = parseInt(questionDemandee);  //str to int
  console.log(isNumber(questionDemandee));
  if( isNumber(questionDemandee) ){
    currentQuestionIndex = questionDemandee -1 ;  // -1 for the index (ie : question 4 is index 3)
    showQuestion();
  }
});

*/


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
  //console.log(currentQuestion.answers);
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    //console.log(button);
    
    if (answer.text.match(/[\\]/g) != null){
      //console.log(answer.text.match(/[\\]/g).length); //logs 3
      var buttonSize = answer.text.match(/[\\]/g).length;
      if(buttonSize<=4){
        button.style.width = "100px";
      }else{
        button.style.width = "510px";
        //console.log("child");
      }
    };

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

function showIndex(){
  for (let i=0; i < questions[0].content.length; i++){
    const index = document.createElement("button");
    index.innerHTML = " ‎ " + (i+1) + " ‎ " ;
    index.classList.add("index")
    //index.dataset.index = i + 1;
    //index.dataset.btn = "index-" + i;
    var number = i;
    index.setAttribute('id', number);

    indexButton.addEventListener("click", goToIdex);


    let currentQuestion = questions[0].content[currentQuestionIndex]; 
    //console.log(currentQuestion + "  " + currentQuestionIndex );
    indexButton.appendChild(index);
  }
}

function colorIndex(){
  for(let i=0; i <= questions[0].content.length ; i++ ){
    var index = document.getElementById('0');
    //console.log(index.id);
    if (tableVerite[i]=-1){index.style.backgroundColor = "#7e74e2";}
    //else{index.style.backgroundColor = "#FAF";}
    //data-answer-btn = "btn-" + i;
  }
  //console.log(tableVerite);
  
}

function goToIdex(event){
  const clickedButton = event.target
  //console.log(clickedButton);
  var questionDemandee = parseInt(clickedButton.dataset.index, 10);
  currentQuestionIndex = questionDemandee -1
  showQuestion();
}



function selectAnswer(e){
  var i=0;
  //console.log(e);
  //console.log(e.target.className);
  var location = e.target;
  //location = e.target;
  //console.log(location.className);
  //console.log(e.target.parentElement.className);
  //console.log(e.target.parentElement.parentElement.className);

  
  while( location.className != "btn" ){
    i=i+1;
    //console.log(i + " " + e.target.className);
    location = location.parentElement;
  };
  

  const selectedBtn = location; //e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    tableVerite[currentQuestionIndex]=1;
    console.log(tableVerite);
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
    tableVerite[currentQuestionIndex]=0;
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
  var note = score/questions[0].content.length
  if ( note == 12 || note == 13 ){
    questionElement.innerHTML = `$$ ${score} / ${questions[0].content.length} $$ `+ `Votre note : $$ ≈\\pi/4 $$`;
  }else{
    questionElement.innerHTML = `Votre note : $$ ${score} / ${questions[0].content.length} $$`;
  }

  renderMathInElement(document.body);
  nextButton.innerHTML = "Play again";
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions[0].content.length){
    showQuestion();
    colorIndex()
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



src="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.js"    //func for rendering maths with katex
function latex(){
  document.addEventListener("DOMContentLoaded", function() {
    var tex = document.getElementsByClassName("btn");
    for (var i = 0; i < tex.length; i++) {
      katex.render(tex[i].innerHTML, tex[i]);
    }
});
}

