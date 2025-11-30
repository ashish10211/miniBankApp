Application endpoint is http://localhost:3000/transactions

Steps to run the application:
1) Clone the repository: `gh repo clone ashish10211/miniBankApp`
2) `npm i`
3) `npm run start`

Steps to test the application:
1) `npm i`
2) `npm run test`


Usage

Option1: Application will use csv files provided in data folder .
 * Reads transactions,csv file
 * It will generate a new csv of updatedBalance sheet under the folder updatedBalanceSheet.

 Option2: IF IMPLEMENTED
 Application will accept csv file in API request 
 * Send a PUT request with csv file
 * Updates companyBalanceSheet.csv file
 * User is presented with success message and 204 status