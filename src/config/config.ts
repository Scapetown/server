import dotenv from 'dotenv';
dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 8000;
const SERVER_PREFIX = process.env.SERVER_PREFIX || 'api';

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
  prefix: SERVER_PREFIX,
};

const AUTHOR = process.env.AUTHOR;

const GAME_DURATION = parseInt(process.env.GAME_DURATION) || 900000;

const GAME = {
  duration: GAME_DURATION,
};

const config = {
  server: SERVER,
  author: AUTHOR,
  game: GAME,
};

export default config;
