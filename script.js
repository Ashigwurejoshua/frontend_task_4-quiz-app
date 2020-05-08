
/*const btn = document.querySelector (".button").onclick*/
const options = document.querySelector(".options").children;
const answerTrackerContainer = document.querySelector(".answer-tracker");
const questionNumSpan = document.querySelector(".question-num-value");
const totalQuestionSpan = document.querySelector(".total-question");
const correctAnswerSpan = document.querySelector(".correct-answers");
const totalQuestionSpan2 = document.querySelector(".total-question2");
const percentage = document.querySelector(".percentage");
const question = document.querySelector('.question');
const op1 = document.querySelector(".option1");
const op2 = document.querySelector(".option2");
const op3 = document.querySelector(".option3");
const op4 = document.querySelector(".option4");
let questionIndex = 3;
let index = 0;
let myArray =[];
let myArr = [];
let score = 0;
// question, option and answers

const questions = [
    {
       
     q: 'In an open system, for maximum work, the process must be entirely ………',
     options: ['a) irreversible ', 'b) reversible', 
     'c)  adiabatic', 'd) none of the above '],
     answer: 1
    },
    {
       
        q: 'Which of the following is true for a steady flow system?',
        options: ['a)	Mass entering = mass leaving ', 'b) Mass does not enter or leaving the system', 
        'c)	Mass entering can be more or less than the mass leaving ', 'd)	None of the mentioned  '],
        answer: 0
    },
    {
       
        q: 'Which of the following is true for a closed system?',
        options: ['a)	Mass entering = mass leaving ', 'b)	Mass does not enter or leave the system', 
        'c)	Mass entering can be more or less than the mass leaving ', 'd) none'],
        answer: 1
       },
       {
       
        q: 'Which of the following is mostly neglected while doing calculations for finding maximum work?',
        options: ['a) KE', 'b) PE', 
        'c)	Both of the mentioned', 'd)	No idea'],
        answer: 2
       },
       {
       
        q: 'The work done by a closed system in a reversible process is always …….. that done in an irreversible process.',
        options: ['a) Less than or more than ', 'b)	Equal to ', 
        'c)	Less than', 'd)	More than '],
        answer: 3
       }
]

//setting of question and options
totalQuestionSpan.innerHTML=questions.length;
function load(){
    questionNumSpan.innerHTML = index+1;
    question.innerHTML = questions[questionIndex].q;
    op1.innerHTML = questions[questionIndex].options[0];
    op2.innerHTML = questions[questionIndex].options[1];
    op3.innerHTML = questions[questionIndex].options[2];
    op4.innerHTML = questions[questionIndex].options[3];
    index++;
}

/*function check(element){
    console.log(element.id);  
}*/

// this enables the color effect to display when the options are clicked
function check(element){
    if (element.id==questions[questionIndex].answer){
        element.classList.add("correct");
        updateAnswerTracker("correct");
        score++;
        console.log("score:"+score);
    }
    else{
        element.classList.add("wrong");
        updateAnswerTracker("wrong");
    }
    disableOptions();
}

function disableOptions(){//this function enables the correct answer  even if the wrong option  is chosen 
    for(let i=0; i<options.length; i++){//it also disables other options
        options[i].classList.add("disabled");
        if (options[i].id==questions[questionIndex].answer){
            options[i].classList.add("correct");
        }
    }
}

function enableOptions(){
    for(let i=0; i<options.length; i++){//it enables other options
        options[i].classList.remove("disabled","correct","wrong");
}
}

function validate(){// to alert a user to select an option. And on clicking "next", it displays a random qusetion
    if (!options[0].classList.contains("disabled")){
        alert("Please select an option");
    } 
    else{
        enableOptions();
        randomQuestion();  
    }
}
   

// function to enable the   next question
function next(){
    validate();
}

// enables the question to display randomly
function randomQuestion(){
    let randomNumber=   Math.floor(Math.random()*questions.length);
    let hitDuplicate=0;
    if (index==questions.length){
        quizOver();
    }
    else {
        if(myArray.length>0){
          for(let i=0; i<myArray.length; i++){
              if (myArray[i]==randomNumber){
                hitDuplicate=1;
                break;
              }
          }
          if (hitDuplicate==1){
              randomQuestion();
          }
          else {
              questionIndex=randomNumber;
              load();
              myArr.push(questionIndex)
          }
        }
        if (myArray.length==0){
            questionIndex=randomNumber;
            load(); 
            myArr.push(questionIndex)
        }
    }
    //console.log("myArr:" +myArr)
    myArray.push(randomNumber);
      
}


//function for answer tracker
function  answerTracker(){
    for(let i=0; i<questions.length; i++){
        const div = document.createElement("div")
        answerTrackerContainer.appendChild(div);
    }
}



// function for answer tracker update
function updateAnswerTracker(classNam){
    answerTrackerContainer.children[index-1].classList.add(classNam);

}
function quizOver(){
    document.querySelector(".quiz-over").classList.add("show");
    correctAnswerSpan.innerHTML=score;
    totalQuestionSpan2.innerHTML=questions.length;
    percentage.innerHTML=(score/questions.length)*100 + "%";
}

function tryAgain(){
    window.location.reload();
}

window.onload = function(){
    randomQuestion();
    answerTracker();
}

