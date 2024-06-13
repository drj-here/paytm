const express = require("express");
const dotenv = require('dotenv');
const cors=require('cors')
dotenv.config();
const { api } = require('./routes');
const { dbConnect } = require('./db');

const app = express();
app.use(express.json()); 
app.use(cors())
// Connect to the database
dbConnect();

// Define the root route
app.get('/', (req, res) => {
    res.send("Hello from backend!");
});

// Use the API routes
app.use('/api', api);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
