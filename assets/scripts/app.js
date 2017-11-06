'use strict'

let currentPlayer = 'O'

// const checkForWIn = function () {
// // horizonatonal wins
// if (currentPlayer === tile[0] && currentPlayer === tile[1] && currentPlayer === tile[2]) {
// prompt (currentPlayer + ' wins')
// }
// else if (currentPlayer === tile[3] && currentPlayer === tile[4] && currentPlayer === tile[5]) {
// prompt (currentPlayer + ' wins')
// }
// else if (currentPlayer === tile[6] && currentPlayer === tile[7] && currentPlayer === tile[8]) {
// prompt (currentPlayer + ' wins')
// }
//
// // vertical wins
// if (currentPlayer === tile[0] && currentPlayer === tile[3] && currentPlayer === tile[6]) {
// prompt (currentPlayer + ' wins')
// }
// else if (currentPlayer === tile[1] && currentPlayer === tile[4] && currentPlayer === tile[7]) {
// prompt (currentPlayer + ' wins')
// }
// else if (currentPlayer === tile[2] && currentPlayer === tile[5] && currentPlayer === tile[8]) {
// prompt (currentPlayer + ' wins')
// }
//
// // diagonal wins
// if (currentPlayer === tile[2] && currentPlayer === tile[4] && currentPlayer === tile[6]) {
// prompt (currentPlayer + ' wins')
// }
// else if (currentPlayer === tile[0] && currentPlayer === tile[4] && currentPlayer === tile[8]) {
// prompt (currentPlayer + ' wins')
// // } else {
// prompt ('Tie')
// }
// }

const playerSwitch = function () {
  if (currentPlayer === 'X') {
    currentPlayer = 'O'
  } else if (currentPlayer === 'O') {
    currentPlayer = 'X'
  }
}

const onClick = function (event) {
  const text = $(this).text()
  if (text === '') {
    if (currentPlayer === 'X') {
      $(this).html(currentPlayer)
    } else if (currentPlayer === 'O') {
      ($(this).html(currentPlayer))
    }
    playerSwitch()
  }
}
onClick()

const addHandler = function () {
  $('#one').click(onClick)
  $('#two').click(onClick)
  $('#three').click(onClick)
  $('#four').click(onClick)
  $('#five').click(onClick)
  $('#six').click(onClick)
  $('#seven').click(onClick)
  $('#eight').click(onClick)
  $('#nine').click(onClick)
}

module.exports = {
  addHandler
}
