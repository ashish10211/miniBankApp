const {
  applyTransaction,
  applyTransactions,
} = require("../domain/transaction.js");
const { credit, debit } = require("../utils/transactionUtils.js");

jest.mock("../utils/transactionUtils.js", () => ({
  credit: jest.fn(),
  debit: jest.fn(),
}));

describe("transaction domain", () => {
  let balanceSheetMap;

  beforeEach(() => {
    jest.clearAllMocks();

    balanceSheetMap = new Map([
      ["11111111", 1000],
      ["22222222", 500],
      ["33333333", 200],
    ]);
  });

  test("applyTransaction calls debit and credit with correct arguments", () => {
    const transaction = ["11111111", "22222222", 100];

    applyTransaction(transaction, balanceSheetMap);

    expect(debit).toHaveBeenCalledWith("11111111", 100, balanceSheetMap);
    expect(credit).toHaveBeenCalledWith("22222222", 100, balanceSheetMap);
  });

  test("applyTransactions calls applyTransaction for each transaction", () => {
    const transactions = [
      ["11111111", "22222222", 100],
      ["22222222", "33333333", 50],
    ];

    applyTransactions(transactions, balanceSheetMap);

    expect(debit).toHaveBeenNthCalledWith(1, "11111111", 100, balanceSheetMap);
    expect(credit).toHaveBeenNthCalledWith(1, "22222222", 100, balanceSheetMap);

    expect(debit).toHaveBeenNthCalledWith(2, "22222222", 50, balanceSheetMap);
    expect(credit).toHaveBeenNthCalledWith(2, "33333333", 50, balanceSheetMap);
  });
});
