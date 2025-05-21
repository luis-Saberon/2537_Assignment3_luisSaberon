

var firstCardClicked;
var secondCardClicked;
var score = 0;
function update() {
  document.getElementById('score').innerHTML = score;
}

document.addEventListener("DOMContentLoaded", () => {
  update()
  //card functions
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
      const x = Object.values(card.classList);
      if(!x.includes('matched')) {
        if(!firstCardClicked) {
          firstCardClicked = card.dataset.pokemon
          card.classList.add('clicked')
        } else {
          if(!x.includes('clicked')) {
            secondCardClicked = card.dataset.pokemon
            if(firstCardClicked == secondCardClicked) {
              score++;
              update()
              document.querySelectorAll('.clicked').forEach((card) => {
                card.classList.add('matched')
              })
              card.classList.add('matched');
            }
            document.querySelectorAll('.card').forEach((card) => {
              card.classList.remove('clicked')
            })
            firstCardClicked = null
            secondCardClicked = null
            console.log('reset')
          }
        }
      } else {
        console.log('heyo')
      }
    }) 



  })

  //non card functions
})
