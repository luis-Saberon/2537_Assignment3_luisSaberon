var firstCardClicked;
var secondCardClicked;
var score = 0;
var timeout = false
var timer = 30;
var powerup = false
var clicks = 0;

function update() {
  document.getElementById("score").innerHTML = `Score left: ${score}`;
  document.getElementById('clicks').innerHTML = `Clicks: ${clicks}`;
  document.getElementById('remaining').innerHTML = `Pairs Left: ${(document.querySelectorAll('.card').length - score*2)/2}`
}

function updateTimer() {
  document.getElementById("timer").innerHTML = `Time: ${timer}`
}

function checkForWin() {
  if(document.querySelectorAll('.card').length == score*2) {
    console.log("You've won")
    gameOver(true)
  }
}

function powerUp() {
  powerup = true
  setTimeout(() => {
    powerup = false
  }, 5000)
  document.getElementById('powerup').classList.add('disabled')
  document.getElementById('powerup').setAttribute('disabled','')
}

function gameOver(win) {
  const x = Object.values(document.getElementById('holder').classList)
  console.log(`/${x[1]}`)
  if(win) {
    if (confirm("You won, play again?")) {
      window.location.href=`/game/${x[0]}/${x[1]}`
    } else {
      
      window.location.href=`/${x[0]}`
    }
    // document.getElementById('game_board').innerHTML = 'congrats, you won!'
    // window.location.href='/game/winner'
  } else {
    if (confirm("You lost, play again?")) {
      window.location.href=`/game/${x[0]}/${x[1]}`
    } else {
      window.location.href=`${x[0]}`
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  update();
  updateTimer()
  //card functions
  setInterval(() => {
    if(!powerup) {
      timer--;
      updateTimer()
      if(timer <= 0) {
        gameOver(false)
      }
    }
  },1000)
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      const x = Object.values(card.classList);
      if(!x.includes('matched') && !timeout) { //makes sure that players can't click matched cards, and that they can't click while animations are running to flip back to face down
        if(!firstCardClicked) {
          clicks++
          update()
          firstCardClicked = card
          card.classList.toggle('flip')
        } else {
          if(card != firstCardClicked) {
            clicks++
            update()
            secondCardClicked = card
            card.classList.toggle('flip')
            if(firstCardClicked.dataset.pokemon == secondCardClicked.dataset.pokemon) {
              score++;
              update();
              timer += 10;
              firstCardClicked.classList.add('matched');
              secondCardClicked.classList.add('matched');
              firstCardClicked = null;
              secondCardClicked = null
              setTimeout(() => {
                checkForWin();
              }, 1000)
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


  document.getElementById('powerup').addEventListener('click', () => {
    const x = Object.values(document.getElementById('powerup').classList)
    if(!x.includes('disabled')) {
      powerUp()
    } else {
      console.log("can't do it!")
    }
  })
  //non card functions
});
