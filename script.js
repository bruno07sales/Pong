"use strict";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const mainMenu = document.getElementById("mainMenu");
const gameMessage = document.getElementById("gameMessage");

const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const menuButton = document.getElementById("menuButton");
const returnMenuButton = document.getElementById("returnMenuButton");

const moveUpButton = document.getElementById("moveUpButton");
const moveDownButton = document.getElementById("moveDownButton");

const difficultySelect = document.getElementById("difficulty");

const messageTitle = document.getElementById("messageTitle");
const messageText = document.getElementById("messageText");

const mobileControls = document.getElementById("mobileControls");
const instructions = document.getElementById("instructions");

const WINNING_SCORE = 5;

const PADDLE_WIDTH = 15;
const PADDLE_HEIGHT = 100;
const PLAYER_SPEED = 8;

const player = {
    x: 20,
    y: canvas.height / 2 - PADDLE_HEIGHT / 2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    score: 0,
    movingUp: false,
    movingDown: false
};

const computer = {
    x: canvas.width - PADDLE_WIDTH - 20,
    y: canvas.height / 2 - PADDLE_HEIGHT / 2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    score: 0,
    speed: 5
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 5,
    velocityX: 5,
    velocityY: 3
};

let gameRunning = false;
let animationFrameId = null;

function configureDifficulty() {
    const difficulty = difficultySelect.value;

    const difficultySettings = {
        easy: {
            computerSpeed: 3.5,
            ballSpeed: 4.5
        },
        normal: {
            computerSpeed: 5,
            ballSpeed: 5
        },
        hard: {
            computerSpeed: 6.5,
            ballSpeed: 5.8
        }
    };

    const selectedSettings = difficultySettings[difficulty];

    computer.speed = selectedSettings.computerSpeed;
    ball.speed = selectedSettings.ballSpeed;
}

function drawRectangle(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

function drawText(text, x, y, size = 40) {
    ctx.fillStyle = "#ffffff";
    ctx.font = `bold ${size}px Arial`;
    ctx.textAlign = "center";
    ctx.fillText(text, x, y);
}

function drawCenterLine() {
    for (let y = 0; y < canvas.height; y += 30) {
        drawRectangle(
            canvas.width / 2 - 2,
            y,
            4,
            15,
            "#ffffff"
        );
    }
}

function drawGame() {
    drawRectangle(
        0,
        0,
        canvas.width,
        canvas.height,
        "#000000"
    );

    drawCenterLine();

    drawText(
        player.score,
        canvas.width / 4,
        60
    );

    drawText(
        computer.score,
        canvas.width * 3 / 4,
        60
    );

    drawRectangle(
        player.x,
        player.y,
        player.width,
        player.height,
        "#ffffff"
    );

    drawRectangle(
        computer.x,
        computer.y,
        computer.width,
        computer.height,
        "#ffffff"
    );

    drawCircle(
        ball.x,
        ball.y,
        ball.radius,
        "#ffffff"
    );
}

function limitPaddlePosition(paddle) {
    if (paddle.y < 0) {
        paddle.y = 0;
    }

    if (paddle.y + paddle.height > canvas.height) {
        paddle.y = canvas.height - paddle.height;
    }
}

function movePlayer() {
    if (player.movingUp) {
        player.y -= PLAYER_SPEED;
    }

    if (player.movingDown) {
        player.y += PLAYER_SPEED;
    }

    limitPaddlePosition(player);
}

function moveComputer() {
    const computerCenter = computer.y + computer.height / 2;
    const tolerance = 12;

    if (computerCenter < ball.y - tolerance) {
        computer.y += computer.speed;
    }

    if (computerCenter > ball.y + tolerance) {
        computer.y -= computer.speed;
    }

    limitPaddlePosition(computer);
}

function hasCollision(ballObject, paddle) {
    return (
        ballObject.x + ballObject.radius > paddle.x &&
        ballObject.x - ballObject.radius < paddle.x + paddle.width &&
        ballObject.y + ballObject.radius > paddle.y &&
        ballObject.y - ballObject.radius < paddle.y + paddle.height
    );
}

function handlePaddleCollision(paddle) {
    const paddleCenter = paddle.y + paddle.height / 2;

    const relativeCollisionPosition =
        (ball.y - paddleCenter) / (paddle.height / 2);

    const maximumAngle = Math.PI / 3;
    const collisionAngle =
        relativeCollisionPosition * maximumAngle;

    const direction =
        paddle === player ? 1 : -1;

    ball.speed = Math.min(ball.speed + 0.25, 12);

    ball.velocityX =
        direction * ball.speed * Math.cos(collisionAngle);

    ball.velocityY =
        ball.speed * Math.sin(collisionAngle);

    if (paddle === player) {
        ball.x = player.x + player.width + ball.radius;
    } else {
        ball.x = computer.x - ball.radius;
    }
}

function getInitialBallSpeed() {
    const difficulty = difficultySelect.value;

    if (difficulty === "easy") {
        return 4.5;
    }

    if (difficulty === "hard") {
        return 5.8;
    }

    return 5;
}

function resetBall(direction) {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;

    ball.speed = getInitialBallSpeed();

    ball.velocityX = direction * ball.speed;

    let randomVerticalSpeed = Math.random() * 6 - 3;

    if (Math.abs(randomVerticalSpeed) < 1) {
        randomVerticalSpeed =
            randomVerticalSpeed < 0 ? -1 : 1;
    }

    ball.velocityY = randomVerticalSpeed;
}

function resetPlayers() {
    player.y =
        canvas.height / 2 - player.height / 2;

    computer.y =
        canvas.height / 2 - computer.height / 2;

    player.movingUp = false;
    player.movingDown = false;
}

function resetGame() {
    player.score = 0;
    computer.score = 0;

    resetPlayers();
    configureDifficulty();

    const initialDirection =
        Math.random() > 0.5 ? 1 : -1;

    resetBall(initialDirection);
}

function scorePoint() {
    if (ball.x + ball.radius < 0) {
        computer.score += 1;
        resetBall(-1);
    }

    if (ball.x - ball.radius > canvas.width) {
        player.score += 1;
        resetBall(1);
    }

    checkWinner();
}

function checkWinner() {
    if (
        player.score < WINNING_SCORE &&
        computer.score < WINNING_SCORE
    ) {
        return;
    }

    gameRunning = false;

    const playerWon =
        player.score >= WINNING_SCORE;

    messageTitle.textContent =
        playerWon ? "Você venceu!" : "O computador venceu";

    messageText.textContent =
        `Placar final: ${player.score} × ${computer.score}`;

    gameMessage.classList.remove("hidden");
}

function updateGame() {
    if (!gameRunning) {
        return;
    }

    movePlayer();
    moveComputer();

    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    const collidedWithTop =
        ball.y - ball.radius <= 0;

    const collidedWithBottom =
        ball.y + ball.radius >= canvas.height;

    if (collidedWithTop || collidedWithBottom) {
        ball.velocityY *= -1;

        ball.y = Math.max(
            ball.radius,
            Math.min(
                canvas.height - ball.radius,
                ball.y
            )
        );
    }

    if (
        ball.velocityX < 0 &&
        hasCollision(ball, player)
    ) {
        handlePaddleCollision(player);
    }

    if (
        ball.velocityX > 0 &&
        hasCollision(ball, computer)
    ) {
        handlePaddleCollision(computer);
    }

    scorePoint();
}

function gameLoop() {
    updateGame();
    drawGame();

    animationFrameId =
        requestAnimationFrame(gameLoop);
}

function startGame() {
    resetGame();

    gameRunning = true;

    mainMenu.classList.add("hidden");
    gameMessage.classList.add("hidden");

    mobileControls.classList.remove("hidden");
    instructions.classList.remove("hidden");
    menuButton.classList.remove("hidden");
}

function restartGame() {
    resetGame();

    gameRunning = true;

    gameMessage.classList.add("hidden");
}

function openMenu() {
    gameRunning = false;

    player.movingUp = false;
    player.movingDown = false;

    mainMenu.classList.remove("hidden");
    gameMessage.classList.add("hidden");

    mobileControls.classList.add("hidden");
    instructions.classList.add("hidden");
    menuButton.classList.add("hidden");

    drawGame();
}

function setPlayerMovement(direction, isMoving) {
    if (direction === "up") {
        player.movingUp = isMoving;
    }

    if (direction === "down") {
        player.movingDown = isMoving;
    }
}

function configureTouchButton(button, direction) {
    const startMovement = (event) => {
        event.preventDefault();

        if (gameRunning) {
            setPlayerMovement(direction, true);
        }
    };

    const stopMovement = (event) => {
        event.preventDefault();
        setPlayerMovement(direction, false);
    };

    button.addEventListener(
        "pointerdown",
        startMovement
    );

    button.addEventListener(
        "pointerup",
        stopMovement
    );

    button.addEventListener(
        "pointercancel",
        stopMovement
    );

    button.addEventListener(
        "pointerleave",
        stopMovement
    );
}

document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();

    const gameControlKeys = [
        "w",
        "s",
        "arrowup",
        "arrowdown",
        " "
    ];

    if (gameControlKeys.includes(key)) {
        event.preventDefault();
    }

    if (key === "w" || key === "arrowup") {
        player.movingUp = true;
    }

    if (key === "s" || key === "arrowdown") {
        player.movingDown = true;
    }

    if (
        event.code === "Space" &&
        !gameRunning &&
        mainMenu.classList.contains("hidden")
    ) {
        restartGame();
    }

    if (event.key === "Escape") {
        openMenu();
    }
});

document.addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase();

    if (key === "w" || key === "arrowup") {
        player.movingUp = false;
    }

    if (key === "s" || key === "arrowdown") {
        player.movingDown = false;
    }
});

startButton.addEventListener(
    "click",
    startGame
);

restartButton.addEventListener(
    "click",
    restartGame
);

menuButton.addEventListener(
    "click",
    openMenu
);

returnMenuButton.addEventListener(
    "click",
    openMenu
);

configureTouchButton(
    moveUpButton,
    "up"
);

configureTouchButton(
    moveDownButton,
    "down"
);

drawGame();
gameLoop();