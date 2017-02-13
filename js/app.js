console.log('GET YOUR OWN BACK!!!');

$(() => {

  let scoreOne = 0;
  let scoreTwo = 0;
  // let time = 10;
  let questionCounter = 0; //Tracks question number to decide whose go it is
  let popped;
  let playerOne;
  let playerTwo;
  let currentPlayer = 'playerOne';

  // const $timer = $('.timer');
  const $button = $('.start');
  // const $reset = $('.reset');
  const $questionDiv = $('.question');
  const $daveDiv = $('.daveDiv');
  const $start = $('.start');
  const $timer = $('.timer');

  // const $result =$('.result');
  // const $playerOne = $('.playerOne');
  // const $playerTwo = $('.playerTwo');
  const $score1 = $('#score1');
  const $score2 = $('#score2');

  var listOfQuestions = [
    {
      question: 'What was S Club 7s first single?',
      choices: ['Bring it all back', 'S Club Party', 'Reach'],
      correctAnswer: 'Bring it all back'
    },
    {
      question: 'What is 2+5?',
      choices: ['3', '7', '11'],
      correctAnswer: '7'
    },
    {
      question: 'What is my favourite colou?r',
      choices: ['3', 'black', 'yellow'],
      correctAnswer: 'yellow'
    },
    {
      question: 'What colour is the ball?',
      choices: ['cat', '7', 'red'],
      correctAnswer: 'red'
    },
    {
      question: 'What is my favourite food?',
      choices: ['3', 'chocolate', 'yellow'],
      correctAnswer: 'chocolate'
    },
    {
      question: 'What colour is the car?',
      choices: ['cat', 'red', 'blue'],
      correctAnswer: 'red'
    },
    {
      question: 'What is my favourite colour?',
      choices: ['purple', 'cat', 'car'],
      correctAnswer: 'purple'
    },
    {
      question: 'What colour is the orange?',
      choices: ['orange', '7', 'fish'],
      correctAnswer: 'orange'
    },
    {
      question: 'What is 2+5?',
      choices: ['3', '7', '11'],
      correctAnswer: '7'
    },
    {
      question: 'What is my favourite colou?r',
      choices: ['3', 'black', 'yellow'],
      correctAnswer: 'yellow'
    },
    {
      question: 'What colour is the ball?',
      choices: ['cat', '7', 'red'],
      correctAnswer: 'red'
    },
    {
      question: 'What is my favourite food?',
      choices: ['3', 'chocolate', 'yellow'],
      correctAnswer: 'chocolate'
    },
    {
      question: 'What colour is the car?',
      choices: ['cat', 'red', 'blue'],
      correctAnswer: 'red'
    },
    {
      question: 'What is my favourite colour?',
      choices: ['purple', 'cat', 'car'],
      correctAnswer: 'purple'
    },
    {
      question: 'What colour is the orange?',
      choices: ['orange', '7', 'fish'],
      correctAnswer: 'orange'
    },
    {
      question: 'Who is the queen?',
      choices: ['Liz', 'cake', 'donald duck'],
      correctAnswer: 'Liz'
    }
  ];

//functions:

// (1)$button.on('click', startTimer); // To create start timer function
//******NEED TO DO TIMER ******

// function for timer starting, and stops when it hits zero.  When timer hits zero, and no button has been hit, player looses point (treat like a wrong answer).

$button.on('click', startTimer);
$submit.on('click', checkForMatch);

function startTimer() {
  resetGame();
  toggleBoard();
  generateSum();
  $timer.addClass('active');

  const timerId = setInterval(() => {
    time--;
    $timer.html(time);
  }, 1000);

  setTimeout(() => {
    clearInterval(timerId);
    $display.html('Stop!');
    $button.html('Play again?');
    toggleBoard();
  }, 10000); // stop timer after 10 seconds
}

function generateSum() {
  $input.val('');
  const first = Math.ceil(Math.random() * 10);
  const second = Math.ceil(Math.random() * 10);
  $display.html(`${first} + ${second} = ?`);
  computerAnswer = first + second;
}

function resetGame() {
  userScore = 0;
  time = 10;
  $score.html(userScore);
  $timer.html(time);
  $feedback.html('');
  $timer.removeClass('active');
}

function toggleBoard() {
  $hidden.toggle();
  $button.toggle();
}

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


//(3) Check for a match
  function checkForMatch(e) {
    const correctAnswer = popped.correctAnswer;
    const userAnswer = $(e.target).text();

    if ((correctAnswer === userAnswer) && (currentPlayer === 'playerOne')) {
      console.log('Correctp1');
      $daveDiv.text('Correct');
      scoreOne++;
      console.log('scoreOne');
      console.log(scoreOne);
      // Dave - Thats correct!  noise
      //chair moves one space up

    } else if ((correctAnswer === userAnswer) && (currentPlayer === 'playerTwo')) {
      console.log('Correctp2');
      $daveDiv.text('Correct');
      scoreTwo++;
      console.log('scoreTwo');
      console.log(scoreTwo);
      // Dave - Thats correct!  noise
      //chair moves one space up
    } else {             //(correctAnswer !== userAnswer)
      console.log('Incorrect');
      $daveDiv.text('Incorrect');
      // Dave - Thats Incorrect!  noise
    }
    generateQuestion();   //always generate a question at the end of each go
    questionCounter++;
    console.log('scoreOne');
    console.log(scoreOne);
    console.log('scoreTwo');
    console.log(scoreTwo);
    console.log('questionCounter');
    console.log(questionCounter);
    togglePlayer();                 //change players
    console.log(currentPlayer);
    playerOneWin();          //check for player one win
    playerTwoWin();
    $score1.text(`${scoreOne}`);
    $score2.text(`${scoreTwo}`);
  }

  playerOneWin();          //check for player one win
  playerTwoWin();          //check for player one win
  generateQuestion();      //always generate a question at the end of each go

//showng the scoreboard at the bottom of the page to keep tabs on the score without having to use the console.
  $score1.text(`${scoreOne}`);
  $score2.text(`${scoreTwo}`);
//
//(4) change between player one and player two.
  function togglePlayer() {
    currentPlayer = currentPlayer === 'playerOne' ? 'playerTwo' : 'playerOne';
  }

// (5) function to determine whether player one has won yet:
  function playerOneWin() {
    if (scoreOne === 5) {
      $daveDiv.text('Player One has won!');
      console.log('p1 wins');
      //play dunk music
    }
  }
  function playerTwoWin() {
    if (scoreTwo === 5) {
      $daveDiv.text('Player Two has won!');
      console.log('p2 wins');
      //play dunk music
    }
  }
//(6) reset game at end

// $('button.reset').on('click', ()=>{
//   //location.reload();
//   $playerOne.text('');
//   $playerTwo.text('');
//   $result.text('');
//   $scoreOne.text(`${scoreOne}`);
//   $scoreTwo.text(`${scoreTwo}`);
  console.log(currentPlayer);
});
