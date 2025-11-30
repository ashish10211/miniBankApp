const fs = require('fs');
const csvParser = require('csv-parser');
const { parse } = require('json2csv');
const path = require('path');

const folder = path.resolve(__dirname, '../../updatedBalanceSheet');

const readCSV = async (filePath) => {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser({ headers: false }))
      .on('data', (row) => {
        const numericRow = Object.values(row).map((val) => Number(val));
        results.push(numericRow);
      })
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
};

const writeCSV = async (fileName, data) => {
  try {

      if (!fs.existsSync(folder)) {
      throw new Error(`Folder does not exist for CSV to write updatedBalance sheet`);
    }

    const timestamp = Date.now();
    const filePath = path.join(folder, `${fileName}__${timestamp}.csv`);
    const csvData = parse(data);
    fs.writeFileSync(filePath, csvData, 'utf8');
    console.log(`CSV file saved`);
    return filePath;
  } catch (err) {
    console.error('Error writing CSV:', err);
    throw err;
  }
};

module.exports = {
  readCSV,
  writeCSV,
};
