var firstCardClicked;
var secondCardClicked;
var score = 0;
var timeout = false
var timer = 60;
function updateScore() {
  document.getElementById("score").innerHTML = score;
}

function updateTimer() {
  document.getElementById("timer").innerHTML = timer
}

function checkForWin() {
  if(document.querySelectorAll('.card').length == score*2) {
    console.log("You've won")
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateScore();
  updateTimer()
  //card functions
  setInterval(() => {
    timer--;
    updateTimer()
    if(timer <= 0) {
      console.log('loser')
    }

  },1000)
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      const x = Object.values(card.classList);
      if(!x.includes('matched') && !timeout) { //makes sure that players can't click matched cards, and that they can't click while animations are running to flip back to face down
        if(!firstCardClicked) {
          firstCardClicked = card
          card.classList.toggle('flip')
        } else {
          if(card != firstCardClicked) {
            secondCardClicked = card
            card.classList.toggle('flip')
            if(firstCardClicked.dataset.pokemon == secondCardClicked.dataset.pokemon) {
              score++;
              updateScore();
              firstCardClicked.classList.add('matched');
              secondCardClicked.classList.add('matched');
              firstCardClicked = null;
              secondCardClicked = null
              checkForWin();
            } else {
              timeout = true
              setTimeout(() => {
                firstCardClicked.classList.toggle('flip')
                secondCardClicked.classList.toggle('flip');
                firstCardClicked = null;
                secondCardClicked = null;
                timeout = false;
              },1000)
            }
          }
        }
      }
    });
  })

  //non card functions
});
