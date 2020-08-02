require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const morgan = require('morgan');
const Person = require('./models/person');
const cors = require('cors');

app.use(express.static('build'));
app.use(express.json());
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

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      person ? res.json(person) : res.status(404).end();
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => res.status(204).end())
    .catch((error) => next(error));
});

app.post('/api/persons', async (req, res) => {
  const body = req.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  const fetchPerson = () => Person.find({ name: body.name });
  const duplicatedPerson = await fetchPerson();

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'missing name or number' }).end();
  }

  if (duplicatedPerson.length) {
    res.status(409).json({ error: 'name must be unique' }).end();
  } else {
    person.save().then((savedPerson) => res.json(savedPerson));
  }
});

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    {
      name: body.name,
      number: body.number,
    },
    { new: true }
  )
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((error) => next(error));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};
// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  error.name === 'CastError' &&
    res.status(400).send({ error: 'malformatted id' });

  next(error);
};
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
