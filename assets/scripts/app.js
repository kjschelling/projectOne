// let player = 'X'

const onClick = function (e) {
  console.log(e)
  // const id = e.target.id
  // // const content = event.target.innerHTML
  // // const id = event.target.id
  // $('#' + id).html('fuckkkkkk')
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
//
// const playerMove = function () {
//   for (let i = 0; i < 9; i++) {
//     $('#' + event.target.id).on('click', onClick)
//   }
// }
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
