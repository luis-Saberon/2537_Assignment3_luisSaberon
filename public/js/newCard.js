var firstCardClicked;
var secondCardClicked;
var score = 0;
var timeout = false
function update() {
  document.getElementById("score").innerHTML = score;
}

document.addEventListener("DOMContentLoaded", () => {
  update();
  //card functions
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      const x = Object.values(card.classList);
      if(!x.includes('matched') && !timeout) {
        if(!firstCardClicked) {
          firstCardClicked = card
          card.classList.toggle('flip')
        } else {
          if(card != firstCardClicked) {
            secondCardClicked = card
            card.classList.toggle('flip')
            if(firstCardClicked.dataset.pokemon == secondCardClicked.dataset.pokemon) {
              score++;
              update();
              firstCardClicked.classList.add('matched');
              secondCardClicked.classList.add('matched');
              firstCardClicked = null;
              secondCardClicked = null
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
