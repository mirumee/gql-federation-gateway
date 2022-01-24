const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  serviceList: parseServiceList(process.env.PLUGINS, process.env.API_URL),
  pollingInterval: getInterval(),
};

function parseServiceList(plugins, apiUrl) {
  const serviceList = [
    {
      name: "saleor",
      url: `${apiUrl}graphql/`,
    },
  ];

  serviceList.push(
    ...plugins.split(",").map((name) => ({
      name,
      url: `${apiUrl}plugins/${name}/graphql/`,
    }))
  );

  return serviceList;
}

function getInterval() {
  const defaultInterval = 60000; //ms
  return process.env.POLLING_INTERVAL || defaultInterval;
}
