const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 5000;

//Connecting DB
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

//Define routes tutorial https://www.youtube.com/watch?v=iM_S4RczozU
const users = require('./routes/users');
const auth = require('./routes/auth');
const contacts = require('./routes/contacts');

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/contacts', contacts);

// Server statci assets in production
if (process.env.NODE_ENV === 'production') {
    // Set a static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

