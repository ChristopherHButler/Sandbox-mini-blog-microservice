const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const { randomBytes } = require('crypto');



const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};


app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts/create', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = { id, title };

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'postCreated',
    data: {
      id, title
    }
  });

  res.status(201).send(posts[id]);

});

app.post('/events', (req, res) => {
  console.log('Received Event: ', req.body.type);

  res.send({ status: 'OK' });
});

app.listen(4000, () => {
  console.log('v2.0');
  console.log('post service listening on port 4000');
});