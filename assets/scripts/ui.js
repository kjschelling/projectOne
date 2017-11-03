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
  console.log(store)
  $('#messageSignIn').text('Signed in successfully!')
}

const signInFailure = function (error) {
  console.error(error)
  $('#messageSignIn').text('Error on sign in')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure
}
