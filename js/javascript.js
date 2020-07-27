// set global variables
var playing = false;
var document, window, location,action; // define main variables to use
var score;
var firstN;
var secondN;
var correctPosition;
var incorrects = [];
var timeremainingvalue;
var correctAnswer;

// if we click on the start/ reset button
document.getElementById("startreset").onclick = function(){
     // if we are playing
      if(playing){
              location.reload();    // reload page (start from scratch)
      }else // if we are not playing , that means you see button start
          {   
            // change playing mode  
               playing = true;
              // set score to 0
                score = 0; 
              
              // show score value in box:
              document.getElementById("scoreValue").innerHTML = score;
              
               // show countdown box
              show("timeremaining");
              timeremainingvalue = 60; // set time
              document.getElementById("timeremainingvalue").innerHTML = timeremainingvalue;
              
             // hide game over box
              hide("gameover");
              // change button to reset
             document.getElementById("startreset").innerHTML = "Reset Game";
            
             // start countdown  
             startCountDown();
              
              // generate new question and new answers
             generateQandA();
              
              for(var i = 1;i<5;i++ ){
                 document.getElementById("box" + i).onclick = function(){
             // check if we are playing
                  if(playing){ // yes
                      if(this.innerHTML == correctAnswer){ // this refering to clicked object
                    // correct answer 
                          
                  // add score and show:
                    score++;
                    document.getElementById("scoreValue").innerHTML = score;  
                    // hide wrong box and show correct
                    hide("wrong");
                    show("correct");  
                    // show correct box only for one sec  
                    window.setTimeout(function(){
                  hide("correct"); 
              },1000);  
                  
             // generate new question and new answers
             generateQandA();
                      }else{
                          // wrong answer
                          hide("correct");
                          show("wrong");
                          window.setTimeout(function(){
                              hide("wrong");
                          }, 1000);
                      }
                }
              }
            
          
//              for(var i = 0; i < incorrects.length;i++){
//                   document.getElementById("box" + incorrects[i]).onclick = function(){
//              // show incorrect message      
//               show("wrong")
//              window.setTimeout(function(){
//               hide("wrong");  
//              },1000);
//              }
//                     
//                }

    
}
          }
}
// FUNCTIONS
// generate correct and wrong box, plus generate questions and answers
function generateQandA(){
 correctAnswer =multiplyRandom(true); // if we pass true we want to get first value of numbers that means first question number
    
var result = firstN + "x" + secondN; // get question

    document.getElementById("question").innerHTML = result;
     correctPosition = Math.round(Math.random() * 3) + 1; // find where we will put correct answer in which box
      document.getElementById("box" + correctPosition).innerHTML = correctAnswer; // fill box with correct answer
    var answers = [correctAnswer];
    
    for(var i = 1; i < 5; i++){
        if(i != correctPosition){
            var wrongAnswer;
            do{
                wrongAnswer = multiplyRandom(false);
            }while(answers.indexOf(wrongAnswer) > -1)
            document.getElementById("box"+i).innerHTML = wrongAnswer;  
            // populate array with wrong answers
            answers.push(wrongAnswer); 
            incorrects.push(wrongAnswer);
        }
    }
    // OTHER METHOD BAD:
//    for(var i = 1; i < 5;i++){ // all other wrong 3 boxses generate by loop, fill all wrong boxses with wrong answers
//     var wrong = multiplyRandom(false);  // false means, we dont want keep numbers for generate question, because this will be wrong answers
//        if(answers[i] == wrong){ // if we 
//            i--; // back again and get different number
//        }
//            
//        document.getElementById("box" + i).innerHTML = wrong; // fill box with wrong answer
//    }
//      
//     switch(correctPosition){
//        case 1: incorrects = [2,3,4];     
//         break;
//         case 2: 
//                incorrects = [1,3,4];
//         break;
//        case 3: 
//                incorrects = [1,2,4];
//         break;     
//       case 4:
//              incorrects = [1,2,3];
//        break;
//        default:
//             incorrects = [1,2,3,4];
//     }
}
// if argument true you will get questions numbers, if false just multiply random number from 1 to 9
function multiplyRandom(get){
        var num1 = Math.round(Math.random()  * 9) + 1;
        var num2 = Math.round(Math.random() * 9) + 1;
    if(get){
        firstN = num1;
        secondN = num2;
    }
 
    return num1 * num2;
}
// start counter
function startCountDown(){
    action = window.setInterval(function(){
             timeremainingvalue--;
            document.getElementById("timeremainingvalue").innerHTML = timeremainingvalue; 
                     if(timeremainingvalue == 0){ // gameover
                       gameOver();
                         
                     }
                }, 1000);
}
// stop counter
function stopCountDown(){
    window.clearInterval(action);
}
// show game over, finish game
function gameOver(){
     stopCountDown();
    // change button to start
     document.getElementById("startreset").innerHTML = "Start Game";
     
     // show game over screen
    show("gameover");
    document.getElementById("gameover").innerHTML = "game over!<br> your score is " + score + ".";
    hide("timeremaining");
    hide("correct");
    hide("wrong");
    
     // change playing mode  
       playing = false;
}
// hide an element
function hide(Id){
    document.getElementById(Id).style.display = "none";
}
// show an element
function show(Id){
    document.getElementById(Id).style.display = "block";
}