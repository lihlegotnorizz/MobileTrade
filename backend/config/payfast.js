/**
 * PayFast Payment Integration
 * PayFast is a leading payment gateway in South Africa
 * Documentation: https://www.payfast.co.za/help/integration
 */

const axios = require('axios');

class PayFastService {
    constructor() {
        this.merchantId = process.env.PAYFAST_MERCHANT_ID;
        this.merchantKey = process.env.PAYFAST_MERCHANT_KEY;
        this.baseURL = process.env.PAYFAST_API_URL;
        this.returnURL = 'http://localhost:3000/payment/return';
        this.cancelURL = 'http://localhost:3000/payment/cancel';
        this.notifyURL = 'http://localhost:5000/api/payments/notify';
    }

    /**
     * Generate MD5 hash for PayFast security
     */
    generateHash(params) {
        const crypto = require('crypto');
        let hashString = '';
        
        for (let key in params) {
            if (params[key] !== null) {
                hashString += `${key}=${encodeURIComponent(params[key])}&`;
            }
        }
        
        hashString = hashString.slice(0, -1);
        hashString += this.merchantKey;
        
        return crypto.createHash('md5').update(hashString).digest('hex');
    }

    /**
     * Create payment request
     */
    createPaymentRequest(transactionData) {
        const {
            transactionId,
            amount,
            buyerEmail,
            buyerName,
            phoneModel
        } = transactionData;

        const params = {
            merchant_id: this.merchantId,
            merchant_key: this.merchantKey,
            return_url: this.returnURL,
            cancel_url: this.cancelURL,
            notify_url: this.notifyURL,
            name_first: buyerName.split(' ')[0],
            name_last: buyerName.split(' ').slice(1).join(' '),
            email_address: buyerEmail,
            m_payment_id: transactionId,
            amount: parseFloat(amount).toFixed(2),
            item_name: `MobileTrade - ${phoneModel}`,
            item_description: `Purchase of ${phoneModel} from MobileTrade`,
            custom_int1: transactionId,
            custom_str1: 'mobiletrade_purchase'
        };

        // Generate signature
        params.signature = this.generateHash(params);

        return params;
    }

    /**
     * Build PayFast form URL
     */
    getPaymentFormURL(params) {
        let formURL = `${this.baseURL}eng/process`;
        let queryString = '';

        for (let key in params) {
            queryString += `${key}=${encodeURIComponent(params[key])}&`;
        }

        return formURL + '?' + queryString.slice(0, -1);
    }

    /**
     * Verify payment notification from PayFast
     */
    verifyNotification(data) {
        const crypto = require('crypto');
        
        // Remove signature from data for hash verification
        const signature = data.signature;
        delete data.signature;

        // Create hash string
        let hashString = '';
        for (let key in data) {
            hashString += `${key}=${encodeURIComponent(data[key])}&`;
        }

        hashString = hashString.slice(0, -1);
        hashString += this.merchantKey;

        const generatedSignature = crypto.createHash('md5').update(hashString).digest('hex');

        return generatedSignature === signature;
    }

    /**
     * Query transaction status
     */
    async getTransactionStatus(transactionId) {
        try {
            const response = await axios.get(`${this.baseURL}api/query/transaction`, {
                params: {
                    merchant_id: this.merchantId,
                    merchant_key: this.merchantKey,
                    m_payment_id: transactionId
                }
            });

            return response.data;
        } catch (error) {
            console.error('PayFast status check error:', error);
            throw error;
        }
    }
}

// Export service
module.exports = PayFastService;

/**
 * USAGE EXAMPLE:
 * 
 * const PayFastService = require('./payfast');
 * const payfast = new PayFastService();
 * 
 * // Create payment
 * const transactionData = {
 *     transactionId: 'TXN123456',
 *     amount: 12500.00,
 *     buyerEmail: 'buyer@example.com',
 *     buyerName: 'John Doe',
 *     phoneModel: 'iPhone 13 Pro'
 * };
 * 
 * const params = payfast.createPaymentRequest(transactionData);
 * const paymentURL = payfast.getPaymentFormURL(params);
 * 
 * // Redirect buyer to PayFast
 * res.redirect(paymentURL);
 * 
 * // Handle notification
 * app.post('/api/payments/notify', (req, res) => {
 *     if (payfast.verifyNotification(req.body)) {
 *         // Payment verified - update transaction status
 *         console.log('Payment verified:', req.body.m_payment_id);
 *         res.sendStatus(200);
 *     } else {
 *         console.log('Invalid notification');
 *         res.sendStatus(403);
 *     }
 * });
 */
