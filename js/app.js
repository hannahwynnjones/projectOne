console.log('GET YOUR OWN BACK!!!');

$(() => {

  let scoreOne = 0;
  let scoreTwo = 0;
  // let time = 10;
  let questionCounter = 0; //Tracks question number to decide whose go it is
  let popped;
  // let playerOne;
  // let playerTwo;
  let currentPlayer = 'playerOne';
  let time = 10;

  // const $timer = $('.timer');

  const $reset = $('.reset');
  const $questionDiv = $('.question');
  const $daveDiv = $('.daveDiv');
  // const $start = $('.start');
  const $timer = $('.timer');
  const $startButton = $('.start');
  const $hidden = $('.hidden');

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
      question: 'Which of these was a character in The Dandy and not The Beano?',
      choices: ['Minnie the Minx', 'Ivy the Terrible', 'Beryl the Peril'],
      correctAnswer: 'Minnie the Minx'
    },
    {
      question: 'Tamagotchi" is a Japanese portmanteau of what two words?',
      choices: ['"Egg and "watch"', '"Egg and "computer"', '"Egg and "monster"'],
      correctAnswer: '"Egg and "watch"'
    },
    {
      question: 'What was the name of the sheep who was the first successfully cloned animal in 1996?',
      choices: ['William', 'Molly', 'Dolly'],
      correctAnswer: 'Dolly'
    },
    {
      question: 'Who is the only Blue Peter presenter ever to have been sacked?',
      choices: ['Katy Hill', 'Konnie Huq', 'Richard Bacon'],
      correctAnswer: 'Richard Bacon'
    },
    {
      question: 'What name was shared by all four members of the popular girl gang in Recess?',
      choices: ['Courtney', 'Ashley', 'Stacey'],
      correctAnswer: 'Ashley'
    },
    {
      question: 'What colour were Chuckie\'s glasses in Rugrats?',
      choices: ['purple', 'red', 'green'],
      correctAnswer: 'purple'
    },
    {
      question: 'Which of these was NOT a character on Playdays?',
      choices: ['Handy Andy', 'The Whey Bird', 'Peggy Patch'],
      correctAnswer: 'Handy Andy'
    },
    {
      question: 'What type of coin was The Queen\'s Nose?',
      choices: ['10p', '£2', '50p'],
      correctAnswer: '50p'
    },
    {
      question: 'Which Teenage Mutant Ninja Turtle wore a red bandana?',
      choices: ['Michelangelo', 'Donatello', 'Raphael'],
      correctAnswer: 'Raphael'
    },
    {
      question: 'What don\'t the Backstreet Boys care about?',
      choices: ['Who you are, where you\'re from and what you did', 'What you did, what you look like and where you come from', 'who you are, what your name is and what\'s your favourite dish'],
      correctAnswer: 'Who you are, where you\'re from and what you did'
    },
    {
      question: 'What was Ms. Frizzle\'s first name in "The Magic School Bus" series?',
      choices: ['Veronica', 'Vanessa', 'Valerie'],
      correctAnswer: 'Valerie'
    },
    {
      question: 'Which Pokemon was not in the original Pokedex?',
      choices: ['cat', 'red', 'blue'],
      correctAnswer: 'red'
    },
    {
      question: 'What was the name of Angelica Pickles\' doll?',
      choices: ['purple', 'Cynthia', 'Verity'],
      correctAnswer: 'purple'
    },
    {
      question: 'The Princess in the Super Mario franchise hasn\'t always been named Peach (in North America, at least). What was she previously known as?',
      choices: ['Princess Toadstool', '7', ''],
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

  $startButton.on('click', startTimer);
  $startButton.on('click', generateQuestion);

//
  function startTimer() {
    console.log(startTimer);
    $timer.addClass('active');
    const timerId = setInterval(() => {
      time--;
      $timer.html(time);
    }, 1000);
  };
  setTimeout(() => {
    clearInterval(timerId);
    $display.html('Stop!');
    $button.html('Play again?');
    toggleBoard();
  }, 10000); // stop timer after 10 seconds


//

// function resetGame() {
//   time = 10;
//   $score.html(userScore);
//   $timer.html(time);
//   $feedback.html('');
//   $timer.removeClass('active');
// }

function toggleBoard() {
  $hidden.toggle();
  $button.toggle();
}
//
// $('button.reset').on('click', ()=>{
//     //location.reload();
//     $player1.text('');
//     $player2.text('');
//     $result.text('');
//     $score1.text(`${scoreOne}`);
//     $score2.text(`${scoreTwo}`);
//       time = 10;
//     }

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
  // generateQuestion();      //always generate a question at the end of each go

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

//finsih game?
//big dave speaks and finsihes the game, player then given the option of re-starting

//(6) reset game at end

  $reset.on('click', ()=>{
//   //location.reload();
    // $playerOne.text(0);
    // $playerTwo.text(0);
    //   $result.text('');
    $score1.text(0);
    $score2.text(0);
    console.log(currentPlayer);
    console.log(scoreOne);
    console.log(scoreTwo);
    console.log(questionCounter);
    time = 10;
  });
});
