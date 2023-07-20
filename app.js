const express = require('express');
const app = express();

const rates = {
  "currencies": {
    "TWD": {
      "TWD": 1,
      "JPY": 3.669,
      "USD": 0.03281
    },
    "JPY": {
      "TWD": 0.26956,
      "JPY": 1,
      "USD": 0.00885
    },
    "USD": {
      "TWD": 30.444,
      "JPY": 111.801,
      "USD": 1
    }
  }
};

function convertCurrency(source, target, amount) {
    if (!rates.currencies.hasOwnProperty(source) || !rates.currencies[source].hasOwnProperty(target)) {
        return null;
    }

    const rate = rates.currencies[source][target];

    if (!rate) {
        return null;
    }

    // 1. Replace '$' with '', and replace ',' with ''
    // 2. Use parseFloat function to convert the string to decimal number
    // 3. Calculate the converted amount
    // 4. Use toFixed(3) to keep 3 digits after the decimal place
    // 5. Use Math.round to do rounding 
    // 6. Use toFixed(2) to keep 2 digits after the decimal place
    const convertedAmount = (parseFloat(amount.replace('$', '').replace(',', '')) * rate).toFixed(3);
    const roundedAmount = (Math.round(convertedAmount * 100) / 100).toFixed(2);
    
    // 1. Use toString() to convert convertedAmount to string
    // 2. Use /\B(?=(\d{3})+(?!\d))/g regular expression to find the places after every 3 digits
    return `$${roundedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

app.get('/', (req, res) => {
    // If there is any required parameter missing, return error message
    if (!req.query.source || !req.query.target || !req.query.amount) {
        return res.status(400).json({ msg: 'Bad request.' });
    }

    // To get the required parameters in the GET request
    const source = req.query.source;
    const target = req.query.target;
    const amount = req.query.amount;
    const convertedAmount = convertCurrency(source, target, amount);

    if (!convertedAmount) {
        return res.status(400).json({ msg: 'Invalid source or target currency.' });
    }

    return res.json({ msg: 'success', amount: convertedAmount });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;