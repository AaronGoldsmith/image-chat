const express = require('express');
const chatRoutes = require('./api/chat');
const imageRoutes = require('./api/image');

const app = express();

app.use(express.json());
app.use('/api/chat', chatRoutes);
app.use('/api/image', imageRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
