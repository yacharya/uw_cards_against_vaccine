// Example card data
  const blackCardsCollection = [
    "10% of Participants experience ____",
    "One in five agree that the COVID-19 vaccine leads to ____",
    "New studies claim vaccines cause ____. What does it mean for _____?",
    "Black card prompt 4",
    "Black card prompt 5"
  ];

  const whiteCardsCollection = [
    "Funny answer 1",
    "Funny answer 2",
    "Funny answer 3",
    "Funny answer 4",
    "Funny answer 5",
    "Funny answer 6",
    "Funny answer 7",
    "Funny answer 8",
    "Funny answer 9",
    "Funny answer 10",
    "Funny answer 11",
    "Funny answer 12",
    "Funny answer 13",
    "Funny answer 14",
    "Funny answer 15",
    "Funny answer 16"
  ];

  let currentScreen = 'introduction'; // introduction | game | gameover
  let numPlayers = 2;
  let scores = [];
  let chosenBlackCard = null;
  let chosenWhiteCards = [];
  let playerHands = [];
  let roundBlackCards = [];

  const introductionScreen = document.getElementById('introduction-screen');
  const gameScreen = document.getElementById('game-screen');
  const gameOverScreen = document.getElementById('game-over-screen');

  const blackCardsContainer = document.getElementById('black-cards-container');
  const chosenBlackCardSection = document.getElementById('chosen-black-card-section');
  const chosenBlackCardDiv = document.getElementById('chosen-black-card');
  const chosenWhiteCardsDiv = document.getElementById('chosen-white-cards');
  const playersContainer = document.getElementById('players-container');
  const finalScoresList = document.getElementById('final-scores-list');

  const startGameBtn = document.getElementById('startGameBtn');
  const nextRoundBtn = document.getElementById('nextRoundBtn');
  const endGameBtn = document.getElementById('endGameBtn');
  const restartBtn = document.getElementById('restartBtn');
  const numPlayersInput = document.getElementById('numPlayers');

  function showScreen(screen) {
    // Hide all screens
    introductionScreen.classList.remove('visible');
    gameScreen.classList.remove('visible');
    gameOverScreen.classList.remove('visible');

    if (screen === 'introduction') {
      introductionScreen.classList.add('visible');
    } else if (screen === 'game') {
      gameScreen.classList.add('visible');
    } else if (screen === 'gameover') {
      gameOverScreen.classList.add('visible');
    }
  }

  function shuffleArray(arr) {
    const array = arr.slice();
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function startGame() {
    numPlayers = parseInt(numPlayersInput.value, 10);
    scores = new Array(numPlayers).fill(0);
    initializeRound();
    showScreen('game');
  }

  function initializeRound() {
    chosenBlackCard = null;
    chosenWhiteCards = [];

    // Pick 3 black cards
    const shuffledBlack = shuffleArray(blackCardsCollection);
    roundBlackCards = shuffledBlack.slice(0, 3);

    // Distribute 4 white cards per player
    const shuffledWhite = shuffleArray(whiteCardsCollection);
    playerHands = [];
    for (let i = 0; i < numPlayers; i++) {
      playerHands.push(shuffledWhite.slice(i*4, i*4+4));
    }

    renderGame();
  }

  function renderGame() {
    // Render black cards
    blackCardsContainer.innerHTML = '';
    roundBlackCards.forEach((card) => {
      const div = document.createElement('div');
      div.className = 'black-card';
      div.textContent = card;
      div.addEventListener('click', () => chooseBlackCard(card));
      // If black card is chosen and this card is not the chosen one, hide it
      if (chosenBlackCard && chosenBlackCard !== card) {
        div.style.display = 'none';
      }
      blackCardsContainer.appendChild(div);
    });

    if (chosenBlackCard) {
      chosenBlackCardSection.style.display = 'block';
      chosenBlackCardDiv.textContent = chosenBlackCard;
    } else {
      chosenBlackCardSection.style.display = 'none';
    }

    // Render chosen white cards
    chosenWhiteCardsDiv.innerHTML = '';
    chosenWhiteCards.forEach((c) => {
      const div = document.createElement('div');
      div.className = 'chosen-white-card';
      div.textContent = c;
      chosenWhiteCardsDiv.appendChild(div);
    });

    // Render players
    playersContainer.innerHTML = '';
    playerHands.forEach((hand, playerIndex) => {
      const playerDiv = document.createElement('div');
      playerDiv.className = 'player-section';

      const title = document.createElement('h3');
      title.textContent = "Player " + (playerIndex + 1);
      playerDiv.appendChild(title);

      const scoreP = document.createElement('p');
      scoreP.textContent = "Score: " + scores[playerIndex];
      playerDiv.appendChild(scoreP);

      const handDiv = document.createElement('div');
      hand.forEach((card, cardIndex) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'white-card';
        cardDiv.textContent = card;
        cardDiv.addEventListener('click', () => chooseWhiteCard(playerIndex, cardIndex));
        // Disable white card selection if no black card chosen
        if (!chosenBlackCard) {
          cardDiv.style.opacity = 0.5;
          cardDiv.style.pointerEvents = 'none';
        }
        handDiv.appendChild(cardDiv);
      });
      playerDiv.appendChild(handDiv);

      playersContainer.appendChild(playerDiv);
    });
  }

  function chooseBlackCard(card) {
    chosenBlackCard = card;
    renderGame();
  }


  function chooseWhiteCard(playerIndex, cardIndex) {
    if (!chosenBlackCard) return;

    const card = playerHands[playerIndex][cardIndex];
    chosenWhiteCards.push(card);
    scores[playerIndex] += 1;

    // Remove card from player's hand
    playerHands[playerIndex].splice(cardIndex, 1);
    renderGame();
  }


  function nextRound() {
    initializeRound();
  }

  function endGame() {
    // Show scores in game over screen
    finalScoresList.innerHTML = '';
    scores.forEach((score, idx) => {
      const li = document.createElement('li');
      li.textContent = "Player " + (idx+1) + ": " + score;
      finalScoresList.appendChild(li);
    });
    showScreen('gameover');
  }

  function restartGame() {
    showScreen('introduction');
  }

  // Event listeners
  startGameBtn.addEventListener('click', startGame);
  nextRoundBtn.addEventListener('click', nextRound);
  endGameBtn.addEventListener('click', endGame);
  restartBtn.addEventListener('click', restartGame);