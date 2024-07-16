const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.headers['request.ip'] || req.ip || req.headers['x-forwarded-for'];
  res.send(`Your IP address is ${ip}`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
