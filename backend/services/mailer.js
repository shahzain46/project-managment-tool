const sendGrid = require('@sendgrid/mail');

sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Send email through sendgrid service
 * @param message { to, from, subject, text, html };
 * @returns {Promise<[ClientResponse , {}]>}
 */
module.exports = message => sendGrid.send({ ...message, from: 'support@taska.space' });
