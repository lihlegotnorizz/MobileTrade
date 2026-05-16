/**
 * Courier Integration Service
 * Supports: Aramex, The Courier Guy, and other SA-based couriers
 */

const axios = require('axios');

class CourierService {
    constructor(provider = 'thecourierguy') {
        this.provider = provider.toLowerCase();
        this.initializeProvider();
    }

    /**
     * Initialize courier provider
     */
    initializeProvider() {
        switch (this.provider) {
            case 'aramex':
                this.apiKey = process.env.ARAMEX_API_KEY;
                this.baseURL = process.env.ARAMEX_API_URL;
                this.setupAramex();
                break;
            case 'thecourierguy':
                this.apiKey = process.env.COURIER_GUY_API_KEY;
                this.baseURL = process.env.COURIER_GUY_API_URL;
                this.setupTheCourierGuy();
                break;
            default:
                throw new Error('Unknown courier provider');
        }
    }

    /**
     * Setup Aramex specific configuration
     */
    setupAramex() {
        this.config = {
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'
            }
        };
    }

    /**
     * Setup The Courier Guy specific configuration
     */
    setupTheCourierGuy() {
        this.config = {
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'
            }
        };
    }

    /**
     * Get available shipping rates
     */
    async getShippingRates(shipmentData) {
        try {
            const {
                fromCity,
                toCity,
                weight,
                dimensions
            } = shipmentData;

            let endpoint, payload;

            if (this.provider === 'aramex') {
                endpoint = '/rates';
                payload = {
                    origin: { city: fromCity, country: 'ZA' },
                    destination: { city: toCity, country: 'ZA' },
                    packages: [{
                        weight: weight,
                        dimensions: dimensions
                    }]
                };
            } else if (this.provider === 'thecourierguy') {
                endpoint = '/quote';
                payload = {
                    from_city: fromCity,
                    to_city: toCity,
                    weight: weight
                };
            }

            const response = await axios.post(
                `${this.baseURL}${endpoint}`,
                payload,
                this.config
            );

            return response.data;
        } catch (error) {
            console.error('Shipping rates error:', error);
            throw error;
        }
    }

    /**
     * Create shipment
     */
    async createShipment(shipmentData) {
        try {
            const {
                senderName,
                senderPhone,
                senderCity,
                recipientName,
                recipientPhone,
                recipientCity,
                recipientAddress,
                weight,
                contents,
                value
            } = shipmentData;

            let endpoint, payload;

            if (this.provider === 'aramex') {
                endpoint = '/shipments';
                payload = {
                    shipper: {
                        name: senderName,
                        phone: senderPhone,
                        city: senderCity
                    },
                    consignee: {
                        name: recipientName,
                        phone: recipientPhone,
                        address: recipientAddress,
                        city: recipientCity
                    },
                    shipment_details: {
                        weight: weight,
                        description: contents,
                        declared_value: value
                    }
                };
            } else if (this.provider === 'thecourierguy') {
                endpoint = '/shipments';
                payload = {
                    sender_name: senderName,
                    sender_phone: senderPhone,
                    sender_city: senderCity,
                    receiver_name: recipientName,
                    receiver_phone: recipientPhone,
                    receiver_address: recipientAddress,
                    receiver_city: recipientCity,
                    weight: weight,
                    contents: contents,
                    value: value
                };
            }

            const response = await axios.post(
                `${this.baseURL}${endpoint}`,
                payload,
                this.config
            );

            return {
                trackingNumber: response.data.tracking_number || response.data.reference,
                shipmentId: response.data.shipment_id,
                status: response.data.status,
                estimatedDelivery: response.data.estimated_delivery
            };
        } catch (error) {
            console.error('Shipment creation error:', error);
            throw error;
        }
    }

    /**
     * Track shipment
     */
    async trackShipment(trackingNumber) {
        try {
            let endpoint;

            if (this.provider === 'aramex') {
                endpoint = `/shipments/${trackingNumber}`;
            } else if (this.provider === 'thecourierguy') {
                endpoint = `/tracking/${trackingNumber}`;
            }

            const response = await axios.get(
                `${this.baseURL}${endpoint}`,
                this.config
            );

            return {
                trackingNumber: response.data.tracking_number || trackingNumber,
                status: response.data.status,
                location: response.data.location,
                lastUpdate: response.data.last_update,
                events: response.data.tracking_events || []
            };
        } catch (error) {
            console.error('Tracking error:', error);
            throw error;
        }
    }

    /**
     * Cancel shipment
     */
    async cancelShipment(trackingNumber) {
        try {
            let endpoint;

            if (this.provider === 'aramex') {
                endpoint = `/shipments/${trackingNumber}/cancel`;
            } else if (this.provider === 'thecourierguy') {
                endpoint = `/shipments/${trackingNumber}`;
            }

            const response = await axios.post(
                `${this.baseURL}${endpoint}`,
                {},
                this.config
            );

            return {
                status: 'cancelled',
                message: response.data.message
            };
        } catch (error) {
            console.error('Cancellation error:', error);
            throw error;
        }
    }

    /**
     * Get SA cities available for delivery
     */
    async getAvailableCities() {
        return {
            major_cities: [
                'Johannesburg',
                'Cape Town',
                'Durban',
                'Pretoria',
                'Bloemfontein',
                'Port Elizabeth',
                'Polokwane',
                'Rustenburg'
            ],
            note: 'Most SA couriers can deliver to all major cities and many smaller towns'
        };
    }
}

module.exports = CourierService;

/**
 * USAGE EXAMPLE:
 * 
 * const CourierService = require('./courier');
 * 
 * // Using The Courier Guy
 * const courier = new CourierService('thecourierguy');
 * 
 * // Get rates
 * app.post('/api/courier/rates', async (req, res) => {
 *     try {
 *         const { fromCity, toCity, weight } = req.body;
 *         const rates = await courier.getShippingRates({
 *             fromCity,
 *             toCity,
 *             weight
 *         });
 *         res.json(rates);
 *     } catch (error) {
 *         res.status(400).json({ error: error.message });
 *     }
 * });
 * 
 * // Create shipment
 * app.post('/api/courier/create-shipment', async (req, res) => {
 *     try {
 *         const shipmentData = req.body;
 *         const shipment = await courier.createShipment(shipmentData);
 *         res.json(shipment);
 *     } catch (error) {
 *         res.status(400).json({ error: error.message });
 *     }
 * });
 * 
 * // Track shipment
 * app.get('/api/courier/track/:trackingNumber', async (req, res) => {
 *     try {
 *         const tracking = await courier.trackShipment(req.params.trackingNumber);
 *         res.json(tracking);
 *     } catch (error) {
 *         res.status(400).json({ error: error.message });
 *     }
 * });
 */
