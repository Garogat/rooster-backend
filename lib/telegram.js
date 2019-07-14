const got = require('got');

async function sendTelegram(text) {
  if (!process.env.TELEGRAM_TOKEN) {
    console.log('Telegram is not configured');
    return;
  }

  const apiToken = process.env.TELEGRAM_TOKEN;

  const options= {
    body: {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      parse_mode: 'HTML',
      text,
    },
    form: true,
    json: true,
    method: 'post',
    baseUrl: `https://api.telegram.org/bot${apiToken}/`,
  };

  let res;
  try {
    res = await got('sendMessage', options);
  } catch (error) {
    console.log(error);
    return;
  }

  return res.body || false;
}

module.exports = {
  sendTelegram,
};
