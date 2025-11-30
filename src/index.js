const express = require('express');
const transactionsRoute = require('./routes/transactionsRoute');
const transactionsService = require('./services/transactionsService');
const transactionsDAL = require('./dal/transactionsDAL');

const app = express();
app.use(express.json());

const transactionsDALInstance = transactionsDAL();
const transactionsServiceInstance = transactionsService(transactionsDALInstance);
const transactionsRouteInstance = transactionsRoute(transactionsServiceInstance);

app.use('/', transactionsRouteInstance);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
