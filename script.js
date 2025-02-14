// Example card data
const blackCardsCollection = [
    "10% of Study Participants Experience ___",
    "Heartbreaking Tragedy After Vaccination: Innocent Children Suffer ___",
    "Secret Government Plot? Experts Warn Monkey Pox Vaccine Could Lead To ___",
    "New Studies Claim Vaccines Cause ____. What does it mean for children?",
    "40% of People Experience ___ After Vaccination",
    "One in Five ___ Agree That the Covid-19 Vaccine Leads to Fatigue",
    "Alarming Spike in ___ Following Booster Rollout",
    "Scientists Divided: Could HPV Vaccines Cause ___",
    "Popular Dentist Influencer Highlights Link Between Vaccines and ___",
    "Majority of Vaccine Recipients Report Feeling ___ —Is It Worth the Risk?",
    "25% of People Report ___ After Getting Vaccinated—What Are We Not Being Told?",
    "Groundbreaking New Study Finding: Vaccines Linked to ___",
    "Shocking: ___ Found to Have Heart Murmurs After Flu Vaccine",
    "___ Warns: Long-term Impacts of RSV Vaccine Still Unknown",
    "Official Data Reveals 10% Increase in ___ Following Vaccine Rollout",
    "Half of All Cancer Patients Show Signs of ___ Due to Vaccination",
    "One in 9 ___ Admit They Regret Getting Covid Booster",
    "Popular YouTuber Says They’ve Uncovered “Proof” of Link Between Vaccines and ___",
    "Viral Post Warns of ___ Caused by Flu Vaccine",
    "___ Question: Why Are They Pushing Covid Boosters So Hard?"
];

const whiteCardsCollection = [
    "Population Control",
    "Color Changing Skin",
    "Involuntary Dance",
    "Spontaneous Combustion",
    "Allergic Reactions",
    "Behavioral Change",
    "Deep Sadness",
    "The Future",
    "Children",
    "Death",
    "Regret",
    "Old Age",
    "Low Self Esteem",
    "Dentists",
    "Chiropractors",
    "Mothers",
    "Dancers",
    "Soreness",
    "Complications",
    "Sleepiness",
    "Doctors",
    "Extreme Joy",
    "Heartbreak",
    "Disease",
    "Unknown Effects",
    "Liver Problems",
    "Unexplained Illness",
    "Famous Podcaster",
    "TikToker",
    "Long-term Problems"
];

// Second Round card data
const whiteCardsSecondRound = [
    "Fake /Unknown/ Uncredible experts: hiding or fabricating the credentials of quoted experts or relying on sources who have adjacent but not professional or expert knowledge",
    "Conspiracy theories: suggests events are part of larger, connected plans by powerful groups or individuals.",
    "Emotional appeals: specifically targeting someone’s feelings, particularly negative ones e.g. fear, anger, despair",
    "Manufacturing social consensus: creating a false sense of social (dis)agreement by amplifying select voices",
    "Cherry-picking data: choosing data selectively to create a certain outcome e.g. only showing the best or worst results to support your argument"
];

const greyCardsSecondRound = [
    "Dentists are not experts in immunology or cardiology and so do not have the professional expertise to make such a claim. Further, there are no peer-reviewed studies linking vaccines to heart murmurs, instead there exists scientific consensus on the safety and efficacy of vaccines.",
    "Flu vaccines are designed to reduce the severity of illness and the risk of complications, not guarantee complete immunity. Some people can still contract a flu strain not covered by the vaccine or have partial protection due to individual immune response variability.",
    "Headlines can often cherry pick survey results, the majority of people (in the survey mentioned in the headline) and in real life have no regrets post-vaccination. COVID boosters have been shown to reduce severe illness and save lives, as supported by extensive global studies.",
    "Extensive research and clinical studies have shown that vaccines, including those for HPV and COVID-19, have no adverse effects on fertility in men or women. Most scientists agree on their safety and effectiveness in preventing HPV-related cancers.",
    "Migraines can occur for many reasons and are not a known side effect of vaccines. While any health issue in children is concerning, headlines can often activate and weaponize our emotional responses, particularly focusing on our desire to protect vulnerable populations. "
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
const secondRoundIntroScreen = document.getElementById('second-round-intro-screen');
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
const secondRoundIntroBtn = document.getElementById('secondRoundIntroBtn');
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
    secondRoundIntroScreen.classList.remove('visible');
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
    } else if (screen === 'second-round-intro') {
        secondRoundIntroScreen.classList.add('visible');
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
    /*
    chosenWhiteCards.forEach((c) => {
        const div = document.createElement('div');
        div.className = 'chosen-white-card';
        div.textContent = c;
        chosenWhiteCardsDiv.appendChild(div);
    });
    */
    chosenWhiteCards.forEach((chosen, index) => {
        const { cardText, ownerIndex } = chosen;
        
        const div = document.createElement('div');
        div.className = 'chosen-white-card';
        div.textContent = cardText;
    
        // When the Master Manipulator clicks, award the point:
        div.addEventListener('click', () => {
            // Increase score for the card's owner
            scores[ownerIndex] += 1;
    
            // (Optional) Remove this chosen card if only one can win:
            chosenWhiteCards.splice(index, 1);
    
            // Re-render game to show updated scores
            renderGame();
        });
    
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
    chosenWhiteCards.push({
        cardText: card,
        ownerIndex: playerIndex
    });

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
    // Reset Second Round state
    selectedWhiteCardSecondRound = null;
    selectedGreyCardSecondRound = null;
    selectedBlackCardSecondRound = null;

    // Hide the "Submit" button and "Great job!" message
    submitSecondRoundBtn.style.display = 'none';
    successMessage.style.display = 'none';

    // Clear the selected cards display
    selectedWhiteCardDiv.textContent = "Select a White Card";
    selectedGreyCardDiv.textContent = "Select a Grey Card";
    selectedBlackCardDiv.textContent = "Select a Black Card";

    // Reset the game state
    currentScreen = 'introduction';
    numPlayers = 2;
    scores = [];
    chosenBlackCard = null;
    chosenWhiteCards = [];
    playerHands = [];
    roundBlackCards = [];

    // Show the introduction screen
    showScreen('introduction');
}

// Render the Second Round screen
function renderSecondRound() {
    // Render white cards (only 3 cards)
    whiteCardsSecondRoundContainer.innerHTML = '';
    whiteCardsSecondRound.slice(0, 3).forEach((card) => {
        const div = document.createElement('div');
        div.className = 'white-card';
        const p = document.createElement('p');
        p.textContent = card;
        div.appendChild(p); // Wrap the text in a p tag
        div.addEventListener('click', () => selectCard('white', card));
        whiteCardsSecondRoundContainer.appendChild(div);
    });

    // Render grey cards (only 3 cards)
    greyCardsSecondRoundContainer.innerHTML = '';
    greyCardsSecondRound.slice(0, 3).forEach((card) => {
        const div = document.createElement('div');
        div.className = 'grey-card';
        const p = document.createElement('p');
        p.textContent = card;
        div.appendChild(p); // Wrap the text in a p tag
        div.addEventListener('click', () => selectCard('grey', card));
        greyCardsSecondRoundContainer.appendChild(div);
    });

    // Render black cards (only 3 cards)
    blackCardsSecondRoundContainer.innerHTML = '';
    blackCardsSecondRound.slice(0, 3).forEach((card) => {
        const div = document.createElement('div');
        div.className = 'black-card';
        const p = document.createElement('p');
        p.textContent = card;
        div.appendChild(p); // Wrap the text in a p tag
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
    const p = document.createElement('p');
    if (type === 'white') {
        p.textContent = card;
        selectedWhiteCardSecondRound = p.textContent;
        p.textContent = card;
    } else if (type === 'grey') {
        p.textContent = card;
        selectedGreyCardSecondRound = p.textContent;
    } else if (type === 'black') {
        p.textContent = card;
        selectedBlackCardSecondRound = p.textContent;
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
secondRoundIntroBtn.addEventListener('click', () => {
    showScreen('second-round-intro');
});
secondRoundBtn.addEventListener('click', () => {
    showScreen('second-round');
    renderSecondRound();
});
submitSecondRoundBtn.addEventListener('click', submitSecondRound);
endSecondRoundBtn.addEventListener('click', endGame);
restartBtn.addEventListener('click', restartGame);