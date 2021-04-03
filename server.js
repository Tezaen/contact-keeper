const express = require('express');
const connectDB = require('./config/db');
const app = express();

const PORT = process.env.PORT || 5000;

//Connecting DB
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
    res.json({ msg: 'Welcome to the Contact Keeper API' });
})

//Define routes tutorial https://www.youtube.com/watch?v=iM_S4RczozU
const users = require('./routes/users');
const auth = require('./routes/auth');
const contacts = require('./routes/contacts');

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/contacts', contacts);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

