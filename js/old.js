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


  const $questionDiv = $('.question');
  const $daveDiv = $('.daveDiv');

  const $timer = $('.timer');
  // const $firstButton = $('.readyButton')
  const $score1 = $('#score1');
  const $score2 = $('#score2');
  const $hidden = $('.hidden');
  // const $chairToMove = $('#'+currentPlayer);
  // const $audio = $('.audio.middleBoardButton');
  const $gunge = $('.gunge');

  // 3 divs to move between (welcome then goes to the question board whcih goes to the tv set and back again.)
  //maybe include a forth for the finish.
  const $questionBoard = $('.questionBoard');
  const $welcomeScreen = $('.welcomeScreen');
  const $tvSet = $('.tvSet');
  let timerId;
  let totalTime;

//3 buttons:

  const $welcomeButton = $('.welcomeButton');
  const $middleBoardButton = $('.middleBoardButton');
  const $reset = $('.reset');

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

//on load screen - div class welcome screen is visable, all other screens are hidden
//press "ready to go to tstart the game"

// $(".Reply-open-button-1").click(function () {
//     $("div.Reply-div-1").show("slow");
//
//     $("div.Alert-div-1").hide("slow");
//     $("div.Close-div-1").hide("slow");
// });

  $welcomeButton.on('click',() => {

    console.log('click me!');
    $welcomeScreen.css(
      {visibility: 'hidden'});
    $questionBoard.css(
      {visability: 'visible'});
  });

  // $middleBoardButton.on('click', generateQuestion);
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

//startGame = used at the beggining to start the game.
  function startGame() {
    // $welcomeScreen.hidden();
    // $questionBoard.fadeIn();
    $daveDiv.text(' ');
    $score1.text(0);
    $score2.text(0);
    console.log(currentPlayer);
    console.log(scoreOne);
    console.log(scoreTwo);
    console.log(questionCounter);
    toggleBoard();
    startTimer();
  }
//functions:
// (1)$button.on('click', startTimer); // To create start timer function

  function startTimer() {
    time = 10;
    generateQuestion();
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

  function stopTimer() {
    clearInterval(timerId);
    clearTimeout(totalTime);
    time = 10;
    $timer.html(time);
    $questionDiv.text('  ');
    $answers.text(' ');
  }

  function toggleBoard() {
    $hidden.toggle();
    $middleBoardButton.toggle();
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

    // $("#"+styleTarget).css({'font-size':'"+$(this).val()+"px'});

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

      if ((scoreOne !== 5) && (scoreTwo !== 5)) {
        $tvSet.fadeIn();
        console.log(currentPlayer);
        const $chairToMove = $('#'+currentPlayer);
        if (currentPlayer === 'playerOne') {
          $chairToMove.animate({left: '-=50', bottom: '+=50'}, 500);
        } else if (currentPlayer === 'playerTwo') {
          $chairToMove.animate({right: '-=50', bottom: '+=50'}, 500);
        }
        setTimeout(()=> {

          $tvSet.fadeOut('slow');
          console.log($chairToMove);
          resetTimer();  //resets the timer after each time the player climbs the crank
          togglePlayer(); //change players
        }, 1000);
        // Dave - Thats correct!  noise
        //chair moves one space up
      } else { // if final point
        playerWin();          //check for player one win
        gameOver();
      }

    } else {
      console.log('Incorrect');
      $daveDiv.text('Incorrect');
      resetTimer();
      togglePlayer(); //change players
      // Dave - Thats Incorrect!  noise
      //chair moves one space up
    }

    questionCounter++;
    console.log('scoreOne');
    console.log(scoreOne);
    console.log('scoreTwo');
    console.log(scoreTwo);
    console.log('questionCounter');
    console.log(questionCounter);
    console.log(currentPlayer);
    $score1.text(`${scoreOne}`);
    $score2.text(`${scoreTwo}`);
  }

//showing the scoreboard at the bottom of the page to keep tabs on the score without having to use the console.
  $score1.text(`${scoreOne}`);
  $score2.text(`${scoreTwo}`);
//
//(4) change between player one and player two.
  function togglePlayer() {
    currentPlayer = currentPlayer === 'playerOne' ? 'playerTwo' : 'playerOne';
  }

// (5) function to determine whether player one has won yet:
  function playerWin() {
    $daveDiv.text('You\ve Won!');
    console.log('player wins');
    dunkPlayer();
    gameFinish();
    //play dunk music
  }
  // function playerTwoWin() {
  //   $daveDiv.text('Player Two has won!');
  //   console.log('p2 wins');
  //   dunkPlayer();
  //   gameFinish();
  // }

//finsih game?
//big dave speaks and finsihes the game, player then given the option of re-starting

//(6) reset game at end

//   $reset.on('click', ()=>{
//     location.reload();
// //   //location.reload();
//     // $playerOne.text(0);
//     // $playerTwo.text(0);
//     //   $result.text('');
//     $score1.text(0);
//     $score2.text(0);
//     console.log(currentPlayer);
//     console.log(scoreOne);
//     console.log(scoreTwo);
//     console.log(questionCounter);
//     resetTimer();
//     // startGame();
//     $daveDiv.text('New game, quick!!!');
//   });

  function resetGame() {
    // location.reload();
    $score1.text(0);
    $score2.text(0);
    scoreOne = 0;
    scoreTwo = 0;
    time = 10;
    $playerOne.removeAttr('style');
    $playerTwo.removeAttr('style');
    // resetTimer();
    // startGame();
  //   $daveDiv.text('New game, quick!!!');
  //   $playerOne.css({top: 450, left: 400, position: 'absolute'});
  //   $playerTwo.css({right: '-=50', bottom: '+=50'}, 500);
  }



  function dunkPlayer(){
    $tvSet.fadeIn();
    // write any logic that you want to do when you move the chairs
    console.log(currentPlayer);
    const $chairToMove = $('#'+currentPlayer);
    if (currentPlayer === 'playerOne') {
      // $chairToMove moves up first
      $chairToMove.animate({left: '-=50', bottom: '+=50'}, 500);
      $chairToMove.animate({left: '+=350', top: '+=350'}, 1000);
      $gunge.animate({left: '+=10'}, 1500);
      $gunge.animate({bottom: '+=40'}, 1000);
    } else if (currentPlayer === 'playerTwo') {
      $chairToMove.animate({right: '-=50', bottom: '+=50'}, 500);
      ///SOUND GET YOUR OWN BACK - wait for clip to finsih
      $chairToMove.animate({left: '-=350', top: '+=350'}, 1000);
      $gunge.animate({left: '+=10'}, 1500);
      $gunge.animate({bottom: '+=40'}, 1000);
    }
    setTimeout(()=> {

      $tvSet.fadeOut('slow');
      console.log($chairToMove);
      // $tvSet.fadeOut();  //.delay(5000).fadeTo('slow', 0.6);
      // resetTimer();
      togglePlayer(); //change players
    }, 3000);
    gameFinish();
  }

  function gameFinish() {
    if ((scoreOne === 5) || (scoreTwo === 5)) {
      stopTimer();
      resetGame();
      $daveDiv.html('GET YOUR OWN BACK!');
      toggleBoard();
      $middleBoardButton.html('Play again?');
    // $middleBoardButton.on('click', startGame);

      // console.log(currentPlayer);
      // console.log(scoreOne);
      // console.log(scoreTwo);
      // console.log(questionCounter);
    }
  }

  function gameOver() {
    if (time === 0)
      $daveDiv.html('GAMEOVER!');
    // toggleBoard();
    $middleBoardButton.html('Play again?');
    // $middleBoardButton.on('click', startGame);
      // $score1.text(0);
      // $score2.text(0);
      // console.log(currentPlayer);
      // console.log(scoreOne);
      // console.log(scoreTwo);
      // console.log(questionCounter);
  }

});
