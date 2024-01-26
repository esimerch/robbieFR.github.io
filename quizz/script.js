

let currentQuestionIndex = 0;
let score = 0;
let questions;
let tableVerite = [];
let clicked = [];

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
      var buttonSize = answer.text.match(/[\\]/g).length;   // Plus de 2 backslash : longue case
      if(buttonSize<=4){
        button.style.width = "100px";
      }else{
        button.style.width = "510px";
        //console.log("child");
      }
    };

    for (let i = 0; i < questions[0].content.length; i++ ){
      var currentQuestion = document.getElementById(i);
      if( i == currentQuestionIndex ){
        currentQuestion.style.width = "35px";
        currentQuestion.style.height = "35px";
        currentQuestion.style.borderRadius = "15px";
        currentQuestion.style.background = "#5b52bf";
        currentQuestion.style.color = "#FFF";
        currentQuestion.style.fontWeight = "bold";
      }else{
        currentQuestion.style.width = "30px";
        currentQuestion.style.height = "30px";
        currentQuestion.style.borderRadius = "12px";
        currentQuestion.style.color = "#FFF";
      }
    }

    for (let i = 0; i < questions[0].content[currentQuestionIndex].answers.length; i++){
      clicked[i] = 0;
    }
    
    console.log(clicked);

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

    let currentQuestion = questions[0].content[currentQuestionIndex]; 
    //console.log(currentQuestion + "  " + currentQuestionIndex );
    indexButton.appendChild(index);
  }
}

function colorIndex(index){
  var button = document.getElementById(index);
  if (tableVerite[index]== -1 ){button.style.backgroundColor = "#7e74e2";}
  if (tableVerite[index]==  0 ){button.style.backgroundColor = "#ea9a9a";}
  if (tableVerite[index]==  1 ){button.style.backgroundColor = "#9AEABC";}
}



function selectAnswer(e){
  var i=0;
  var location = e.target;

  while( location.className != "btn" ){
    i=i+1;
    location = location.parentElement;
  };
  
  const selectedBtn = location; //e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  const isMultiple = questions[0].content[currentQuestionIndex].multipleAnswer === "true";
  
  if(isMultiple){
    

    nextButton.style.display = "block";
    nextButton.innerText = "Valider";
    selectedBtn.style.backgroundColor = "#010110"
  }else{
    if(isCorrect){
      selectedBtn.classList.add("correct");
      tableVerite[currentQuestionIndex] = 1;
      score++;
    }else{
      selectedBtn.classList.add("incorrect");
      tableVerite[currentQuestionIndex] = 0;
    }
    colorIndex(currentQuestionIndex);
    Array.from(answerButtons.children).forEach(button => {
      if(button.dataset.correct === "true"){
          button.classList.add("correct");
      }
      button.disabled = true;
    });
  nextButton.style.display = "block";
  nextButton.innerText = "Suivant";
  }


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
  }else{
    showScore();
  }
}


nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions[0].content.length){
    handleNextButton();
  }else{
    for (let i=0; i<questions[0].content.length; i++){
      var button = document.getElementById(i);
      button.style.backgroundColor = "#7e74e2";
    }
    
    startQuizz();
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
