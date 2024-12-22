/* require('dotenv').config();
const express = require('express');
//const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const  {count} = require('./routes/loanRoutes');
const loanRoutes = require('./routes/loanRoutes');
const path = require("path");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose.connect('mongodb://0.0.0.0:27017/loan-tracker')

//mongoose.connect("mongodb://localhost:27017/loan-tracker")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch((error) => {
        console.log(error);
    });


//console.log(`The count value is: ${count}`);
app.use(express.static(path.join(__dirname, "public")));
app.post('/', (req, res) => {
    res.send('POST request to the homepage');
}); 

// Routes
app.use('/api/loans', loanRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
*/

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const loanRoutes = require('./routes/loanRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/loan-tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log(error);
    });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use('/api/loans', loanRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));