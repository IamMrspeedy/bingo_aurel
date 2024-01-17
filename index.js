const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

let columnValues = [
  ["PUTAIN CHRISTIAN", "RIRES SUR TRUC BAD", "💦", "OMBRE DE PERCHE", "FUN D'UN MORCEAU"],
  ["GOUTT-IÈRE", "SHOES SUR LIT", "«COURSE À FAIRE»", "CAFET ⬇️ ÉTOILÉ", "BODY SHAMING"],
  ["SECRET MAL CACHÉ", "QQUN FAIT VALISE", "SACRÉ JOSÉ❤️", "RIRE PRÉF d'AUREL", "PARDON EXPRESS🙏"],
  ["DODO AVEC LIGHT", "FRANCS", "PERSONNE BOIT PAREIL", "VESTE SUR ÉPAULE", "PRÉ-SHOT JINGLE"],
  ["SAVENT PAS S'ASSOIR", "CHEAT IN CAFET", "PELLE COLLEC.", "PRÉ SHOT DIALOGUE", "PUTAIN CHRIS-TIAN!!!"]
];



function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function generateBingoGrid() {
  const grid = [];

  for (let i = 0; i < columnValues[0].length; i++) {
    const column = [];
    for (let j = 0; j < columnValues.length; j++) {
      column.push(columnValues[j][i]);
    }
    grid.push(column);
  }

  const flatGrid = grid.flat();
  shuffleArray(flatGrid);

  const gridSize = columnValues.length;
  const shuffledGrid = [];
  for (let i = 0; i < gridSize; i++) {
    shuffledGrid.push(flatGrid.slice(i * gridSize, (i + 1) * gridSize));
  }

  return shuffledGrid;
}

app.get('/', (req, res) => {
  const bingoGrid = generateBingoGrid();
  res.render('index', { bingoGrid, gridSize: columnValues.length });
});

app.get('/randomize', (req, res) => {
  const gridName = req.query.name || 'default';
  const newBingoGrid = generateBingoGrid();
  res.json({ bingoGrid: newBingoGrid, gridName });
});

app.get('/config', (req, res) => {
  res.render('config', { columnValues });
});

app.post('/config', (req, res) => {
  columnValues = req.body.columns.map(col => col.split(','));

  res.redirect('/config');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
