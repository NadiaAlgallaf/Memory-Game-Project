/*------------------------ Cached Element References ------------------------*/
const cardEls = document.querySelectorAll('.cards')
const messageEl = document.querySelector('#message')
const resetBtnEl = document.querySelector('#reset')
const timerEl = document.querySelector('#timer')
const scoreEl = document.querySelector('#Score')
//pop up for winner
const popEl = document.querySelector('.popup')
const popupTitle = document.querySelector('#popup-title')
const popupMessage = document.querySelector('#popup-message')
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

cardEls.forEach((card, index) => {
  card.dataset.image = images[index]
})

//timer
let timerInterval = setInterval(updateTimer, 1000)
function updateTimer() {
  if (time > 0) {
    time--
    timerEl.textContent = 'Time:00:' + (time < 10 ? '0' + time : time)
  } else {
    stopGame()
  }
}

function stopTimer() {
  clearInterval(timerInterval)
}

function flipCard(card, index) {
  if (lockBoard) return
  card.classList.toggle('flipped')
  card.style.backgroundImage = `url(${images[index]})`

  if (!firstCard) {
    firstCard = card
    return
  }

  secondCard = card
  lockBoard = true
  checkMatch()
}

function checkMatch() {
  console.log(firstCard)
  console.log(secondCard)
  const isMatch =
    firstCard.style.backgroundImage === secondCard.style.backgroundImage
  console.log(isMatch)

  if (isMatch) {
    messageEl.textContent = 'Correct!'
    score += 1
    scoreEl.textContent = 'Score: ' + score + '/8'

    resetCards()
    detectWin()
  } else {
    messageEl.textContent = 'Try again'

    setTimeout(() => {
      unflip(firstCard)
      unflip(secondCard)
      resetCards()
    }, 800)
  }
}

function detectWin() {
  if (score === 8) {
    stopTimer()
    showPopUp('win')
    return true
  }
  return false
}

function unflip(card) {
  card.classList.remove('flipped')
  card.style.backgroundImage = ''
}
function resetCards() {
  firstCard = null
  secondCard = null
  lockBoard = false
  message = null
}
function startAgain() {
  firstCard = null
  secondCard = null
  lockBoard = false

  cardEls.forEach((card) => {
    card.style.backgroundImage = `url(./card.png)`
    card.classList.remove('flipped')
  })
  score = 0
  time = 60
  updateTimer()
  timerEl.textContent = 'Time:00:' + time
  scoreEl.textContent = 'Score:' + score + '/8'
  console.log('reset')
}

//pop up
function showPopUp(reason) {
  switch (reason) {
    case 'win':
      popupTitle.textContent = 'You Win! 🎉'
      popupMessage.textContent = 'Great job! You matched all cards!'
      break
    case 'lose':
      popupTitle.textContent = 'Game Over! ⏰'
      popupMessage.textContent = 'Time is up!'
      break
  }
  popEl.classList.add('popup-active')
}

function hidePopUp() {
  popEl.classList.remove('popup-active')
}

function stopGame() {
  stopTimer()
  showPopUp('lose')
  lockBoard = true
  //stop hover
  cardEls.forEach((card) => {
    card.style.pointerEvents = 'none'
  })
}
/*----------------------------- Event Listeners -----------------------------*/
cardEls.forEach((card, index) => {
  card.addEventListener('click', () => {
    if (lockBoard) return
    if (card.classList.contains('flipped')) return
    flipCard(card, index)
  })
})

resetBtnEl.addEventListener('click', startAgain)

//for the pop up when they press any where the pop should disapper
popEl.addEventListener('click', hidePopUp)
