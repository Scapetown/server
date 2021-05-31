const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 8000;
const SERVER_PREFIX = process.env.SERVER_PREFIX || 'api';

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
  prefix: SERVER_PREFIX,
};

const config = {
  server: SERVER,
};

export default config;
