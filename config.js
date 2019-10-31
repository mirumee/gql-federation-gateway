const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  endpoints: parseEndpoints(process.env.ENDPOINTS),
  pollingInterval: getInterval()
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

function getInterval() {
  const defaultInterval = 60000; //ms
  return process.env.POLLING_INTERVAL || defaultInterval;
}
