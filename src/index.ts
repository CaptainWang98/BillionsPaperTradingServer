import express from 'express';
import { Lucia } from 'lucia';
import { luciaPrismaAdapter, prismaClient } from './db';

// Variables
const port = 3000;

// Lucia
const lucia = new Lucia(luciaPrismaAdapter);
const db = prismaClient;

const app = express();

app.get('/example/a', function (req, res) {
  res.send('Hello from A!');
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});