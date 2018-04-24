'use strict'
const getFormFields = require(`../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')
const store = require('./store')

// default page
// $('#sign-up').hide()
// $('#sign-in').hide()
$('#change-password').hide()
$('#sign-out').hide()
$('.gameboard').hide()
$('.new-game').hide()
$('.list-group').hide()
$('.get-games').hide()

// function to show sign up form

// const showSignUp = function () {
//   $('#signup').show()
// }

// function to show sign up form

// const showSignIn = function () {
//   $('#signin').show()
// }

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
  store.gameData.game.over = false
}

const checkForWin = function () {
  // horizontal wins - 
  if (currentPlayer === tiles[0] && currentPlayer === tiles[1] && currentPlayer === tiles[2]) {
    store.gameData.game.over = true
    $('.gameboard').hide(800)
    $('#player-message').html(currentPlayer + ' wins')
    $('#game-message').html('')
  } else if (currentPlayer === tiles[3] && currentPlayer === tiles[4] && currentPlayer === tiles[5]) {
    store.gameData.game.over = true
    $('#player-message').html(currentPlayer + ' wins')
    $('.gameboard').hide(800)
    $('#game-message').html('')
  } else if (currentPlayer === tiles[6] && currentPlayer === tiles[7] && currentPlayer === tiles[8]) {
    store.gameData.game.over = true
    $('#player-message').html(currentPlayer + ' wins')
    $('.gameboard').hide(800)
    $('#game-message').html('')
    // Vertical wins
  } else if (currentPlayer === tiles[0] && currentPlayer === tiles[3] && currentPlayer === tiles[6]) {
    store.gameData.game.over = true
    $('#player-message').html(currentPlayer + ' wins')
    $('.gameboard').hide(800)
    $('#game-message').html('')
  } else if (currentPlayer === tiles[1] && currentPlayer === tiles[4] && currentPlayer === tiles[7]) {
    store.gameData.game.over = true
    $('#player-message').html(currentPlayer + ' wins')
    $('.gameboard').hide(800)
    $('#game-message').html('')
  } else if (currentPlayer === tiles[2] && currentPlayer === tiles[5] && currentPlayer === tiles[8]) {
    store.gameData.game.over = true
    $('#player-message').html(currentPlayer + ' wins')
    $('.gameboard').hide(800)
    $('#game-message').html('')

    // diagonal wins
  } else if (currentPlayer === tiles[2] && currentPlayer === tiles[4] && currentPlayer === tiles[6]) {
    store.gameData.game.over = true
    $('#player-message').html(currentPlayer + ' wins')
    $('.gameboard').hide(800)
    $('#game-message').html('')
  } else if (currentPlayer === tiles[0] && currentPlayer === tiles[4] && currentPlayer === tiles[8]) {
    store.gameData.game.over = true
    $('#player-message').html(currentPlayer + ' wins')
    $('.gameboard').hide(800)
    $('#game-message').html('')
  } else if (tiles.every((value, index, array) => value !== '')) {
    store.gameData.game.over = true
    $('#player-message').html('Draw!')
    $('.gameboard').hide(800)
    $('#game-message').html('')
  }
  // console.log(store.gameData)
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
  event.preventDefault()
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

// on sign in
const onSignIn = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

// on change password
const onChangePassword = function (event) {
  const data = getFormFields(this)

  event.preventDefault()
  // this event.preventDefault stops the page from refreshing when the event happens
  api.changePassword(data)
  // this .then .catch is a promise 
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
  // store.gameData.game.over = false
  // console.log('Game data is ', store.gameData)
  // console.log('Store data ID is ', store.game.id)
  // console.log('Token is ', store.user.token)
  // targets the div when clicked
  // moved onClick into onUpdateGame
  if (text !== '') {
    $('#player-message').html('This spot is taken!')
  } else if (text === '') {
    if (currentPlayer === 'X') {
      $(this).html(currentPlayer)
    } else if (currentPlayer === 'O') {
      ($(this).html(currentPlayer))
    } else if (currentPlayer === 'O') {
      ($(this).html(currentPlayer))
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
  event.preventDefault()
  api.getGames()
    .then(ui.getGamesSuccess)
    .catch(ui.getGamesFailure)
}

// event handlers
const addHandlers = function () {
  $('#signup').on('submit', onSignUp)
  $('#signin').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('submit', onSignOut)
  $('.new-game').on('click', onNewGame)
  $('.tile').on('click', onUpdateGame)
  $('.get-games').on('click', onGetGames)
}

module.exports = {
  addHandlers
}
