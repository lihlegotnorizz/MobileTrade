/**
 * Stripe Payment Integration
 * Stripe is an international payment processor supporting South Africa
 * Documentation: https://stripe.com/docs
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class StripeService {
    /**
     * Create payment intent
     */
    async createPaymentIntent(paymentData) {
        try {
            const {
                amount,
                currency = 'ZAR',
                buyerEmail,
                description,
                metadata
            } = paymentData;

            const intent = await stripe.paymentIntents.create({
                amount: Math.round(amount * 100), // Amount in cents
                currency: currency.toLowerCase(),
                payment_method_types: ['card'],
                receipt_email: buyerEmail,
                description: description,
                metadata: metadata || {}
            });

            return {
                clientSecret: intent.client_secret,
                paymentIntentId: intent.id
            };
        } catch (error) {
            console.error('Stripe error:', error);
            throw error;
        }
    }

    /**
     * Confirm payment
     */
    async confirmPayment(paymentIntentId) {
        try {
            const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
            return {
                status: intent.status,
                amount: intent.amount / 100,
                currency: intent.currency
            };
        } catch (error) {
            console.error('Payment confirmation error:', error);
            throw error;
        }
    }

    /**
     * Create refund
     */
    async createRefund(paymentIntentId, amount = null) {
        try {
            const refund = await stripe.refunds.create({
                payment_intent: paymentIntentId,
                amount: amount ? Math.round(amount * 100) : null
            });

            return {
                refundId: refund.id,
                status: refund.status,
                amount: refund.amount / 100
            };
        } catch (error) {
            console.error('Refund error:', error);
            throw error;
        }
    }

    /**
     * Handle webhook events
     */
    async handleWebhook(event) {
        switch (event.type) {
            case 'payment_intent.succeeded':
                console.log('✅ Payment succeeded:', event.data.object.id);
                return {
                    status: 'success',
                    paymentIntentId: event.data.object.id
                };

            case 'payment_intent.payment_failed':
                console.log('❌ Payment failed:', event.data.object.id);
                return {
                    status: 'failed',
                    paymentIntentId: event.data.object.id
                };

            case 'charge.refunded':
                console.log('💸 Charge refunded:', event.data.object.id);
                return {
                    status: 'refunded',
                    chargeId: event.data.object.id
                };

            default:
                return { status: 'unknown' };
        }
    }
}

module.exports = StripeService;

/**
 * USAGE EXAMPLE:
 * 
 * const StripeService = require('./stripe');
 * const stripe = new StripeService();
 * 
 * // Create payment
 * app.post('/api/payments/create-intent', async (req, res) => {
 *     try {
 *         const { amount, buyerEmail, phoneModel } = req.body;
 *         
 *         const paymentData = {
 *             amount: amount,
 *             currency: 'ZAR',
 *             buyerEmail: buyerEmail,
 *             description: `Purchase of ${phoneModel}`,
 *             metadata: {
 *                 transactionId: 'TXN123456',
 *                 phoneModel: phoneModel
 *             }
 *         };
 *
 *         const result = await stripe.createPaymentIntent(paymentData);
 *         res.json(result);
 *     } catch (error) {
 *         res.status(400).json({ error: error.message });
 *     }
 * });
 * 
 * // Confirm payment
 * app.post('/api/payments/confirm', async (req, res) => {
 *     try {
 *         const { paymentIntentId } = req.body;
 *         const result = await stripe.confirmPayment(paymentIntentId);
 *         res.json(result);
 *     } catch (error) {
 *         res.status(400).json({ error: error.message });
 *     }
 * });
 */
