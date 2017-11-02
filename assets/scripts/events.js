'use strict'
// Variables needed to play game
let player = 'X'

const onClick = function (event) {
  console.log(event)
  // const content = event.target.innerHTML
  const id = event.target.id
  $('#' + id).html('fuckkkkkk')
  // if (player === 'X') {
  //     player = 'O'
  //   } else if (player === 'O') {
  //     player = 'X'
  //     }
}

// const content = event.target.innerHTML
// const id = event.target.id
// $('.tile').on('click', function () {
//   $(this.id).text(player)
//   if (player === 'X') {
//     player = 'O'
//   } else if (player === 'O') {
//     player = 'X'
//     }

onClick()

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
  addHandler
}
