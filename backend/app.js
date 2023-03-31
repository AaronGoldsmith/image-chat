const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const chatRoutes = require('./api/chat');
const imageRoutes = require('./api/image');
const saveRoutes = require('./api/save');

const errorHandler = require('./middleware/errorHandler');
require('./config/dotenv');
require('./config/firebase');

const app = express();

app.use(cors({
  origin: process.env.API_ORIGIN
}));

app.use(morgan('combined'));
app.use(express.json());

app.use('/api/chat', chatRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/save', saveRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
