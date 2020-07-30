const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const morgan = require('morgan');
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

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
];

const generateId = () => {
  const min = Math.floor(100000);
  const max = Math.floor(500000);
  return Math.floor(Math.random() * (max - min)) + min;
};

app.get('/info', (req, res) => {
  const receiveTime = new Date();
  res.send(
    `<div>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${receiveTime}</p>
    </div>`
  );
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((e) => e.id === id);
  person ? res.json(person) : res.status(404).end();
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((e) => e.id !== id);

  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const body = req.body;
  const duplicatedPerson = persons.find((e) => body.name === e.name);

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number is missing' });
  }

  if (duplicatedPerson) {
    return res.status(409).json({ error: 'name must be unique' });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  res.json(person);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
