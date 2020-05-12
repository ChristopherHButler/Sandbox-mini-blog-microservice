const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  if (type === 'postCreated') {
    const { id, title } = data;

    posts[id] = {id, title, comments: [] };
  }

  if (type === 'commentCreated') {
    const { id, content, status, postId } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === 'commentUpdated') {
    const { id, content, status, postId } = data;
  
    const post = posts[postId];
    const comment = post.comments.find(comment => comment.id === id);

    comment.status = status;
    comment.content = content;
  }
};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({ status: 'OK' });
});



app.listen(4002, async () => {
  console.log('query service listening on port 4002');

  console.log('syncing events');
  const res = await axios.get('http://localhost:4005/events');

  for (let event of res.data) {
    console.log('processing event: ', event.type);
    handleEvent(event.type, event.data);
  }

  console.log('syncing events complete');
});