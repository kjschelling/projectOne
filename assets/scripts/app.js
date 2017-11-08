'use strict'

const store = require('./store')

let currentPlayer = 'X'
const tiles = ['', '', '', '', '', '', '', '', '']

const gameData = {
  'game': {
    'cell': {
      'index': null,
      'value': null
    },
    'over': null
  }
}

const clearBoard = function () {
  for (let i = 0; i < tiles.length; i++) {
    tiles[i] = ''
  }
  $('.tile').html('')
}

const checkForWin = function () {
  if (currentPlayer === tiles[0] && currentPlayer === tiles[1] && currentPlayer === tiles[2]) {
    $('#player-message').html(currentPlayer + ' wins')
  } else if (currentPlayer === tiles[3] && currentPlayer === tiles[4] && currentPlayer === tiles[5]) {
    $('#player-message').html(currentPlayer + ' wins')
  } else if (currentPlayer === tiles[6] && currentPlayer === tiles[7] && currentPlayer === tiles[8]) {
    $('#player-message').html(currentPlayer + ' wins')
  } else if (currentPlayer === tiles[0] && currentPlayer === tiles[3] && currentPlayer === tiles[6]) {
    $('#player-message').html(currentPlayer + ' wins')
  } else if (currentPlayer === tiles[1] && currentPlayer === tiles[4] && currentPlayer === tiles[7]) {
    $('#player-message').html(currentPlayer + ' wins')
  } else if (currentPlayer === tiles[2] && currentPlayer === tiles[5] && currentPlayer === tiles[8]) {
    $('#player-message').html(currentPlayer + ' wins')
  } else if (currentPlayer === tiles[2] && currentPlayer === tiles[4] && currentPlayer === tiles[6]) {
    $('#player-message').html(currentPlayer + ' wins')
  } else if (currentPlayer === tiles[0] && currentPlayer === tiles[4] && currentPlayer === tiles[8]) {
    $('#player-message').html(currentPlayer + ' wins')
  } else {
    $('#player-message').html('Draw no winner')
  }
}

const playerSwitch = function () {
  if (currentPlayer === 'X') {
    currentPlayer = 'O'
  } else if (currentPlayer === 'O') {
    currentPlayer = 'X'
  }
}

const onClick = function (event) {
  const dataId = $(this).data('id') // assigns a variable to data-id
  const text = $(this).text()
  if (text === '') {
    if (currentPlayer === 'X') {
      $(this).html(currentPlayer)
      $('#player-message').text('O\'s turn')
    } else if (currentPlayer === 'O') {
      ($(this).html(currentPlayer))
      $('#player-message').text('X\'s turn')
    }

    tiles[dataId] = currentPlayer
    gameData.game.cell.value = currentPlayer
    gameData.game.cell.index = dataId
    gameData.game.over = false
  }
  playerSwitch()
}

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
  addHandler,
  gameData,
  currentPlayer,
  clearBoard
}
