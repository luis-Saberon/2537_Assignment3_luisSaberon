const express = require('express');

const app = express();

app.use(express.static(__dirname + "/public"));

app.set('view engine', 'ejs');

app.get('/', (req,res) => {
  res.render('index', {scripts: []})
})

app.get('/game', (req,res) => {
  res.render('game', {scripts: [],
     cards: [{pokemon: 'pikachu', image: './images/001.png'},{pokemon: 'bulbasapuir', image: './images/002.png'},{pokemon: 'mudkip', image: './images/003.png'}]
    ,styles: ['style']})
})

app.listen(3000, () => {
	console.log("Node application listening on port 3000");
}); 