document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const gameContainer = document.getElementById("game-container");
    const userForm = document.getElementById("user-form");
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const scoreDisplay = document.getElementById("score");
    const restartButton = document.getElementById("restart");
    const leaderboardList = document.getElementById("leaderboard-list");

    let username = "";
    let score = 0;
    let snake = [{ x: 200, y: 200 }];
    let food = { x: 100, y: 100 };
    let direction = { x: 0, y: 0 };
    let gameInterval;

    // Form Validation
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        username = usernameInput.value.trim();
        if (username === "") {
            alert("Please enter your name.");
            return;
        }
        userForm.classList.add("d-none");
        gameContainer.classList.remove("d-none");
        startGame();
    });

    // Game Logic
    function startGame() {
        score = 0;
        snake = [{ x: 200, y: 200 }];
        direction = { x: 0, y: 0 };
        food = randomFoodPosition();
        restartButton.style.display = "none";
        scoreDisplay.innerText = `Score: ${score}`;
        document.addEventListener("keydown", changeDirection);
        gameInterval = setInterval(updateGame, 100);
    }

    function updateGame() {
        // Move snake
        const head = {
            x: snake[0].x + direction.x * 20,
            y: snake[0].y + direction.y * 20,
        };

        // Check collision
        if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snakeCollision(head)) {
            gameOver();
            return;
        }

        snake.unshift(head);

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            scoreDisplay.innerText = `Score: ${score}`;
            food = randomFoodPosition();
        } else {
            snake.pop();
        }

        drawGame();
    }

    function drawGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw snake
        ctx.fillStyle = "lime";
        snake.forEach((segment) => {
            ctx.fillRect(segment.x, segment.y, 20, 20);
        });

        // Draw food
        ctx.fillStyle = "red";
        ctx.fillRect(food.x, food.y, 20, 20);
    }

    function changeDirection(event) {
        const keyPressed = event.key;
        const goingUp = direction.y === -1;
        const goingDown = direction.y === 1;
        const goingRight = direction.x === 1;
        const goingLeft = direction.x === -1;

        if (keyPressed === "ArrowUp" && !goingDown) {
            direction = { x: 0, y: -1 };
        } else if (keyPressed === "ArrowDown" && !goingUp) {
            direction = { x: 0, y: 1 };
        } else if (keyPressed === "ArrowLeft" && !goingRight) {
            direction = { x: -1, y: 0 };
        } else if (keyPressed === "ArrowRight" && !goingLeft) {
            direction = { x: 1, y: 0 };
        }
    }

    function randomFoodPosition() {
        return {
            x: Math.floor(Math.random() * (canvas.width / 20)) * 20,
            y: Math.floor(Math.random() * (canvas.height / 20)) * 20,
        };
    }

    function snakeCollision(head) {
        return snake.some((segment) => segment.x === head.x && segment.y === head.y);
    }

    function gameOver() {
        clearInterval(gameInterval);
        document.removeEventListener("keydown", changeDirection);
        restartButton.style.display = "block";
        updateLeaderboard();
        alert(`Game Over! Your score: ${score}`);
    }

    restartButton.addEventListener("click", () => {
        startGame();
    });

    // Leaderboard Logic
    function updateLeaderboard() {
        const listItem = document.createElement("li");
        listItem.textContent = `${username} - ${score}`;
        listItem.classList.add("list-group-item");
        leaderboardList.appendChild(listItem);
    }
});
