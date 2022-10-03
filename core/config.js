const { config } = require('dotenv');
config();

module.exports.TELEGRAM_BOT_API = process.env.TELEGRAM_BOT_API;
module.exports.ALLOWED_CHAT_IDS = process.env.ALLOWED_CHAT_IDS.split(',');
module.exports.RESTRICT_ACCESS = process.env.RESTRICT_ACCESS !== 'false';
module.exports.ENVIRONMENT = process.env.ENVIRONMENT;
module.exports.DEBUG = module.exports.ENVIRONMENT === 'development';

module.exports.TELEGRAM_WEBHOOK_DOMAIN = process.env.TELEGRAM_WEBHOOK_DOMAIN;
module.exports.TELEGRAM_WEBHOOK_PORT = process.env.TELEGRAM_WEBHOOK_PORT || 3000;