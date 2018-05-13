'use strict'

const store = require('./store')

// sign up  success
const signUpSuccess = function () {
  // console.log(data)
  $('#signup-message').text('Signed up successfully! Please sign in to play!').hide(5000)
  $('#sign-up-email').val('')
  $('#sign-up-password').val('')
  $('#sign-up-password-confirmation').val('')
}
// sign up fail
const signUpFailure = function () {
  $('#signup-message').text('Error on sign up').hide(5000)
}

// sign in success
const signInSuccess = function (data) {
  store.user = data.user
  $('#signin-message').text('Signed in successfully!').hide(5000)
  $('#change-password').show()
  $('#sign-out').show()
  $('.new-game').show()
  $('.signUpSignInContainer').hide()
  $('h4').hide()
  $('h3').hide()
  // $('#player-message').text('Click new game to play!')
  $('.list-group').show()
  $('#sign-in-email').val('')
  $('#sign-in-password').val('')
}

// sign in fail
const signInFailure = function () {
  $('#signin-message').text('Sign in error please try again!').hide(5000)
}
// change password success
const changePasswordSuccess = function () {
  $('#messageChangePassword').text('Change has been made!')
  $('#new-password').val('')
  $('#old-password').val('')
}
// Change password fail
const changePasswordFailure = function () {
  $('#messageChangePassword').text('Change not made :(')
}
// sign out success
const signOutSuccess = function () {
  $('#messageSignOut').text('Signed out!')
  store.user = null
  $('.signUpSignInContainer').show()
  $('#change-password').hide()
  $('#sign-out').hide()
  $('.gameboard').hide()
  $('.new-game').hide()
  $('.list-group').hide()
  $('.get-games').hide()
  $('#player-message').hide()
  $('#player-message').hide()
  $('#messageSignIn').html('')
  $('#message').html('')
  $('#game-message').html('')
  $('#messageSignOut').html('')
}

// sign out fail
const signOutFailure = function () {
  $('#messageSignOut').text('Still here')
}

const newGameSuccess = function (data) {
  $('#player-message').text('Player X starts!')
  store.game = data.game
  // console.log('store.game is ', store.game)
  $('.gameboard').show()
  $('.get-games').show()
  $('#game-message').html('')
  $('#messageChangePassword').html('')
}

const newGameFailure = function () {
  $('#player-message').text('Create game error')
}

const updateGameSuccess = function (data) {
  store.game = data.game
  // console.log(store.game)
  $('#game-message').html('Updated!')
  // store.game = data.game
  // console.log(store.game)
}

const updateGameFailure = function () {
  $('#player-message').text('turn error')
}

const getGamesSuccess = function (data) {
  $('#game-message').html(data.games.length + ' games have been played!')
}
const getGamesFailure = function () {
  $('#game-message').text('Error getting game.')
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
  getGamesSuccess,
  getGamesFailure
}
