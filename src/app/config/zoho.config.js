export const zohoConfig = {
  clientId: process.env.ZOHO_CLIENT_ID,
  clientSecret: process.env.ZOHO_CLIENT_SECRET,
  redirectUri: process.env.ZOHO_REDIRECT_URI,
  merchantKey: process.env.ZOHO_MERCHANT_KEY,
  apiEndpoint: process.env.ZOHO_API_ENDPOINT,
  paymentEndpoint: process.env.ZOHO_PAYMENT_ENDPOINT,
};

export const emailConfig = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
  password: process.env.SMTP_PASSWORD,
};