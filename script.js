let gameBoard, ctx, gameBoard_ctx
let gameBoardWidth = 500
let gameBoardHeight = 500
let width = 20
let moveX = 20
let moveY = 20
let snake = ['40,20', '60,20', '80,20']
let appleCoordinates = { x: 0, y: 0 }
let appleEaten = false
//Head is, snake array - minus one. Returns the last value of the array.
let head = snake[snake.length - 1].split(',')
let score = '0'
let direction = 'right'
let speed = 1000 - score * (2)

const createGameBoard = document.createElement('canvas')
document.body.appendChild(createGameBoard)
createGameBoard.width = gameBoardWidth
createGameBoard.height = gameBoardHeight
createGameBoard.style.border = '10px solid black'
createGameBoard.id = 'gameBoard'

const scoreBoard = document.createElement('div')
document.body.appendChild(scoreBoard)

function interval() {
    clearInterval(autoMove)
    setInterval(autoMove, speed)
}

function apple() {
    appleCoordinates.x =
    Math.floor(Math.random() * (gameBoardWidth / width)) * width
    appleCoordinates.y =
    Math.floor(Math.random() * (gameBoardHeight / width)) * width

    for (let i = 0; i < snake.length; i++) {
    let block = snake[i].split(',')
    block[0] = parseInt(block[0])
    block[1] = parseInt(block[1])
    if (
        appleCoordinates.x === block[0] &&
        appleCoordinates.y === block[1]
    ) {
        gameBoard_ctx.clearRect(
        appleCoordinates.x,
        appleCoordinates.y,
        width,
        width
        )
        apple()
    } else {
        gameBoard_ctx.fillStyle = 'red'
        gameBoard_ctx.beginPath()
        gameBoard_ctx.fillRect(
        appleCoordinates.x,
        appleCoordinates.y,
        width,
        width
        )
    }
    }

    appleEaten = false
    score++
    scoreBoard.innerText = score
    interval()
    //console.log('Run - Funtion apple')
}

function movement() {
    if (moveX !== head[0] || moveY !== head[1]) {
    const [x, y] = snake[snake.length - 1]
    head = [parseInt(x), parseInt(y)]

    //ParseInt, Converts array string, to integers.. both i and to.
    head[0] = parseInt(head[0])
    head[1] = parseInt(head[1])

    //The new values. of head position.
    head[0] = moveX
    head[1] = moveY

    //Remove the tail block (first in array)
    snake.shift()
    }

    // Check if the snake has eaten the apple
    if (appleCoordinates.x === head[0] && appleCoordinates.y === head[1]) {
    //console.log('Apple eaten')
    appleEaten = true
    //snake.push([appleCoordinates.x, appleCoordinates.y])
    snake.push(`${gameBoardHeight + 100}, ${gameBoardWidth + 100}`)
    }

    for (let i = 0; i < snake.length; i++) {
    let block = snake[i].split(',')
    block[0] = parseInt(block[0])
    block[1] = parseInt(block[1])
    gameBoard_ctx.beginPath()
    gameBoard_ctx.strokeStyle = 'green'
    gameBoard_ctx.lineWidth = 5
    gameBoard_ctx.strokeRect(block[0], block[1], width, width)
    }

    //console.log('Run - Funtion movement')
}

function check() {
    gameBoard = document.getElementById('gameBoard')
    gameBoard_ctx = gameBoard.getContext('2d')

    //lägg till en clean
    gameBoard_ctx.clearRect(0, 0, gameBoard.width, gameBoard.height)

    movement()
    rules()

    if (appleEaten) {
    //console.log('place new apple')
    apple()
    } else {
    gameBoard_ctx.fillStyle = 'red'
    gameBoard_ctx.beginPath()
    gameBoard_ctx.fillRect(
        appleCoordinates.x,
        appleCoordinates.y,
        width,
        width
    )
    }

    //console.log('Run - Check')
}

function rules() {
    //Check if the head has collided with the snake
    for (let i = 0; i < snake.length - 1; i++) {
    const block = snake[i].split(',')
    const blockX = parseInt(block[0])
    const blockY = parseInt(block[1])

    //This part of the code does not work
    //Snake eat itself
    if (block[0] === blockX && block[1] === blockY) {
        console.log('Snake ate itself')
        gameOver()
        return
    }
    }

    //Game board collision
    if (
    head[0] < 0 ||
    head[0] >= gameBoardWidth ||
    head[1] < 0 ||
    head[1] >= gameBoardHeight
    ) {
    console.log('Game over')
    gameOver()
    }

    console.log('Run - Funtion rules')
}

function autoMove() {
    if (direction === 'right') {
    moveX += width
    snake.push(moveX + ',' + moveY)
    } else if (direction === 'left') {
    moveX -= width
    snake.push(moveX + ',' + moveY)
    } else if (direction === 'up') {
    moveY -= width
    snake.push(moveX + ',' + moveY)
    } else if (direction === 'down') {
    moveY += width
    snake.push(moveX + ',' + moveY)
    }

    rules()
    check()
    //console.log('snake move please')
}

//Move the box
document.addEventListener('keydown', function (event) {
    //Right
    if (event.keyCode === 39) {
    moveX += width
    snake.push(moveX + ',' + moveY)
    direction = 'right'
    check()
    }
    //Left
    else if (event.keyCode === 37) {
    moveX -= width
    snake.push(moveX + ',' + moveY)
    direction = 'left'
    check()
    }
    //Down
    else if (event.keyCode === 40) {
    moveY += width
    snake.push(moveX + ',' + moveY)
    direction = 'down'
    check()
    }
    //Up
    else if (event.keyCode === 38) {
    moveY -= width
    snake.push(moveX + ',' + moveY)
    direction = 'up'
    check()
    }
})

function startGame() {
    interval()
    apple()
}

function gameOver() {
    clearInterval(autoMove)
    alert(`Gameover! Score: ${score}`)
    appleEaten = false
}

startGame()