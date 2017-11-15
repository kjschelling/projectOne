'use strict'
const getFormFields = require(`../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')
const store = require('./store')

// default page
$('#sign-up').hide()
$('#sign-in').hide()
$('#change-password').hide()
$('#sign-out').hide()
$('.gameboard').hide()
$('.new-game').hide()

// function to show sign up form
const showSignUp = function () {
  $('#sign-up').show()
}

// function to show sign up form
const showSignIn = function () {
  $('#sign-in').show()
}

// variables to play game
let currentPlayer = 'X'
const tiles = ['', '', '', '', '', '', '', '', '']


/* GAME LOGIC FUNCTIONS */
const clearBoard = function () {
  // clears game board
  for (let i = 0; i < tiles.length; i++) {
    tiles[i] = ''
  }
  $('.tile').html('')
}

// switches players
const playerSwitch = function () {
  if (currentPlayer === 'X') {
    currentPlayer = 'O'
  } else if (currentPlayer === 'O') {
    currentPlayer = 'X'
  }
}

const checkForWin = function () {
  // horizontal wins
  if (currentPlayer === tiles[0] && currentPlayer === tiles[1] && currentPlayer === tiles[2]) {
    $('#player-message').html(currentPlayer + ' wins')
    clearBoard()
  } else if (currentPlayer === tiles[3] && currentPlayer === tiles[4] && currentPlayer === tiles[5]) {
    $('#player-message').html(currentPlayer + ' wins')
    clearBoard()
  } else if (currentPlayer === tiles[6] && currentPlayer === tiles[7] && currentPlayer === tiles[8]) {
    $('#player-message').html(currentPlayer + ' wins')
    clearBoard()
    // Vertical wins
  } else if (currentPlayer === tiles[0] && currentPlayer === tiles[3] && currentPlayer === tiles[6]) {
    $('#player-message').html(currentPlayer + ' wins')
    clearBoard()
  } else if (currentPlayer === tiles[1] && currentPlayer === tiles[4] && currentPlayer === tiles[7]) {
    $('#player-message').html(currentPlayer + ' wins')
    clearBoard()
  } else if (currentPlayer === tiles[2] && currentPlayer === tiles[5] && currentPlayer === tiles[8]) {
    $('#player-message').html(currentPlayer + ' wins')
    clearBoard()
    // diagonal wins
  } else if (currentPlayer === tiles[2] && currentPlayer === tiles[4] && currentPlayer === tiles[6]) {
    $('#player-message').html(currentPlayer + ' wins')
    clearBoard()
  } else if (currentPlayer === tiles[0] && currentPlayer === tiles[4] && currentPlayer === tiles[8]) {
    $('#player-message').html(currentPlayer + ' wins')
    $('')
    clearBoard()
  } else {
    $('#player-message').html('Draw no winner')
  }
}

/* GAME AUTHORIZATION FUNCTIONS */

// on sign up
const onSignUp = function (event) {
  const data = getFormFields(this)
  console.log(data)
  event.preventDefault()
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

// on sign in
const onSignIn = function (event) {
  const data = getFormFields(this)
  console.log(data)
  event.preventDefault()
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

// on change password
const onChangePassword = function (event) {
  const data = getFormFields(this)
  console.log(data)
  event.preventDefault()
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

// on sign out
const onSignOut = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  clearBoard()
  api.signOut(data)
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

/* GAME API FUNCTIONS */

// on new game
const onNewGame = function (event) {
  event.preventDefault()
  clearBoard()
  api.newGame()
    .then(ui.newGameSuccess)
    .catch(ui.newGameFailure)
}

// on update game
const onUpdateGame = function (event) {
  event.preventDefault()
  console.log('Game data is ', store.gameData)
  console.log('Store data ID is ', store.game.id)
  console.log('Token is ', store.user.token)
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
  checkForWin()
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
  $('#signup-btn').on('click', showSignUp)
  $('#signin-btn').on('click', showSignIn)
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
