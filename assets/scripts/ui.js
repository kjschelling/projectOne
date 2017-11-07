'use strict'

const store = require('./store')
const app = require('./app')

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
  $('#messageChangePassword').text('Error password change')
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
  $('#player-message').text('New game created, X starts')
  store.game = data.game
  console.log('store.game is ', store.game)
}

const newGameFailure = function (error) {
  $('#player-message').text('New game error')
  console.log(error)
}

const updateGameSuccess = function (data) {
  $('#player-message').text(app.currentPlayer + ' turn')
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
