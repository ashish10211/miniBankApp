const transactionsService = require("../services/transactionsService.js");
const { readCSV } = require("../utils/csvUtils.js");

jest.mock("../utils/csvUtils.js", () => ({
  readCSV: jest.fn(),
}));

describe("transactionsService", () => {
  let mockDAL;
  let service;

  beforeEach(() => {
    jest.clearAllMocks();

    mockDAL = {
      getBalanceSheet: jest.fn(),
      updateBalanceSheet: jest.fn(),
    };

    service = transactionsService(mockDAL);
  });

  test("throws error if no CSV file provided", async () => {
    await expect(service.processPaymentAdjustments()).rejects.toThrow(
      "transactions csv file not provided",
    );
  });

  test("processes transactions and updates balance sheet", async () => {
    const fakeCSVData = [
      ["11111111", "22222222", 100],
      ["22222222", "33333333", 50],
    ];

    const fakeBalanceSheet = [
      ["11111111", 1000],
      ["22222222", 500],
      ["33333333", 200],
    ];

    readCSV.mockResolvedValue(fakeCSVData);

    mockDAL.getBalanceSheet.mockResolvedValue(fakeBalanceSheet);
    mockDAL.updateBalanceSheet.mockResolvedValue("updated");

    const result = await service.processPaymentAdjustments("dummy.csv");

    expect(mockDAL.getBalanceSheet).toHaveBeenCalledWith(
      expect.stringContaining("balanceSheet.csv"),
    );
    expect(mockDAL.updateBalanceSheet).toHaveBeenCalled();

    expect(mockDAL.updateBalanceSheet.mock.calls[0][0]).toEqual([
      { accountNumber: "11111111", amount: 900 },
      { accountNumber: "22222222", amount: 550 },
      { accountNumber: "33333333", amount: 250 },
    ]);

    expect(result).toBe("updated");
  });
});
