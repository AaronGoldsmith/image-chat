const express = require('express');
const chatRoutes = require('./api/chat');
const imageRoutes = require('./api/image');
const morgan = require('morgan');
const cors = require('cors');

// load and configure environmental vars
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Enable CORS
app.use(cors({
  origin: process.env.API_ORIGIN
}));

app.use(morgan('combined'));

app.use(express.json());
app.use('/api/chat', chatRoutes);
app.use('/api/image', imageRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
