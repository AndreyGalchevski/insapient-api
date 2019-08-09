const paypal = require('paypal-rest-sdk');
const qs = require('query-string');

paypal.configure({
  mode: process.env.PAYPAL_MODE,
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET
});

const createPay = paymentInfo => {
  return new Promise((resolve, reject) => {
    paypal.payment.create(paymentInfo, (err, payment) => {
      if (err) {
        reject(err);
      } else {
        resolve(payment);
      }
    });
  });
};

const pay = async transaction => {
  const paymentInfo = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal'
    },
    redirect_urls: {
      return_url: process.env.PAYPAL_RETURN_URL,
      cancel_url: process.env.PAYPAL_CANCEL_URL
    },
    transactions: [transaction]
  };

  try {
    const res = await createPay(paymentInfo);
    const { id, links } = res;
    const paymentLink = links.find(link => link.rel === 'approval_url');
    const paymentPageUrl = paymentLink.href;
    const { token } = qs.parseUrl(paymentPageUrl).query;
    return { paymentId: id, token, paymentPageUrl: paymentLink.href };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const executePay = (paymentId, paymentInfo) => {
  return new Promise((resolve, reject) => {
    paypal.payment.execute(paymentId, paymentInfo, (err, payment) => {
      if (err) {
        reject(err);
      } else {
        resolve(payment);
      }
    });
  });
};

const execute = async (payerId, paymentId, amount) => {
  const paymentInfo = {
    payer_id: payerId,
    transactions: [{ amount }]
  };

  try {
    const res = await executePay(paymentId, paymentInfo);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  pay,
  execute
};
