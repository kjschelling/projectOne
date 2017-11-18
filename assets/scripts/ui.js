'use strict'

const store = require('./store')

// sign up  success
const signUpSuccess = function (data) {
  console.log(data)
  $('#message').text('Signed up successfully!')
}
// sign up fail
const signUpFailure = function (error) {
  console.error(error)
  $('#message').text('Error on sign up')
}

// sign in success
const signInSuccess = function (data) {
  console.log(data)
  store.user = data.user
  console.log('store is ', store.user)
  $('#messageSignIn').text('Signed in successfully!')
  $('#change-password').show()
  $('#sign-out').show()
  $('.new-game').show()
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('#signin-btn').hide()
  $('#signup-btn').hide()
  $('h4').hide()
  $('h3').hide()
  $('#player-message').text('Click new game to play!')
  $('.list-group').show()
  $('.get-games').show()
}

// sign in fail
const signInFailure = function (error) {
  console.error(error)
  $('#messageSignIn').text('Error on sign in')
}
// change password success
const changePasswordSuccess = function (data) {
  console.log(data)
  $('#messageChangePassword').text('Change has been made!')
  $('#new-password').val('')
  $('#old-password').val('')
}
// Change password fail
const changePasswordFailure = function (error) {
  console.error(error)
  $('#messageChangePassword').text('Change not made :(')
}
// sign out success
const signOutSuccess = function () {
  $('#messageSignOut').text('Signed out!')
  store.user = null
}

// sign out fail
const signOutFailure = function () {
  $('#messageSignOut').text('Still here')
  // console.log(error)
}

const newGameSuccess = function (data) {
  $('#player-message').text('Player X starts!')
  store.game = data.game
  console.log('store.game is ', store.game)
  $('.gameboard').show()
}

const newGameFailure = function (error) {
  $('#player-message').text('Create game error')
  console.log(error)
}

const updateGameSuccess = function (data) {
  store.game = data.game
}

const updateGameFailure = function () {
  $('#player-message').text('turn error')
}

const getGameSuccess = function (data) {
  store.games = data.games
  // console.log('store.game is ', store.games)
  $('#player-message').text(store.games.length + ' games have been played!')
}
const getGameFailure = function () {
  $('#player-message').text('Error getting game.')
  // console.log(error)
}
// store.games = data.games
// target div input html store.games.length

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  newGameSuccess,
  newGameFailure,
  updateGameSuccess,
  updateGameFailure,
  getGameSuccess,
  getGameFailure
}
