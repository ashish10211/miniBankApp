const { credit, debit } = require('./transactionUtils.js');

describe('Account Utils', () => {
  let customerData;

  beforeEach(() => {
    customerData = new Map();
  });

  test('credit should add amount to a new account', () => {
    credit('123', 50, customerData);
    expect(customerData.get('123')).toBe(50);
  });

  test('credit should add amount to existing account', () => {
    customerData.set('123', 30);
    credit('123', 20, customerData);
    expect(customerData.get('123')).toBe(50);
  });

  test('debit should subtract amount', () => {
    customerData.set('123', 50);
    debit('123', 20, customerData);
    expect(customerData.get('123')).toBe(30);
  });

  test('debit should delete account if amount <= 0', () => {
    customerData.set('123', 15);
    debit('123', 20, customerData);
    expect(customerData.has('123')).toBe(false);
  });

  test('debit on non-existing account does nothing', () => {
    debit('999', 10, customerData);
    expect(customerData.has('999')).toBe(false);
  });
});
