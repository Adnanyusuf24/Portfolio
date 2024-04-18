let score = 0;
let gameDuration = 60; // Game duration in seconds
let intervalId = null;
let countDownId = null;

document.addEventListener('DOMContentLoaded', function() {
    const gameMode = localStorage.getItem('gameMode');
    const sensitivity = localStorage.getItem('sensitivity');
    const alignment = localStorage.getItem('alignment');

    console.log('Game Mode:', gameMode);
    console.log('Sensitivity:', sensitivity);
    console.log('Alignment:', alignment);
    
    // Only prepare the game settings without starting the game
    prepareGame(gameMode, sensitivity, alignment);
});

function prepareGame(gameMode, sensitivity, alignment) {
    // Setup game based on settings. Do not display game or start countdown.
    // For example, adjust sensitivity settings or alignment here
}

function startGame() {
    // The actual start game logic
    document.getElementById('gameContainer').style.display = 'block';
    score = 0;
    gameDuration = 30;
    updateScoreAndTime();
    clearInterval(intervalId);
    clearInterval(countDownId);
    intervalId = setInterval(generateTarget, 1000);
    countDownId = setInterval(countDown, 1000);
}

function updateScoreAndTime() {
    document.getElementById('score').textContent = score;
    document.getElementById('timeLeft').textContent = gameDuration;
}

function generateTarget() {
    const gameContainer = document.getElementById('gameContainer');
    // Remove all existing targets before generating a new one
    while (gameContainer.firstChild) {
        gameContainer.removeChild(gameContainer.firstChild);
    }

    const target = document.createElement('div');
    target.className = 'target';

    // Ensure the target doesn't spawn at the very edges
    const margin = 25; // Margin from the edge
    const maxX = gameContainer.offsetWidth - target.offsetWidth - margin;
    const maxY = gameContainer.offsetHeight - target.offsetHeight - margin;
    const minX = margin;
    const minY = margin;

    target.style.top = `${Math.random() * (maxY - minY) + minY}px`;
    target.style.left = `${Math.random() * (maxX - minX) + minX}px`;

    target.addEventListener('click', hitTarget);
    gameContainer.appendChild(target);

    // Adjust visibility duration based on the game mode
    let visibilityDuration = 900; // Default for Easy mode
    if (localStorage.getItem('gameMode') === 'Hard') {
        visibilityDuration = 600;
    } else if (localStorage.getItem('gameMode') === 'Medium') {
        visibilityDuration = 750;
    }

    setTimeout(() => {
        if (target.parentNode) {
            target.parentNode.removeChild(target);
        }
    }, visibilityDuration);
}



function hitTarget(event) {
    // Only proceed if the score element exists
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
        score += 1;
        scoreElement.textContent = score;
        event.currentTarget.parentNode.removeChild(event.currentTarget);
        event.stopImmediatePropagation();
    }
}


function countDown() {
    gameDuration -= 1;
    let timeLeftElement = document.getElementById('timeLeft');
    
    if (gameDuration <= 0) {
        clearInterval(intervalId);
        clearInterval(countDownId);
        endGame();
    } else if(timeLeftElement) {
        timeLeftElement.textContent = gameDuration;
    }
}



function showModal(score) {
    document.getElementById('simpleModalScore').textContent = score;
    document.getElementById('simpleModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('simpleModal').style.display = 'none';
    window.location.href = '/aim-trainer/leaderboard';
}



function endGame() {
    const username = localStorage.getItem('username'); // Ensure username is set in localStorage
    const gameMode = localStorage.getItem('gameMode');

    // Send the game results to the server
    fetch('/aim-trainer/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            difficulty: gameMode,
            hits: score
        })
    })
    .then(response => {
        if (!response.ok) { // Checks if the response status code is not in the range 200-299
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Game result saved:', data);
        document.getElementById('gameContainer').style.display = 'none';
        document.getElementById('gameContainer').innerHTML = '';
        document.getElementById('score').textContent = '0';
        document.getElementById('timeLeft').textContent = '60';
        showModal('Game Over! Your score: ' + score); // Correctly showing the custom alert
    })
    .catch(error => {
        console.error('Error saving game data:', error);
        showModal('Failed to save game data.');
    });    
}

document.getElementById('gameContainer').addEventListener('click', function(event) {
    if (event.target.className === 'target') {
        hitTarget(event);
    }
});