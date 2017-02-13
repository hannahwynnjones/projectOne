console.log('GET YOUR OWN BACK!!!');

$(() => {

  let scoreOne = 0;
  let scoreTwo = 0;
  // let time = 10;
  let questionCounter = 0; //Tracks question number to decide whose go it is
  let popped;
  let currentPlayer = 'playerOne';

  // const $timer = $('.timer');
  const $button = $('.start');
  const $reset = $('.reset');
  const $questionDiv = $('.question');
  const $daveDiv = $('.daveDiv');

  var listOfQuestions = [
    {
      question: 'What was S Club 7s first single?',
      choices: ['Bring it all back', 'S Club Party', 'Reach'],
      correctAnswer: 'Bring it all back'
    },
    {
      question: 'What is 2+5',
      choices: ['3', '7', '11'],
      correctAnswer: '7'
    },
    {
      question: 'What is my favourite colour',
      choices: ['3', 'blue', 'yellow'],
      correctAnswer: 'blue'
    }
  ];

//functions:

// (1)$button.on('click', startTimer); // To create start timer function
//******NEED TO DO TIMER ******

// function for timer starting, and stops when it hits zero.  When timer hits zero, and no button has been hit, player looses point (treat like a wrong answer).

  // let time = 10;
  // let timerIsRunning = false;
  // let timerId = null;
  //
  // function startStopTimer() {
  //   // stop the timer if it is running
  //   if (timerIsRunning) {
  //     clearInterval(timerId);
  //     timerIsRunning = false;
  //   } if () {
  //     // start the timer if it is NOT running
  //     timerId = setInterval(() => {
  //       timeRemaining--;
  //       $timerScreen.text(timeRemaining);
  //     }
  //       else (timeRemaining === 0) {
  //         clearInterval(timerId);
  //         $timer.addClass('ringing');
  //     }
  //   }, 1000);
  //     timerIsRunning = true;
  // }

// (2) generate Question  (generating a qu from thearray by popping it out
// displays question on page

  function generateQuestion() {
    // Pop last question from array
    popped = listOfQuestions.pop();        //removed one of the questions from my array
    $questionDiv.text(popped.question);   // Updating the DOM with the popped question
    $answers.empty();                     //clearing buttons each time
    popped.choices.forEach((choice) => {
      $answers.append(`<button>${choice}</button>`);   // Create a button for each choices
    });
  }

  //when the answer is choosen from the 3 choices, checkForMatch function is run.
  const $answers = $('.answers');
  $answers.on('click', 'button', checkForMatch);

  generateQuestion();  //always generate a question at the end of each go

//(3) Check for a match
  function checkForMatch(e) {
    const correctAnswer = popped.correctAnswer;
    const userAnswer = $(e.target).text();

    if (correctAnswer === userAnswer || currentPlayer === playerOne) {
      console.log('Correct');
      $daveDiv.text('Correct');
      scoreOne++;
      // Dave - Thats correct!  noise
      //chair moves one space up
    } else if (correctAnswer === userAnswer || currentPlayer === playerTwo) {
      console.log('Correct');
      $daveDiv.text('Correct');
      scoreTwo++;
      // Dave - Thats correct!  noise
      //chair moves one space up
    } else {             //(correctAnswer !== userAnswer)
      console.log('Incorrect');
      $daveDiv.text('Incorrect');
      // Dave - Thats Incorrect!  noise
    }
    questionCounter++;
  }

  playerOneWin();
  playerTwoWin();
  generateQuestion();
  togglePlayer();

  console.log(scoreOne);
  console.log(scoreTwo);

// (4) functionWin (checking to see if anyone has hit 5 points yet)
// if (scoreOne || scoreTwo === 5)
//
//(4) chnage between player one and player two.
  function togglePlayer() {
    currentPlayer = currentPlayer === 'playerOne' ? 'playerTwo' : 'playerOne';
  }

// (5) function to determine whether player one has won yet:
  function playerOneWin() {
    if (scoreOne >= 5) {
      $daveDiv.text('Player One has won!');
      //play dunk music
    }
  }
  function playerTwoWin() {
    if (scoreOne >= 5) {
      $daveDiv.text('Player One has won!');
      //play dunk music
    }
  }
});


//


// (5) function to determine whether player one has won yet:

// if player answer === true answer) {
// return 'Correct!'
// move div one up, one left
// scoreOne++
// else (no change)
// run new page, next player
