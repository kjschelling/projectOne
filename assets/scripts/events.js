'use strict'
const getFormFields = require(`../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')
const store = require('./store')

// variables
let currentPlayer = 'X'
const tiles = ['', '', '', '', '', '', '', '', '']

// game object for update PATCH
// const gameData = {
//   'game': {
//     'cell': {
//       'index': null,
//       'value': null
//     },
//     'over': null
//   }
// }

// functions for game logic
const clearBoard = function () {
  // clears game board
  for (let i = 0; i < tiles.length; i++) {
    tiles[i] = ''
  }
  $('.tile').html('')
}

const playerSwitch = function () {
  if (currentPlayer === 'X') {
    currentPlayer = 'O'
  } else if (currentPlayer === 'O') {
    currentPlayer = 'X'
  }
}

// game auth functions
const onSignUp = function (event) {
  const data = getFormFields(this)
  console.log(data)
  event.preventDefault()
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  const data = getFormFields(this)
  console.log(data)
  event.preventDefault()
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  const data = getFormFields(this)
  console.log(data)
  event.preventDefault()
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onSignOut = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  clearBoard()
  api.signOut(data)
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

// game api functions
const onNewGame = function (event) {
  event.preventDefault()
  clearBoard()
  api.newGame()
    .then(ui.newGameSuccess)
    .catch(ui.newGameFailure)
}

const onUpdateGame = function (event) {
  event.preventDefault()
  // targets the div when clicked
  // moved onClick into onUpdateGame
  const dataId = $(event.target).data('id') // assigns a variable to data-id
  const text = $(event.target).text()
  tiles[dataId] = currentPlayer
  if (text === '') {
    if (currentPlayer === 'X') {
      $(this).html(currentPlayer)
    } else if (currentPlayer === 'O') {
      ($(this).html(currentPlayer))
    }
  }
  // grabbing the data the API is expecting
  store.gameData.game.cell.value = currentPlayer
  store.gameData.game.cell.index = dataId
  store.gameData.game.over = false
  api.updateGame()
    .then(ui.updateGameSuccess)
    .catch(ui.updateGameFailure)
  playerSwitch()
}

const addHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('submit', onSignOut)
  $('.new-game').on('click', onNewGame)
  $('.tile').on('click', onUpdateGame)
}

module.exports = {
  addHandlers
}
