require('dotenv').config();
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if(req.method !== 'POST') return res.status(405).json({ error:'Method not allowed' });

  const { username, password } = req.body;

  // Demo login: username=demo, password=demo123
  if(username === 'demo' && password === 'demo123') {
    // Kirim notifikasi ke Telegram
    const message = `Login sukses!\nUsername: ${username}\nTime: ${new Date().toLocaleString()}`;
    try {
      await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text: message })
      });
    } catch(e){
      console.error('Telegram error', e);
    }

    return res.json({ ok:true });
  } else {
    return res.status(401).json({ error:'Username atau password salah' });
  }
};
