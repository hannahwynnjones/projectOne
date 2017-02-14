console.log('GET YOUR OWN BACK!!!');

$(() => {

  let scoreOne = 0;
  let scoreTwo = 0;
  let questionCounter = 0; //Tracks question number to decide whose go it is
  let popped;
  // let playerOne;
  // let playerTwo;
  let currentPlayer = 'playerOne';
  let time = 10;

  const $reset = $('.reset');
  const $questionDiv = $('.question');
  const $daveDiv = $('.daveDiv');
  const $timer = $('.timer');
  const $startButton = $('.start');
  const $score1 = $('#score1');
  const $score2 = $('#score2');
  const $hidden = $('.hidden');
  const $tvSet = $('.tvSet');
  const $chairToMove = $('#'+currentPlayer);
  let timerId;
  let totalTime;

//TVSET

  const $playerOne = $('#playerOne');  ///divs for playerOneone
  const $playerTwo = $('#playerTwo');


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
      correctAnswer: 'cat'
    },
    {
      question: 'What was the name of Angelica Pickles\' doll?',
      choices: ['purple', 'Cynthia', 'Verity'],
      correctAnswer: 'Cynthia'
    },
    {
      question: 'The Princess in the Super Mario franchise hasn\'t always been named Peach (in North America, at least). What was she previously known as?',
      choices: ['Princess Toadstoll', '7', 'fish'],
      correctAnswer: 'Princess Toadstoll'
    },
    {
      question: 'Who is the queen?',
      choices: ['Liz', 'cake', 'donald duck'],
      correctAnswer: 'Liz'
    }
  ];

  // $startButton.on('click', generateQuestion);
  $startButton.on('click', startGame);

  function startGame() {
    toggleBoard();
    startTimer();
  }
//functions:
// (1)$button.on('click', startTimer); // To create start timer function

  function startTimer() {
    generateQuestion();
    // $timer.addClass('active');

    timerId = setInterval(() => {
      time--;
      $timer.html(time);
    }, 1000);

    totalTime = setTimeout(()=> {
      clearInterval(timerId);
    }, 10000);
  }

  function resetTimer() {
    clearInterval(timerId);
    clearTimeout(totalTime);
    time = 10;
    $timer.html(time);
    startTimer();
    // $timer.removeClass('active');
  }

  // function gameOver() {
  //   $daveDiv.html('Stop!');
  //   $startButton.html('Play again?');
  //   toggleBoard();                                //need?
  // } // stop timer after 10 seconds

  function toggleBoard() {
    $hidden.toggle();
    $startButton.toggle();
  }

// (2) generate Question  (generating a qu from the array by popping it out
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

    if (correctAnswer === userAnswer) {
      $daveDiv.text('Correct');
      if (currentPlayer === 'playerOne') {
        scoreOne++;
      } else {
        scoreTwo++;
      }

      $tvSet.fadeIn();
      // write any logic that you want to do when you move the chairs
      console.log(currentPlayer);
      const $chairToMove = $('#'+currentPlayer);
      if (currentPlayer === 'playerOne') {
        $chairToMove.animate({left: '-=50', bottom: '+=50'}, 2000);
        $chairToMove.css('background', 'red');
      } else if (currentPlayer === 'playerTwo') {
        $chairToMove.animate({right: '-=50', bottom: '+=50'}, 2000);
        $chairToMove.css('background', 'yellow');
      }
      setTimeout(()=> {

        $tvSet.fadeOut('slow');
        console.log($chairToMove);
        // $tvSet.fadeOut();  //.delay(5000).fadeTo('slow', 0.6);
        resetTimer();
        togglePlayer(); //change players
      }, 3000);
      // Dave - Thats correct!  noise
      //chair moves one space up

      // $tvSet.fadeOut();

    } else { //(correctAnswer !== userAnswer)
      console.log('Incorrect');
      $daveDiv.text('Incorrect');
      resetTimer();
      togglePlayer(); //change players
      // Dave - Thats Incorrect!  noise
      //chair moves one space up
    }
    // generateQuestion();
    //always generate a question at the end of each go
    questionCounter++;
    console.log('scoreOne');
    console.log(scoreOne);
    console.log('scoreTwo');
    console.log(scoreTwo);
    console.log('questionCounter');
    console.log(questionCounter);
    console.log(currentPlayer);
    playerOneWin();          //check for player one win
    playerTwoWin();
    $score1.text(`${scoreOne}`);
    $score2.text(`${scoreTwo}`);
  }

  // playerOneWin();          //check for player one win
  // playerTwoWin();          //check for player one win
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
      const $chairToMove = $('#'+currentPlayer);
      if (currentPlayer === 'playerOne') {
        $chairToMove.animate({left: '-=250', bottom: '-=250'}, 1500);
        $chairToMove.css('background', 'green');
      } else if (currentPlayer === 'playerTwo') {
        $chairToMove.animate({left: '-=250', top: '+=250'}, 1500);
        $chairToMove.css('background', 'blue');
      }
      setTimeout(()=> {

        $tvSet.fadeOut('slow');
        console.log($chairToMove);
        // $tvSet.fadeOut();  //.delay(5000).fadeTo('slow', 0.6);
        resetTimer();
        togglePlayer(); //change players
      }, 3000);
      //play dunk music
    }
  }
  function playerTwoWin() {
    if (scoreTwo === 5) {
      $daveDiv.text('Player Two has won!');
      console.log('p2 wins');
      $tvSet.fadeIn();
      // write any logic that you want to do when you move the chairs
      console.log(currentPlayer);
      const $chairToMove = $('#'+currentPlayer);
      if (currentPlayer === 'playerOne') {
        $chairToMove.animate({left: '-=250', bottom: '-=250'}, 1500);
        $chairToMove.css('background', 'green');
      } else if (currentPlayer === 'playerTwo') {
        $chairToMove.animate({left: '-=250', top: '+=250'}, 1500);
        $chairToMove.css('background', 'blue');
      }
      setTimeout(()=> {

        $tvSet.fadeOut('slow');
        console.log($chairToMove);
        // $tvSet.fadeOut();  //.delay(5000).fadeTo('slow', 0.6);
        resetTimer();
        togglePlayer(); //change players
      }, 3000);
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
    resetTimer();
    // startGame();
    $daveDiv.text('New game, quick!!!');
  });

});
