'use strict'

const store = require('./store')

const signUpSuccess = function (data) {
  console.log(data)
  $('#message').text('Signed up successfully!')
}

const signUpFailure = function (error) {
  console.error(error)
  $('#message').text('Error on sign up')
}

const signInSuccess = function (data) {
  console.log(data)
  store.user = data.user
  console.log('store is ', store.user)
  $('#messageSignIn').text('Signed in successfully!')
  $('#change-password').show()
  $('#sign-out').show()
  $('.gameboard').show()
  $('.new-game').show()
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('#signin-btn').hide()
  $('#signup-btn').hide()
  $('h4').hide()
  $('h3').hide()
  $('#player-message').text('Click new game to play!')
}

const signInFailure = function (error) {
  console.error(error)
  $('#messageSignIn').text('Error on sign in')
}

const changePasswordSuccess = function (data) {
  console.log(data)
  $('#messageChangePassword').text('Change has been made!')
}
const changePasswordFailure = function (error) {
  console.error(error)
  $('#messageChangePassword').text('Change not made :(')
}

const signOutSuccess = function () {
  $('#messageSignOut').text('Signed out!')
  store.user = null
}
const signOutFailure = function (error) {
  $('#messageSignOut').text('Still here')
  console.log(error)
}

const newGameSuccess = function (data) {
  $('#player-message').text('Player X starts!')
  store.game = data.game
  console.log('store.game is ', store.game)
}

const newGameFailure = function (error) {
  $('#player-message').text('Create game error')
  console.log(error)
}

const updateGameSuccess = function (data) {
  console.log(data)
}

const updateGameFailure = function (error) {
  $('#player-message').text('turn error')
  console.log(error)
}

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
  updateGameFailure
}
