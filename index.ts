import express from 'express';

const port = 3000;

const app = express();

app.get('/example/a', function (req, res) {
  res.send('Hello from A!');
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});