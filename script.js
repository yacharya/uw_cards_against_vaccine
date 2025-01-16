// Example card data
const blackCardsCollection = [
    "10% of Participants experience ____",
    "One in five agree,",
    "New studies claim vaccines cause ____.",
    "Wipe your tears",
    "Just for me"
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

// Second Round card data
const whiteCardsSecondRound = [
    "Second Round White 1",
    "Second Round White 2",
    "Second Round White 3",
    "Second Round White 4"
];

const greyCardsSecondRound = [
    "Second Round Grey 1",
    "Second Round Grey 2",
    "Second Round Grey 3",
    "Second Round Grey 4"
];

const blackCardsSecondRound = [
    "Popular Dentist Influencer Highlights Link Between Vaccines and Heart Murmurs",
    "25% of People Surveyed Still Get Flu After Getting Vaccinated—What Are We Not Being Told?",
    "One in 9 Parents Admit They Regret Getting Covid Booster",
    "Scientists Divided: Could HPV Vaccines Cause Fertility Issues",
    "Heartbreaking Tragedy After Vaccination: Innocent Children Suffer Migraines"
];

// Game state
let currentScreen = 'introduction';
let numPlayers = 2;
let scores = [];
let chosenBlackCard = null;
let chosenWhiteCards = [];
let playerHands = [];
let roundBlackCards = [];

// Second Round state
let selectedWhiteCardSecondRound = null;
let selectedGreyCardSecondRound = null;
let selectedBlackCardSecondRound = null;

// DOM elements
const introductionScreen = document.getElementById('introduction-screen');
const gameScreen = document.getElementById('game-screen');
const secondRoundScreen = document.getElementById('second-round-screen');
const gameOverScreen = document.getElementById('game-over-screen');

const blackCardsContainer = document.getElementById('black-cards-container');
const chosenBlackCardSection = document.getElementById('chosen-black-card-section');
const chosenBlackCardDiv = document.getElementById('chosen-black-card');
const chosenWhiteCardsDiv = document.getElementById('chosen-white-cards');
const playersContainer = document.getElementById('players-container');
const finalScoresList = document.getElementById('final-scores-list');

const startGameBtn = document.getElementById('startGameBtn');
const nextRoundBtn = document.getElementById('nextRoundBtn');
const secondRoundBtn = document.getElementById('secondRoundBtn');
const endSecondRoundBtn = document.getElementById('endSecondRoundBtn');
const submitSecondRoundBtn = document.getElementById('submitSecondRoundBtn');
const successMessage = document.getElementById('successMessage');
const restartBtn = document.getElementById('restartBtn');
const numPlayersInput = document.getElementById('numPlayers');

// Second Round DOM elements
const whiteCardsSecondRoundContainer = document.getElementById('white-cards-second-round');
const greyCardsSecondRoundContainer = document.getElementById('grey-cards-second-round');
const blackCardsSecondRoundContainer = document.getElementById('black-cards-second-round');
const selectedWhiteCardDiv = document.getElementById('selected-white-card');
const selectedGreyCardDiv = document.getElementById('selected-grey-card');
const selectedBlackCardDiv = document.getElementById('selected-black-card');

// Show a specific screen
function showScreen(screen) {
    introductionScreen.classList.remove('visible');
    gameScreen.classList.remove('visible');
    secondRoundScreen.classList.remove('visible');
    gameOverScreen.classList.remove('visible');

    if (screen === 'introduction') {
        introductionScreen.classList.add('visible');
    } else if (screen === 'game') {
        gameScreen.classList.add('visible');
    } else if (screen === 'second-round') {
        secondRoundScreen.classList.add('visible');
    } else if (screen === 'gameover') {
        gameOverScreen.classList.add('visible');
    }
}

// Shuffle an array
function shuffleArray(arr) {
    const array = arr.slice();
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Start the game
function startGame() {
    numPlayers = parseInt(numPlayersInput.value, 10);
    scores = new Array(numPlayers).fill(0);
    initializeRound();
    showScreen('game');
}

// Initialize a new round
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
        playerHands.push(shuffledWhite.slice(i * 4, i * 4 + 4));
    }

    renderGame();
}

// Render the game screen
function renderGame() {
    // Render black cards
    blackCardsContainer.innerHTML = '';
    roundBlackCards.forEach((card) => {
        const div = document.createElement('div');
        div.className = 'black-card';
        const p = document.createElement('p');
        p.textContent = card;
        div.appendChild(p); // Wrap the text in a p tag
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
    // In the renderGame function, update the player hand creation
    playerHands.forEach((hand, playerIndex) => {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player-section';

        const title = document.createElement('h3');
        title.textContent = "Player " + (playerIndex + 1);
        playerDiv.appendChild(title);

        const scoreP = document.createElement('p');
        scoreP.textContent = "Score: " + scores[playerIndex];
        playerDiv.appendChild(scoreP);

        // Create a container for the white cards
        const whiteCardContainer = document.createElement('div');
        whiteCardContainer.className = 'white-card-container'; // Add this class for the grid layout

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
            whiteCardContainer.appendChild(cardDiv); // Add white cards to the container
        });

        playerDiv.appendChild(whiteCardContainer); // Add the container to the player section
        playersContainer.appendChild(playerDiv);
    });
}

// Choose a black card
function chooseBlackCard(card) {
    chosenBlackCard = card;
    renderGame();
}

// Choose a white card
function chooseWhiteCard(playerIndex, cardIndex) {
    if (!chosenBlackCard) return;

    const card = playerHands[playerIndex][cardIndex];
    chosenWhiteCards.push(card);
    scores[playerIndex] += 1;

    // Remove card from player's hand
    playerHands[playerIndex].splice(cardIndex, 1);
    renderGame();
}

// Start the next round
function nextRound() {
    initializeRound();
}

// End the game
function endGame() {
    finalScoresList.innerHTML = '';
    scores.forEach((score, idx) => {
        const li = document.createElement('li');
        li.textContent = "Player " + (idx + 1) + ": " + score;
        finalScoresList.appendChild(li);
    });
    showScreen('gameover');
}

// Restart the game
function restartGame() {
    showScreen('introduction');
}

// Render the Second Round screen
function renderSecondRound() {
    // Render white cards (only 3 cards)
    whiteCardsSecondRoundContainer.innerHTML = '';
    whiteCardsSecondRound.slice(0, 3).forEach((card) => {
        const div = document.createElement('div');
        div.className = 'white-card';
        div.textContent = card;
        div.addEventListener('click', () => selectCard('white', card));
        whiteCardsSecondRoundContainer.appendChild(div);
    });

    // Render grey cards (only 3 cards)
    greyCardsSecondRoundContainer.innerHTML = '';
    greyCardsSecondRound.slice(0, 3).forEach((card) => {
        const div = document.createElement('div');
        div.className = 'grey-card';
        div.textContent = card;
        div.addEventListener('click', () => selectCard('grey', card));
        greyCardsSecondRoundContainer.appendChild(div);
    });

    // Render black cards (only 3 cards)
    blackCardsSecondRoundContainer.innerHTML = '';
    blackCardsSecondRound.slice(0, 3).forEach((card) => {
        const div = document.createElement('div');
        div.className = 'black-card';
        div.textContent = card;
        div.addEventListener('click', () => selectCard('black', card));
        blackCardsSecondRoundContainer.appendChild(div);
    });

    // Update selected cards display
    selectedWhiteCardDiv.textContent = selectedWhiteCardSecondRound || "Select a White Card";
    selectedGreyCardDiv.textContent = selectedGreyCardSecondRound || "Select a Grey Card";
    selectedBlackCardDiv.textContent = selectedBlackCardSecondRound || "Select a Black Card";

    // Show submit button if all cards are selected
    if (selectedWhiteCardSecondRound && selectedGreyCardSecondRound && selectedBlackCardSecondRound) {
        submitSecondRoundBtn.style.display = 'block';
    } else {
        submitSecondRoundBtn.style.display = 'none';
    }
}

// Select a card in the Second Round
function selectCard(type, card) {
    if (type === 'white') {
        selectedWhiteCardSecondRound = card;
    } else if (type === 'grey') {
        selectedGreyCardSecondRound = card;
    } else if (type === 'black') {
        selectedBlackCardSecondRound = card;
    }
    renderSecondRound();
}

// Submit the Second Round
function submitSecondRound() {
    successMessage.style.display = 'block';
    submitSecondRoundBtn.style.display = 'none';
}

// Event listeners
startGameBtn.addEventListener('click', startGame);
nextRoundBtn.addEventListener('click', nextRound);
secondRoundBtn.addEventListener('click', () => {
    showScreen('second-round');
    renderSecondRound();
});
submitSecondRoundBtn.addEventListener('click', submitSecondRound);
endSecondRoundBtn.addEventListener('click', endGame);
restartBtn.addEventListener('click', restartGame);