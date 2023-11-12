const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelectorAll(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lives: document.querySelector(".menu-lives h2"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentLives: 3,
    curretTime: 60,
    hitsToWin: 10,
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimeId: setInterval(countDown, 1000),
  },
};

function countDown() {
  state.values.curretTime--;
  state.view.timeLeft.textContent = state.values.curretTime;

  if (state.values.curretTime <= 0 || state.values.currentLives <= 0) {
    clearInterval(stateactions.countDownTimeId);
    clearInterval(stateactions.timerId);
    endGame();
  }
}

function endGame() {
  if (state.values.result >= state.values.hitsToWin) {
    alert("Parabéns! Você ganhou com uma pontuação de" + state.values.result)
  } else {
    alert("Game Over! Sua pontuação final é: " + state.values.result)
  }
}

function playSound(audioName) {
  let audio = new Audio(`../audios/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListinerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;

        if (state.values.result >= state.values.hitsToWin) {
          endGame();
        } else {
          randomSquare();
        }
      } else {
        state.values.currentLives--;
        state.view.lives.textContent = "x" + state.values.currentLives;
        playSound("hit");
      }
    });
  });
}

function initialize() {
  addListinerHitBox();
}

initialize();
