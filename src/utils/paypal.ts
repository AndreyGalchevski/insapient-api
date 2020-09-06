import paypal, {
  Payment,
  PaymentResponse,
  payment as paymentNS,
  Transaction,
} from 'paypal-rest-sdk';
import qs from 'query-string';

paypal.configure({
  mode: process.env.PAYPAL_MODE || 'sandbox',
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

const createPay = (paymentInfo: Payment) => {
  return new Promise<PaymentResponse>((resolve, reject) => {
    paypal.payment.create(paymentInfo, (err, payment) => {
      if (err) {
        reject(err);
      } else {
        resolve(payment);
      }
    });
  });
};

const pay = async (
  transaction: Transaction,
): Promise<{ paymentId: string; token: string; paymentPageUrl: string }> => {
  const paymentInfo: Payment = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: process.env.PAYPAL_RETURN_URL,
      cancel_url: process.env.PAYPAL_CANCEL_URL,
    },
    transactions: [transaction],
  };

  try {
    const res = await createPay(paymentInfo);
    const { id, links } = res;
    const paymentLink = links.find((link) => link.rel === 'approval_url');
    const paymentPageUrl = paymentLink.href;
    const { token } = qs.parseUrl(paymentPageUrl).query;
    return { paymentId: id, token: token as string, paymentPageUrl: paymentLink.href };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const executePay = (paymentID: string, paymentInfo: paymentNS.ExecuteRequest) => {
  return new Promise<PaymentResponse>((resolve, reject) => {
    paypal.payment.execute(paymentID, paymentInfo, (err, payment) => {
      if (err) {
        reject(err);
      } else {
        resolve(payment);
      }
    });
  });
};

const execute = async (
  payerID: string,
  paymentID: string,
  amount: number,
): Promise<PaymentResponse> => {
  const paymentInfo = {
    payer_id: payerID,
    transactions: [{ amount }],
  };

  try {
    const res = await executePay(paymentID, paymentInfo);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  pay,
  execute,
};
