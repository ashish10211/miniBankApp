const {
  buildBalanceSheetMap,
  mapToBalanceSheetArray,
} = require("../domain/balanceSheet.js");

describe("balanceSheet domain helpers", () => {
  const sampleBalanceSheet = [
    ["11111111", 1000],
    ["22222222", 500],
    ["33333333", 200],
  ];

  test("buildBalanceSheetMap converts array to Map correctly", () => {
    const balanceMap = buildBalanceSheetMap(sampleBalanceSheet);

    expect(balanceMap).toBeInstanceOf(Map);
    expect(balanceMap.size).toBe(3);
    expect(balanceMap.get("11111111")).toBe(1000);
    expect(balanceMap.get("22222222")).toBe(500);
    expect(balanceMap.get("33333333")).toBe(200);
  });

  test("mapToBalanceSheetArray converts Map back to array correctly", () => {
    const balanceMap = new Map([
      ["11111111", 1000],
      ["22222222", 500],
      ["33333333", 200],
    ]);

    const balanceArray = mapToBalanceSheetArray(balanceMap);

    expect(balanceArray).toEqual([
      { accountNumber: "11111111", amount: 1000 },
      { accountNumber: "22222222", amount: 500 },
      { accountNumber: "33333333", amount: 200 },
    ]);
  });

  test("buildBalanceSheetMap and mapToBalanceSheetArray are reversible", () => {
    const balanceMap = buildBalanceSheetMap(sampleBalanceSheet);
    const balanceArray = mapToBalanceSheetArray(balanceMap);

    expect(balanceArray).toEqual([
      { accountNumber: "11111111", amount: 1000 },
      { accountNumber: "22222222", amount: 500 },
      { accountNumber: "33333333", amount: 200 },
    ]);
  });
});
