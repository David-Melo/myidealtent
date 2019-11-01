const crypto = require('crypto');

const ENCRYPTION_KEY = process.env.CRYPT_KEY;
const ENCRYPTION_TOKEN = process.env.CRYPT_TOKEN;

function decrypt(data) {
    const  IV = Buffer.from(ENCRYPTION_TOKEN).toString('hex').slice(0, 16);
    const mykey = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), IV);
    let p = mykey.update(data, 'hex', 'utf8');
    let payload = p += mykey.final('utf8');
    return payload;
}

module.exports = {
    decrypt
};