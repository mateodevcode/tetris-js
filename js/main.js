// 1. Inicializar el canvas
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const $score = document.querySelector('span')
const $section = document.querySelector('section')
const $controles = document.getElementById('controles')
const $buttonLeft = document.getElementById('left').id
const $buttonRight = document.getElementById('right').id
const $buttonDown = document.getElementById('down').id
const $buttonUp = document.getElementById('up').id

const LEFT = 'ArrowLeft'
const RIGHT = 'ArrowRight'
const DOWN = 'ArrowDown'

const BLOCK_SIZE = 20
const BOARD_WIDTH = 14
const BOARD_HEIGHT = 30

const colores = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'cyan']

let score = 0

canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT

context.scale(BLOCK_SIZE, BLOCK_SIZE)

// 3. Board
const board = createBoard(BOARD_WIDTH, BOARD_HEIGHT)
// const board = [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1]
// ]

function createBoard (width, height) {
  return Array(height).fill().map(() => Array(width).fill(0))
}

// 4. Pieza player
const piece = {
  position: { x: 5, y: 5 },
  shape: [
    [1, 1],
    [1, 1]
  ]
}

// 9. random pieces
const pieces = [
  [
    [1, 1],
    [1, 1]
  ],
  [
    [1, 1, 0],
    [0, 1, 1]
  ],
  [
    [0, 1, 0],
    [1, 1, 1]
  ],
  [
    [1, 1, 1, 1]
  ],
  [
    [1, 1, 1],
    [0, 0, 1]
  ],
  [
    [0, 1],
    [0, 1],
    [0, 1]
  ],
  [
    [1, 0],
    [1, 0],
    [1, 1]
  ],
  [
    [1, 0],
    [1, 1],
    [0, 1]
  ]
]

// 8. auto drop
let dropCounter = 0
let lastTime = 0
let velocidad = 1000
function update (time = 0) {
  const deleteTime = time - lastTime
  lastTime = time

  if (score <= 50) {
    velocidad = 1000
  } else if (score <= 400) {
    velocidad = 500
  } else if (score <= 800) {
    velocidad = 200
  } else if (score <= 1200) {
    velocidad = 100
  } else if (score <= 1600) {
    velocidad = 50
  } else if (score <= 2000) {
    velocidad = 25
  } else if (score <= 2400) {
    velocidad = 10
  }

  dropCounter += deleteTime
  if (dropCounter > velocidad) {
    piece.position.y++
    if (checkCollision()) {
      piece.position.y--
      solidfyPiece()
      removeRows()
    }
    dropCounter = 0
  }

  draw()
  window.requestAnimationFrame(update)
}

function draw () {
  context.fillStyle = '#000'
  context.fillRect(0, 0, canvas.width, canvas.height)

  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        context.fillStyle = 'yellow'
        context.fillRect(x, y, 1, 1)
      }
    })
  })
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        context.fillStyle = colores[Math.floor(Math.random() * colores.length)]
        context.fillRect(piece.position.x + x, piece.position.y + y, 1, 1)
      }
    })
  })
  $score.innerText = score
}

document.addEventListener('keydown', event => {
  if (event.key === LEFT) {
    piece.position.x--
    if (checkCollision()) {
      piece.position.x++
    }
  }
  if (event.key === RIGHT) {
    piece.position.x++
    if (checkCollision()) {
      piece.position.x--
    }
  }
  if (event.key === DOWN) {
    piece.position.y++
    if (checkCollision()) {
      piece.position.y--
      solidfyPiece()
      removeRows()
    }
  }

  if (event.key === 'ArrowUp') {
    const rotated = []
    for (let i = 0; i < piece.shape[0].length; i++) {
      const row = []
      for (let j = piece.shape.length - 1; j >= 0; j--) {
        row.push(piece.shape[j][i])
      }
      rotated.push(row)
    }
    const previousShape = piece.shape
    piece.shape = rotated
    if (checkCollision()) {
      piece.shape = previousShape
    }
  }
})

// 9. Botones de control para movil
document.addEventListener('click', event => {
  if (event.target.alt === $buttonLeft) {
    piece.position.x--
    if (checkCollision()) {
      piece.position.x++
    }
  }
  if (event.target.alt === $buttonRight) {
    piece.position.x++
    if (checkCollision()) {
      piece.position.x--
    }
  }
  if (event.target.alt === $buttonDown) {
    piece.position.y++
    if (checkCollision()) {
      piece.position.y--
      solidfyPiece()
      removeRows()
    }
  }

  if (event.target.alt === $buttonUp) {
    const rotated = []
    for (let i = 0; i < piece.shape[0].length; i++) {
      const row = []
      for (let j = piece.shape.length - 1; j >= 0; j--) {
        row.push(piece.shape[j][i])
      }
      rotated.push(row)
    }
    const previousShape = piece.shape
    piece.shape = rotated
    if (checkCollision()) {
      piece.shape = previousShape
    }
  }
})

function checkCollision () {
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      return (
        value !== 0 && board[piece.position.y + y]?.[piece.position.x + x] !== 0
      )
    })
  })
}

function solidfyPiece () {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        board[piece.position.y + y][piece.position.x + x] = 1
      }
    })
  })
  // reset position
  piece.position.x = Math.floor(BOARD_WIDTH / 2)
  piece.position.y = 0
  // get random piece
  piece.shape = pieces[Math.floor(Math.random() * pieces.length)]
  // Game over
  if (checkCollision()) {
    window.alert(`******** Game Over ---- Score: ${score} ********`)
    board.forEach(row => row.fill(0))
    score = 0
  }
}

function removeRows () {
  const rowsToRemove = []

  board.forEach((row, y) => {
    if (row.every(value => value === 1)) {
      rowsToRemove.push(y)
    }
  })
  rowsToRemove.forEach(y => {
    board.splice(y, 1)
    const neRow = Array(BOARD_WIDTH).fill(0)
    board.unshift(neRow)
    puntos()
    score += 40
  })
}

function puntos () {
  const audio = new window.Audio('musica/punto.mp3')
  audio.volume = 0.5
  audio.play()
}

$section.addEventListener('click', () => {
  $section.remove()
  $controles.classList.remove('ocultar-controles')
  update()
  const audio = new window.Audio('musica/tetriss.mp3')
  audio.volume = 0.5
  audio.play()
})
