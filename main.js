document.addEventListener('DOMContentLoaded', function () {
    const player = document.getElementById('player');
    const scoreValue = document.getElementById('score-value');
    let score = 0;

    // Move the player left or right
    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') {
            movePlayer(-10);
        } else if (event.key === 'ArrowRight') {
            movePlayer(10);
        }
    });

    // Function to move the player
    function movePlayer(distance) {
        const currentPosition = parseFloat(window.getComputedStyle(player).getPropertyValue('left'));
        const newPosition = currentPosition + distance;
        if (newPosition >= 0 && newPosition <= window.innerWidth - player.offsetWidth) {
            player.style.left = newPosition + 'px';
        }
    }

    // Function to create obstacles
    function createObstacle() {
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        obstacle.style.left = Math.random() * (window.innerWidth - 50) + 'px';
        document.getElementById('game-container').appendChild(obstacle);

        // Move the obstacle downwards
        const moveInterval = setInterval(function () {
            const bottomPosition = parseFloat(window.getComputedStyle(obstacle).getPropertyValue('bottom'));
            if (bottomPosition <= 0) {
                obstacle.remove();
                clearInterval(moveInterval);
            } else {
                obstacle.style.bottom = bottomPosition - 5 + 'px';

                // Check for collision with the player
                const playerRect = player.getBoundingClientRect();
                const obstacleRect = obstacle.getBoundingClientRect();
                if (
                    playerRect.bottom >= obstacleRect.top &&
                    playerRect.top <= obstacleRect.bottom &&
                    playerRect.right >= obstacleRect.left &&
                    playerRect.left <= obstacleRect.right
                ) {
                    gameOver();
                }
            }
        }, 50);
    }

    // Function to create coins
    function createCoin() {
        const coin = document.createElement('div');
        coin.classList.add('coin');
        coin.style.left = Math.random() * (window.innerWidth - 50) + 'px';
        document.getElementById('game-container').appendChild(coin);

        // Move the coin downwards
        const moveInterval = setInterval(function () {
            const bottomPosition = parseFloat(window.getComputedStyle(coin).getPropertyValue('bottom'));
            if (bottomPosition <= 0) {
                coin.remove();
                clearInterval(moveInterval);
            } else {
                coin.style.bottom = bottomPosition - 5 + 'px';

                // Check for collision with the player
                const playerRect = player.getBoundingClientRect();
                const coinRect = coin.getBoundingClientRect();
                if (
                    playerRect.bottom >= coinRect.top &&
                    playerRect.top <= coinRect.bottom &&
                    playerRect.right >= coinRect.left &&
                    playerRect.left <= coinRect.right
                ) {
                    coin.remove();
                    score++;
                    scoreValue.textContent = score;
                }
            }
        }, 50);
    }

    // Function to end the game
    function gameOver() {
        alert('Game Over! Your score: ' + score);
        window.location.reload();
    }

    // Start creating obstacles and coins
    setInterval(createObstacle, 2000);
    setInterval(createCoin, 3000);
});
