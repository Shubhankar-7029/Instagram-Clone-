const express = require('express');
const cookiePasrser = require('cookie-parser');
const authRouter = require('./routes/auth.routes');


const app = express();
app.use(cookiePasrser());
app.use(express.json());

app.use('/api/auth', authRouter);

module.exports = app;