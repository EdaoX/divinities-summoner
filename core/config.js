const { config } = require('dotenv');
config();

module.exports.TELEGRAM_BOT_API_KEY = process.env.TELEGRAM_BOT_API_KEY;
module.exports.ALLOWED_CHAT_IDS = process.env.ALLOWED_CHAT_IDS ? process.env.ALLOWED_CHAT_IDS.split(',') : [];
module.exports.RESTRICT_ACCESS = module.exports.ALLOWED_CHAT_IDS.length > 0;
module.exports.ENVIRONMENT = process.env.ENVIRONMENT;
module.exports.DEBUG = module.exports.ENVIRONMENT === 'development';

module.exports.TELEGRAM_WEBHOOK_DOMAIN = process.env.TELEGRAM_WEBHOOK_DOMAIN;
module.exports.TELEGRAM_WEBHOOK_PORT = process.env.TELEGRAM_WEBHOOK_PORT || 3000;

module.exports.PEXELS_API_KEY = process.env.PEXELS_API_KEY;

module.exports.SERPAPI_KEY = process.env.SERPAPI_KEY;

module.exports.TENOR_API_CLIENT_KEY = process.env.TENOR_API_CLIENT_KEY;
module.exports.TENOR_API_KEY = process.env.TENOR_API_KEY;

module.exports.BLASPHEMY_FREE_CHAT_IDS = process.env.BLASPHEMY_FREE_CHAT_IDS ? process.env.BLASPHEMY_FREE_CHAT_IDS.split(',') : [];

module.exports.FILTER_BLASPHEMY = module.exports.BLASPHEMY_FREE_CHAT_IDS.length > 0;

module.exports.LAUNCH_CONFIG = (() => {
    if( process.env.ENVIRONMENT !== 'production' ) {
        return {};
    }
    
    return {
        webhook: {
            domain: process.env.TELEGRAM_WEBHOOK_DOMAIN,
            port: process.env.TELEGRAM_WEBHOOK_PORT
        },
    };
})();