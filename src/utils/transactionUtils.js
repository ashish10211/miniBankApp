const credit = (accountNumber, amount, customerData) => {
  const currentBalance = customerData.get(accountNumber) || 0;
  customerData.set(accountNumber, currentBalance + amount);
};

const debit = (accountNumber, amount, customerData) => {
  const currentBalance = customerData.get(accountNumber) || 0;
  const updatedPoints = currentBalance - amount;
  if (updatedPoints > 0) {
    customerData.set(accountNumber, updatedPoints);
  } else {
    customerData.delete(accountNumber);
  }
};

module.exports = {
  credit,
  debit,
};
