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
$('.list-group').hide()
$('.get-games').hide()

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
let tiles = ['', '', '', '', '', '', '', '', '']

/* -------- GAME LOGIC FUNCTIONS ---------- */
const clearBoard = function () {
  // clears game board
  for (let i = 0; i < tiles.length; i++) {
    tiles[i] = ''
  }
  $('.tile').html('')
  tiles = ['', '', '', '', '', '', '', '', '']
  // $('.gameboard').hide()
}

const checkForWin = function () {
  // horizontal wins
  if (currentPlayer === tiles[0] && currentPlayer === tiles[1] && currentPlayer === tiles[2]) {
    store.gameData.game.over = true
    $('.gameboard').hide(800)
    $('#player-message').html(currentPlayer + ' wins')
  } else if (currentPlayer === tiles[3] && currentPlayer === tiles[4] && currentPlayer === tiles[5]) {
    $('#player-message').html(currentPlayer + ' wins')
    store.gameData.game.over = true
    $('.gameboard').hide(800)
  } else if (currentPlayer === tiles[6] && currentPlayer === tiles[7] && currentPlayer === tiles[8]) {
    $('#player-message').html(currentPlayer + ' wins')
    store.gameData.game.over = true
    $('.gameboard').hide(800)
    // Vertical wins
  } else if (currentPlayer === tiles[0] && currentPlayer === tiles[3] && currentPlayer === tiles[6]) {
    $('#player-message').html(currentPlayer + ' wins')
    store.gameData.game.over = true
    $('.gameboard').hide(800)
  } else if (currentPlayer === tiles[1] && currentPlayer === tiles[4] && currentPlayer === tiles[7]) {
    $('#player-message').html(currentPlayer + ' wins')
    store.gameData.game.over = true
    $('.gameboard').hide(800)
  } else if (currentPlayer === tiles[2] && currentPlayer === tiles[5] && currentPlayer === tiles[8]) {
    $('#player-message').html(currentPlayer + ' wins')
    store.gameData.game.over = true
    $('.gameboard').hide(800)

    // diagonal wins
  } else if (currentPlayer === tiles[2] && currentPlayer === tiles[4] && currentPlayer === tiles[6]) {
    $('#player-message').html(currentPlayer + ' wins')
    store.gameData.game.over = true
    $('.gameboard').hide(800)
  } else if (currentPlayer === tiles[0] && currentPlayer === tiles[4] && currentPlayer === tiles[8]) {
    $('#player-message').html(currentPlayer + ' wins')
    store.gameData.game.over = true
    $('.gameboard').hide(800)

    // return true
  } else if (tiles.every((value, index, array) => value !== '')) {
    $('#player-message').html('Draw!')
    store.gameData.game.over = true
    $('.gameboard').hide(800)
  }
}

// switches players
const playerSwitch = function () {
  if (!store.gameData.game.over) {
    if (currentPlayer === 'X') {
      currentPlayer = 'O'
      $('#player-message').html(currentPlayer + '\'s turn!')
    } else if (currentPlayer === 'O') {
      currentPlayer = 'X'
      $('#player-message').html('X\'s turn!')
    }
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
  event.preventDefault()
  clearBoard()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

/* GAME API FUNCTIONS */

// on new game
const onNewGame = function (event) {
  event.preventDefault()
  clearBoard()
  currentPlayer = 'X'
  api.newGame()
    .then(ui.newGameSuccess)
    .catch(ui.newGameFailure)
}

// on update game
const onUpdateGame = function (event) {
  const dataId = $(event.target).data('id') // assigns a variable to data-id
  const text = $(event.target).text()
  tiles[dataId] = currentPlayer
  store.gameData.game.cell.value = currentPlayer
  store.gameData.game.cell.index = dataId
  store.gameData.game.over = false
  // event.preventDefault()
  // console.log('Game data is ', store.gameData)
  // console.log('Store data ID is ', store.game.id)
  // console.log('Token is ', store.user.token)
  // targets the div when clicked
  // moved onClick into onUpdateGame
  if (text !== '') {
    $('#player-message').hmtl('This spot is taken!')
  } else if (text === '') {
    if (currentPlayer === 'X') {
      $(this).html(currentPlayer)
      // checkForWin()
    } else if (currentPlayer === 'O') {
      ($(this).html(currentPlayer))
      // checkForWin()
    }
  }
  api.updateGame()
    .then(ui.updateGameSuccess)
    .then(() => {
      checkForWin()
      playerSwitch()
    })
    .catch(ui.updateGameFailure)
}
// on get games
const onGetGames = function (event) {
  api.getGames()
    .then(ui.getGamesSuccess)
    .catch(ui.getGamesFailure)
}

// event handlers
const addHandlers = function () {
  $('#signup-btn').on('click', showSignUp)
  $('#signin-btn').on('click', showSignIn)
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('submit', onSignOut)
  $('.new-game').on('click', onNewGame)
  $('.tile').on('click', onUpdateGame)
  $('.get-games').on('click', onGetGames)
}

module.exports = {
  addHandlers
}
