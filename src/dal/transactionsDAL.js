const { readCSV, writeCSV } = require('../utils/csvUtils');

const FILE_NAME = 'UpdatedCSV';

const transactionsDAL = () => {
  const updateBalanceSheet = (updatedBalanceSheet) => {
    return writeCSV(FILE_NAME, updatedBalanceSheet);
  };

  const getBalanceSheet = (filePath) => {
    return readCSV(filePath);
  };

  return { updateBalanceSheet, getBalanceSheet };
};

module.exports = transactionsDAL;
