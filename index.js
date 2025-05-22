const express = require('express');

const app = express();

app.use(express.static(__dirname + "/public"));

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));

function randNum(min, max) {

  return Math.ceil(min + (Math.random() * (max-min)))
}

app.get('/', (req,res) => {
  res.render('index', {scripts: [], styles: ['index'], theme: 1})
})


app.post('/game', (req,res) => {
  res.redirect('/game/mudkip')
})

app.post('/game/:theme', async (req,res) => {
  const pairs = parseInt(req.body.difficulty);
  const pokedex = []
  try{
    for(let i = 0; i < pairs; i++) {
      let rand = randNum(0, 1025)
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${rand}/`)
      let pokemon = await response.json();
  
      pokedex.push({pokemon: pokemon.name, image: pokemon.sprites.front_default})
      pokedex.push({pokemon: pokemon.name, image: pokemon.sprites.front_default})
    }
    //shuffle algorithm from https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
  
    for(let i = 0; i < pokedex.length - 1; i++) {
      let j = randNum(i, (pokedex.length - 1))
      let temp = pokedex[i]
      pokedex[i] = pokedex[j]
      pokedex[j] = temp
    }
    res.render('game', {scripts: ['card'], cards: pokedex, styles: ['style'], theme: req.params.theme})

  } catch (error) {
    res.send("Pokeapi is not working right now, please try again later.")
  }
})

app.get('/game/:theme/:pairs', async (req,res) => {
  const pairs = parseInt(req.params.pairs);

  const validPairs = [3,6,9];
  if(!validPairs.includes(pairs)) {
    return res.redirect('/')
  }
  const pokedex = []
  for(let i = 0; i < pairs; i++) {
    let rand = randNum(0, 1025)
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${rand}/`)
    let pokemon = await response.json();

    pokedex.push({pokemon: pokemon.name, image: pokemon.sprites.front_default})
    pokedex.push({pokemon: pokemon.name, image: pokemon.sprites.front_default})
  }
  //shuffle algorithm from https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm

  for(let i = 0; i < pokedex.length - 1; i++) {
    let j = randNum(i, (pokedex.length - 1))
    let temp = pokedex[i]
    pokedex[i] = pokedex[j]
    pokedex[j] = temp
  }
  res.render('game', {scripts: ['card'], cards: pokedex, styles: ['style'], theme: req.params.theme})
})

app.get('/:theme', (req,res) => {
  const theme = req.params.theme
  let themeNum;
  if(theme == 'mudkip' || parseInt(theme) == 1) {
    themeNum = 1
  } else if(theme =='pikachu' || parseInt(theme) == 2){
    themeNum = 2
  } else {
     return res.redirect('/')
  }
  res.render('index', {scripts: [], styles: ['index'], theme: themeNum})
})
// app.get('*', (req,res) => {
//   res.redirect('/')
// })



app.listen(3000, () => {
	console.log("Node application listening on port 3000");
}); 