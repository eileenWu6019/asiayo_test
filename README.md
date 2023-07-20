Currency Conversion API

A simple Node.js API for converting currency amounts with exchange rates.

## Installation

1. Make sure that you have installed Node.js
2. Clone this repository with this command: 'git clone '
3. Change your directory: 'cd '
4. Install npm: 'npm install'

## Usage

1. Start the server: 'npm start'
2. The API will run on 'http://localhost:3000/'
3. Send a GET request to 'http://localhost:3000/' with the required parameters. Please refer to the example below.

## Example

1. Request:
GET http://localhost:3000/?source=USD&target=JPY&amount=$1,525
2. Response:
{
  "msg": "success",
  "amount": "$170,496.53"
}

## Unit Test

1. Make sure that you have installed mocha, chai, and chai-http: 'npm install mocha chai chai-http --save-dev'
2. Run 'npm test test.js'

## Credit
Developed by Yu-Ling (Eileen) Wu

## Contact
If you have any questions or feedback, please feel free to contact me at eileen6019@gmail.com
