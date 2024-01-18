const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

let columnValues = [
  ["PUTAIN CHRISTIAN", "ㅤRIRES ㅤSUR TRUC BAD", "SPLASH !", " ㅤOMBREㅤ DEㅤ PERCHE", "FIN D'UN MORC-ㅤEAU"],
  ["GOUTT-IÈRE", "ㅤSHOES ㅤSUR ㅤLIT", "«COURSE ㅤㅤÀㅤㅤ FAIRE»", "ㅤCAFET ㅤㅤ⬇️ㅤÉTOILÉ", "BODY SHAMING"],
  ["SECRET MAL CACHÉ", "ㅤQQUNㅤ FAIT VALISE", "SACRÉ JOSÉ❤️", "RIRE ㅤPRÉFㅤ d'AUREL", "PARDON EXPRESS🙏"],
  ["DODO AVEC LIGHT", "FRANCS", "PERSONNE BOIT PAREIL", "VESTE SUR ÉPAULE", "ㅤPRÉ-ㅤSHOT JINGLE"],
  ["SAVENT PAS S'ASSOIR", "ㅤCHEATㅤ ㅤINㅤ CAFET", "PELLE COLLEC-ㅤTIVE", "PRÉ-ㅤ SHOTㅤ DIALOGUE", "PUTAIN CHRIS-TIAN!!!"]
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
