const dotenv = require("dotenv");
dotenv.config();

function parsePlugins(sourceString) {
  if (sourceString) {
    return sourceString.split(',').map(s => s.trim()).filter(Boolean);
  }

  return [];
}

// dashboard uses API_URI, so we give it a try as well
const API_URL = process.env.API_URL || process.env.API_URI;
const PLUGINS = parsePlugins(process.env.PLUGINS);

if (!API_URL) {
  throw new Error("Must configure process.env.API_URL")
}

function parseSubgraphs(plugins, apiUrl) {
  const subgraphs = [
    {
      name: "saleor",
      url: `${apiUrl}/graphql/`,
    },
  ];

  subgraphs.push(
    ...plugins
      .map((name) => ({
        name,
        url: `${apiUrl}/plugins/${name}/`,
      }))
  );

  return subgraphs;
}

function getInterval() {
  const defaultInterval = 60000; //ms
  return process.env.POLLING_INTERVAL || defaultInterval;
}

const proxyHeaders = [
  'Content-Type',
  'Content-Length',
  'Accept',
  'Accept-Language',
  'User-Agent',
  'Authorization',
]


module.exports = {
  subgraphs: parseSubgraphs(PLUGINS, API_URL),
  pollIntervalInMs: getInterval(),
  proxyHeaders: proxyHeaders
};