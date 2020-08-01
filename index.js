require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const morgan = require('morgan');
const Person = require('./models/person');
const cors = require('cors');

app.use(express.json());
app.use(express.static('build'));
app.use(cors());
morgan.token('body', (req, res) => {
  const body = req.body;
  return JSON.stringify(body);
});
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.get('/info', async (req, res) => {
  const getPerson = () => Person.find({}).then((e) => e.length);
  const receiveTime = new Date();
  try {
    const personsQty = await getPerson();
    res.send(
      `<div>
          <p>Phonebook has info for ${personsQty} people</p>
          <p>${receiveTime}</p>
      </div>`
    );
  } catch (error) {
    console.log(error);
  }
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then((person) => res.json(person));
});

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then((person) => res.json(person));
});

// app.delete('/api/persons/:id', (req, res) => {
//   const id = Number(req.params.id);
//   persons = persons.filter((e) => e.id !== id);

//   res.status(204).end();
// });

app.post('/api/persons', (req, res) => {
  const body = req.body;
  // console.log('requBodyName', body.name);
  // const duplicatedPerson = () =>
  //   Person.find({ name: body.name }).then((e) => console.log(e));
  // const fetchDuplication = await duplicatedPerson();
  // console.log('duplication', fetchDuplication);

  // (!body.name || !body.number) &&
  //   res.status(400).json({ error: 'name or number is missing' });

  // fetchDuplication && res.status(409).json({ error: 'name must be unique' });

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => res.json(savedPerson));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
