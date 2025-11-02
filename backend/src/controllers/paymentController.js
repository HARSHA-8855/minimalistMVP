import Razorpay from 'razorpay';
import crypto from 'crypto';

// Initialize Razorpay only if keys are provided
let razorpay = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

export const createRazorpayOrder = async (req, res) => {
  try {
    // Check if Razorpay is configured
    if (!razorpay) {
      return res.status(500).json({
        success: false,
        message: 'Payment gateway is not configured. Please add Razorpay keys to .env file.',
      });
    }

    const { amount, currency = 'INR', consultationData } = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: 'Amount is required',
      });
    }

    // Create Razorpay order
    const options = {
      amount: amount, // amount in paise
      currency: currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        consultationData: JSON.stringify(consultationData || {}),
      },
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      razorpayKey: process.env.RAZORPAY_KEY_ID,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
      },
    });
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating payment order',
      error: error.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    // Check if Razorpay is configured
    if (!razorpay || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({
        success: false,
        message: 'Payment gateway is not configured. Please add Razorpay keys to .env file.',
      });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, consultationData } = req.body;

    // Verify payment signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed',
      });
    }

    // Payment verified successfully
    // Here you can save consultation data to database
    
    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      consultationData,
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying payment',
      error: error.message,
    });
  }
};

