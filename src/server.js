const express = require('express');
const app = express();
const botsRouter = require('./routes/bots');

const PORT = process.env.PORT || 3000;

app.use('/api/bots', botsRouter);

app.get('/', (req, res) => {
  res.send('Bot Hosting Service is running');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
