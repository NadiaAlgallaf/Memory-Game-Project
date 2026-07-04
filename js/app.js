/*------------------------ Cached Element References ------------------------*/

//select elements from the HTML
const cardEls = document.querySelectorAll('.cards')
const messageEl = document.querySelector('#message')
const resetBtnEl = document.querySelector('.reset')
const timerEl = document.querySelector('#timer')
const scoreEl = document.querySelector('#Score')

//popup elements
const popEl = document.querySelector('.popup')
const popupTitle = document.querySelector('#popup-title')
const popupMessage = document.querySelector('#popup-message')
const popupResetBtn = document.querySelector('#popup-reset')

/*-------------------------------- Constants --------------------------------*/

//card images
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
let previousMessage = false

/*-------------------------------- Functions --------------------------------*/

//shuffle the images randomly
function shuffleCards() {
  images.sort(() => Math.random() - 0.5)
}

//assign image for each card
cardEls.forEach((card, index) => {
  card.dataset.image = images[index]
})

//-------- timer ---------//

//start timer
let timerInterval = setInterval(updateTimer, 1000)

//update the timer value every second
function updateTimer() {
  if (time > 0) {
    time--
    timerEl.textContent = 'Time:00:' + (time < 10 ? '0' + time : time)
  } else {
    stopGame()
  }
}

//stop the timer
function stopTimer() {
  clearInterval(timerInterval)
}

//-------- game logic ---------//

//handle card flip
function flipCard(card, index) {
  if (lockBoard) return

  //clear previous message
  if (previousMessage) {
    messageEl.textContent = ''
  }

  //show card image
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

//check if the two selected cards match
function checkMatch() {
  console.log(firstCard)
  console.log(secondCard)
  const isMatch =
    firstCard.style.backgroundImage === secondCard.style.backgroundImage

  if (isMatch) {
    previousMessage = true
    messageEl.textContent = 'Correct!'

    score += 1
    scoreEl.textContent = 'Score: ' + score + '/8'

    resetCards()
    detectWin()
  } else {
    previousMessage = true
    messageEl.textContent = 'Try again!'

    //flip cards back after delay
    setTimeout(() => {
      unflip(firstCard)
      unflip(secondCard)
      resetCards()
    }, 800)
  }
}

//check if player wins the game
function detectWin() {
  if (score === 8) {
    stopTimer()
    showPopUp('win')
    return true
  }
  return false
}

//flip card back to hidden state
function unflip(card) {
  card.classList.remove('flipped')
  card.style.backgroundImage = ''
}

//reset selected cards
function resetCards() {
  firstCard = null
  secondCard = null
  lockBoard = false
}

//-------- reset the game ---------//

function startAgain() {
  firstCard = null
  secondCard = null
  lockBoard = false

  //reset all cards to default
  cardEls.forEach((card) => {
    card.style.backgroundImage = `url(./card.png)`
    card.classList.remove('flipped')
  })

  //shuffle the cards
  shuffleCards()

  score = 0
  time = 60
  messageEl.textContent = ''

  //restart timer
  clearInterval(timerInterval)
  timerInterval = setInterval(updateTimer, 1000)

  timerEl.textContent = 'Time:00:' + time
  scoreEl.textContent = 'Score:' + score + '/8'
}
//-------- popup ---------//

//show popup based on win or lose
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

//hide popup
function hidePopUp() {
  popEl.classList.remove('popup-active')
}

//stop the game when time runs out
function stopGame() {
  stopTimer()
  showPopUp('lose')
  lockBoard = true
}

/*----------------------------- Event Listeners -----------------------------*/

//card click event
cardEls.forEach((card, index) => {
  card.addEventListener('click', () => {
    if (lockBoard) return
    if (card.classList.contains('flipped')) return
    flipCard(card, index)
  })
})

//reset buttons
resetBtnEl.addEventListener('click', startAgain)
popupResetBtn.addEventListener('click', startAgain)

//close popup when clicking anywhere
popEl.addEventListener('click', hidePopUp)
