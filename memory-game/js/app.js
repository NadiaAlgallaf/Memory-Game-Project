/*------------------------ Cached Element References ------------------------*/
const cardEls = document.querySelectorAll('.cards')
const messageEl = document.querySelector('#message')
const resetBtnEl = document.querySelector('#reset')
const timerEl = document.querySelector('#timer')
const scoreEl = document.querySelector('#Score')
/*-------------------------------- Constants --------------------------------*/
const images = [
  'cat1.png',
  'cat2.png',
  'cat3.png',
  'cat4.png',
  'cat5.png',
  'cat6.png',
  'cat1.png',
  'cat2.png',
  'cat3.png',
  'cat4.png',
  'cat5.png',
  'cat6.png',
  'cat7.png',
  'cat7.png',
  'cat8.png',
  'cat8.png'
]
/*---------------------------- Variables (state) ----------------------------*/
//initializing the game
let firstCard = null
let secondCard = null
let lockBoard = false
let score = 0
let time = 60
/*-------------------------------- Functions --------------------------------*/
//timer
let timerInterval = setInterval(updateTimer, 1000)
function updateTimer() {
  if (time > 0) {
    time--
  }
  timerEl.textContent = 'Time: 00:' + time
}

function flipCard(card, index) {
  card.classList.toggle('flipped')
  card.style.backgroundImage = `url(${images[index]})`

  console.log(card)

  if (!firstCard) {
    firstCard = card
    return
  }

  secondCard = card
  checkMatch()
}
/*----------------------------- Event Listeners -----------------------------*/
cardEls.forEach((card, index) => {
  card.addEventListener('click', () => {
    if (lockBoard) return
    if (card.classList.contains('flipped')) return
    flipCard(card, index)
  })
})
