console.log('GET YOUR OWN BACK!!!');

$(() => {

  let scoreOne = 0;
  let scoreTwo = 0;
  let questionCounter = 0; //Tracks question number fot toggleplayer function
  let popped;
  // let playerOne; //need this?
  // let playerTwo;  //need this?
  let currentPlayer = 'playerOne'; //starts player one no matter what
  let time = 10;
  let timerId;
  let totalTime;

  // 3 divs to move between (welcome then goes to the question board whcih goes to the tv set and back again.)
  //maybe include a forth for the finish.
  const $questionBoard = $('.questionBoard');
  const $welcomeScreen = $('.welcomeScreen');
  const $tvSet = $('.tvSet');
  const $finish1 = $('.finish1');
  const $finish2 = $('.finish2');
  const $gameOver = $('.gameOver');
  const $playAgain = $('.playAgain');
  //3 buttons across game:

  const $welcomeButton = $('.welcomeButton');
  const $middleBoardButton = $('.middleBoardButton');
  const $resetButton = $('.resetButton');
  const $exitButton = $('.exitButton');

//QuestionBoard consts

  const $questionDiv = $('.question');
  const $daveDiv = $('.daveDiv');
  const $timer = $('.timer');
  const $score1 = $('#score1');
  const $score2 = $('#score2');
  const $hidden = $('.hidden'); //need this?
  // const $audio = $('.audio.middleBoardButton'); //for audio later

  // TV set consts
  const $gunge = $('.gunge');
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
      question: 'Tamagotchi" is a Japanese meaning of what two words?',
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

//Screen loads - ony welcome page visable, hides questionBoardpage
  $questionBoard.css(
    {visibility: 'hidden'});
  $finish1.css(
    {visibility: 'hidden'});
  $finish2.css(
    {visibility: 'hidden'});
  $gameOver.css(
    {visibility: 'hidden'});

//click on button to hide welcome screen and reveal questionboardpage
  $welcomeButton.on('click',() => {
    $welcomeScreen.css(
      {visibility: 'hidden'});
    $questionBoard.css(
      {visibility: 'visible'});
  });

  $middleBoardButton.on('click', startGame);
  // $middleBoardButton.on('click', (e) => {    //play a GYOB intro - welcome to...
  //   $middleBoardButton.textContent = 'PLAY';
  //   if($audio.paused) {
  //     $audio.play();
  //     e.target.textContent = 'PAUSE';
  //   } else {
  //     $audio.pause();
  //     e.target.textContent = 'PLAY';
  //   }
  // });

  $resetButton.on('click', resetGame);
  $playAgain.on('click', resetGame);
  $exitButton.on('click', exitGame);

  function resetGame() {
    scoreOne = 0;
    scoreTwo = 0;
    time = 10;
    console.log('reset');
    $playerOne.removeAttr('style');
    $playerTwo.removeAttr('style');
    resetTimer();
    startGame();
    toggleBoard();
  }

  function exitGame() {
    location.reload();
  }

  function startGame() {
    $daveDiv.text(' ');
    $score1.text(0);
    $score2.text(0);
    toggleBoard();
    startTimer();
  }

  function startTimer() {
    stopTimer();
    time = 10;
    generateQuestion();
    timerId = setInterval(() => {
      time--;
      $timer.html(time);
    }, 1000);
    totalTime = setTimeout(()=> {
      clearInterval(timerId);
      gameOver();  //need here?
    }, 10000);
  }

  function resetTimer() {
    clearInterval(timerId);
    clearTimeout(totalTime);
    time = 10;
    $timer.html(time);
    startTimer();
  }

  function stopTimer() {
    clearInterval(timerId);
    clearTimeout(totalTime);
    time = 10;
    $timer.html(time);
    $questionDiv.text('  ');
    $answers.text(' ');
  }

//this gets rid of the middleBoardButton
  function toggleBoard() {
    $hidden.toggle();
    $middleBoardButton.toggle();
  }

//pop te last question from array and display the question under "questionDiv" and pop the choices as individual buttons with class "answers"
  function generateQuestion() {
    popped = listOfQuestions.pop();
    $questionDiv.text(popped.question);
    $answers.empty();
    popped.choices.forEach((choice) => {
      $answers.append(`<button>${choice}</button>`);
    });
  }

  //when player chooses, checkForMatch function is run.
  const $answers = $('.answers');
  $answers.on('click', 'button', checkForMatch);

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

      if ((scoreOne !== 5) && (scoreTwo !== 5)) {  //checking no one has won yet (5 points)
        $tvSet.fadeIn();  //if point scored, tvSet fades in and div moves up one space.
        console.log(currentPlayer);
        const $chairToMove = $('#'+currentPlayer);
        if (currentPlayer === 'playerOne') {
          $chairToMove.animate({left: '-=60', bottom: '+=60'}, 500);
        } else if (currentPlayer === 'playerTwo') {
          $chairToMove.animate({right: '-=60', bottom: '+=60'}, 500);
        }

        setTimeout(()=> {
          $tvSet.fadeOut('slow');
          console.log($chairToMove);
          resetTimer();
          togglePlayer(); //change players
        }, 1000);
        // Dave - Thats correct!  noise
      } else { // if 5th point, player wins
        playerWin();

      }

    } else {
      console.log('Incorrect');
      $daveDiv.text('Incorrect');
      resetTimer();
      togglePlayer();
      // Dave - Thats Incorrect!  noise
    }

    questionCounter++;
    $score1.text(`${scoreOne}`);
    $score2.text(`${scoreTwo}`);
  }

  function togglePlayer() {
    currentPlayer = currentPlayer === 'playerOne' ? 'playerTwo' : 'playerOne';
  }

  function playerWin() {
    $daveDiv.text('You\ve Won!');
    dunkPlayer();
    // gameFinish();
    //play dunk music
  }

  function dunkPlayer(){
    $tvSet.fadeIn();
    console.log(currentPlayer);
    const $chairToMove = $('#'+currentPlayer);
    if (currentPlayer === 'playerOne') {
      // $chairToMove moves up first and then dunks
      $chairToMove.animate({left: '-=60', bottom: '+=60'}, 500);
      $chairToMove.animate({left: '+=350', top: '+=350'}, 1000);
      $gunge.animate({left: '+=10'}, 1500);
      $gunge.animate({bottom: '+=60'}, 1000);

    } else if (currentPlayer === 'playerTwo') {
      $chairToMove.animate({right: '-=60', bottom: '+=60'}, 500);
      ///SOUND GET YOUR OWN BACK - wait for clip to finsih
      $chairToMove.animate({left: '-=350', top: '+=350'}, 1000);
      $gunge.animate({left: '+=10'}, 1500);
      $gunge.animate({bottom: '+=60'}, 1000);
    }
    setTimeout(()=> {

      $tvSet.fadeOut('slow');
      console.log($chairToMove);
      // $tvSet.fadeOut();  //.delay(5000).fadeTo('slow', 0.6);
      // resetTimer();
      togglePlayer(); //change players
      gameFinish();
      $questionBoard.css(
        {visibility: 'hidden'});
    }, 3000);


  }

//fucntion for when either player one or player two wins:

  function gameFinish() {
    if (scoreOne === 5) {
      $finish1.css(
      {visibility: 'visible'});

    } else {
      $finish2.css(
        {visibility: 'visible'});
    }
  }

//loads finish page
//    - congratulations player "one/Two" you've got yor own back!
//    - want to play again? (button)

//functionality:
  // - reset game (questionboard now becomes hidden)

//function for when timer gets to zero = GAME OVER

// game over page becomes visable
  // "you ran out of time"
  // play again button?
  function gameOver() {
      // if (time === 0) {
    $questionBoard.css(
      {visibility: 'hidden'});
    $gameOver.css(
          {visibility: 'visible'});
    // }
  }

  // }
  // }
});
