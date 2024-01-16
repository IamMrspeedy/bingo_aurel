const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

let columnValues = [
  ['Pardon Express', 'Roulage de pelle collectif', 'qqun cache mal qqch', 'Aurel pré-shot dialogue', 'Tromperie dans la cafet'],
  ['quelqu un fait sa valise', 'Sacré José !', 'Johanna est Bigflo', 'Shoes sur le lit', 'Body shamming'],
  ['ça parle en francs', 'rires sur truc bad', 'Aurel pre-shot le jingle', 'Dodo avec lumière', 'la cafet devient un étoilé'],
  ['Rire préféré d Aurel', 'Mais putain Christian', 'ça passe par la fenêtre', 'Perche!', 'Personne boit pareil'],
  ['ça joue la fin d un morceau', 'plouf dans la baignoire', 'Ils savent pas s assoir autour d une table', 'Mais putain Christian', 'Course à faire']
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

  // Flatten the grid and shuffle the strings
  const flatGrid = grid.flat();
  shuffleArray(flatGrid);

  // Reconstruct the shuffled grid
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
  // Update columnValues based on user input
  columnValues = req.body.columns.map(col => col.split(','));

  // Redirect back to the config page
  res.redirect('/config');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
