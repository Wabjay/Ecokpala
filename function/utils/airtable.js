// require('dotenv').config();
// const Airtable = require('airtable');


import * as dotenv from 'dotenv'
dotenv.config()
import Airtable from 'airtable';


Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID);
const table = base(process.env.AIRTABLE_TABLE_NAME);

module.exports = {
  base,
  table,
};
