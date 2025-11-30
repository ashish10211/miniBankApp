import express from 'express';

const TRANSACTIONS_FILE = '../csvData/transactions.csv';


const transactionsRoute = (transactionsService) => {
   const router = express.Router();

  router.put('/transactions', async (req, res) => {
    try {
    const updatedBalanceSheet = await transactionsService.updateBalanceSheet(TRANSACTIONS_FILE);
    res.json({ message: 'Balance sheet updated successfully', data: updatedBalanceSheet });

    } catch (error) {
      res.status(500).json({success: false, message: error.message})
    }
  });

  return router;
}

export default transactionsRoute;