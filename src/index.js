import express from 'express';
import transactionsRoute from './routes/transactionsRoute.js';
import transactionsService from './services/transactionsService.js';
import transactionsDAL from './dal/transactionsDAL.js';

const app = express();
app.use(express.json());


const transactionsDALInstance = transactionsDAL();
const transactionsServiceInstance = transactionsService(transactionsDALInstance)
const transactionsRouteInstance = transactionsRoute(transactionsServiceInstance)

app.use('/', transactionsRouteInstance);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});