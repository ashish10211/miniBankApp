const express = require("express");
const path = require("path");

const TRANSACTIONS_FILE = path.join(__dirname, "../../data/transactions.csv");

const transactionsRoute = (transactionsService) => {
  const router = express.Router();

  router.put("/transactions", async (req, res) => {
    try {
      await transactionsService.processPaymentAdjustments(TRANSACTIONS_FILE);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  return router;
};

module.exports = transactionsRoute;
