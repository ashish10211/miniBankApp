const { readCSV } = require('../utils/csvUtils');
const { debit, credit } = require('../utils/transactionUtils');
const path = require('path');

const BALANCE_SHEET = path.join(__dirname, '../../data/balanceSheet.csv');

const transactionsService = (transactionsDAL) => {
  const processPaymentAdjustments = async (data) => {
    if (!data) {
      throw new Error('transactions csv file not provided');
    }

    const csvTransactionData = await readCSV(data);

    // Fetched from DAL to mock fetching data from database
    const balanceSheet = await transactionsDAL.getBalanceSheet(BALANCE_SHEET);

    const balanceSheetMap = new Map(
      balanceSheet.map(([accountNumber, balance]) => [accountNumber, balance])
    );

    csvTransactionData.forEach(([payer, payee, amount]) => {
      debit(payer, amount, balanceSheetMap);
      credit(payee, amount, balanceSheetMap);
    });

    const updatedBalanceSheet = Array.from(balanceSheetMap.entries()).map(
      ([accountNumber, amount]) => ({
        accountNumber,
        amount,
      })
    );

    return await transactionsDAL.updateBalanceSheet(updatedBalanceSheet);
  };

  return { processPaymentAdjustments };
};

module.exports = transactionsService;
