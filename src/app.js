const express = require('express');
const cookiePasrser = require('cookie-parser');
const authRouter = require('./routes/auth.routes');
const postRouter = require('./routes/post.routes');


const app = express();
app.use(cookiePasrser());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
module.exports = app;