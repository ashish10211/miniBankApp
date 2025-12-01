const { credit, debit } = require("../utils/transactionUtils");

const applyTransaction = (transaction, balanceSheetMap) => {
  const [payer, payee, amount] = transaction;

  debit(payer, amount, balanceSheetMap);
  credit(payee, amount, balanceSheetMap);
};

const applyTransactions = (transactions, balanceSheetMap) => {
  transactions.forEach((tx) => applyTransaction(tx, balanceSheetMap));
};

module.exports = {
  applyTransaction,
  applyTransactions,
};
