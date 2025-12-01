const { readCSV } = require("../utils/csvUtils");
const {
  buildBalanceSheetMap,
  mapToBalanceSheetArray,
} = require("../domain/balanceSheet.js");
const { applyTransactions } = require("../domain/transaction.js");
const path = require("path");

const BALANCE_SHEET = path.join(__dirname, "../../data/balanceSheet.csv");

const transactionsService = (transactionsDAL) => {
  const processPaymentAdjustments = async (data) => {
    if (!data) {
      throw new Error("transactions csv file not provided");
    }

    const csvTransactionData = await readCSV(data);

    // Fetched from DAL to mock fetching data from database
    const balanceSheet = await transactionsDAL.getBalanceSheet(BALANCE_SHEET);

    const balanceSheetMap = buildBalanceSheetMap(balanceSheet);

    applyTransactions(csvTransactionData, balanceSheetMap);

    const updatedBalanceSheet = mapToBalanceSheetArray(balanceSheetMap);

    return await transactionsDAL.updateBalanceSheet(updatedBalanceSheet);
  };

  return { processPaymentAdjustments };
};

module.exports = transactionsService;
