const transactionsService = (transactionsDAL) => {

  const updateBalanceSheet = async (transactionsData) => {
    return await transactionsDAL.updateBalanceSheet(transactionsData);
  }

  return { updateBalanceSheet };
}

export default transactionsService