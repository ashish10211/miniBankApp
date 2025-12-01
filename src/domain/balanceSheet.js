const buildBalanceSheetMap = (balanceSheet) => {
  return new Map(
    balanceSheet.map(([accountNumber, balance]) => [accountNumber, balance]),
  );
};

const mapToBalanceSheetArray = (balanceSheetMap) => {
  return Array.from(balanceSheetMap.entries()).map(
    ([accountNumber, amount]) => ({
      accountNumber,
      amount,
    }),
  );
};

module.exports = {
  buildBalanceSheetMap,
  mapToBalanceSheetArray,
};
