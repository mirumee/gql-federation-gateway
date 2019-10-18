const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  endpoints: JSON.parse(process.env.ENDPOINTS)
};
