const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  endpoints: parseEndpoints(process.env.ENDPOINTS)
};

function parseEndpoints(conf) {
  const endpoints = conf.split(" ");
  return endpoints.map(endpoint => {
    const delimiter = endpoint.indexOf(":");
    return {
      name: endpoint.substr(0, delimiter),
      url: endpoint.substr(delimiter + 1)
    };
  });
}
