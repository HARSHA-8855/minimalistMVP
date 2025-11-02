# Consultation & Payment Setup Guide

## Overview
The consultation feature allows users to book paid consultations for skin or hair care advice. The floating consultation button on the right side navigates to a consultation booking page with Razorpay payment integration.

## Features Implemented

### 1. Floating Consultation Button
- **Location**: Fixed on the right side of all pages
- **Component**: `Mini/frontend/src/components/ConsultButton.jsx`
- **Styling**: 
  - Gradient purple background
  - Animated bounce effect
  - Pulsing notification dot
  - Hover tooltip showing "Book Consultation"
  - Scale animation on hover

### 2. Consultation Page
- **Route**: `/consultation`
- **Component**: `Mini/frontend/src/pages/Consultation.jsx`
- **Form Fields**:
  - Name (required)
  - Age (required)
  - Gender (required: Male/Female/Other)
  - Consultation Type (required: Skin Care / Hair Care)
  - Skin Type (shown only for skin consultation)
  - Main Concerns (textarea)
  - Current Products (textarea)
- **Consultation Fee**: ₹299
- **Payment**: Integrated with Razorpay

### 3. Backend Payment Integration

#### Files Created:
1. **Payment Controller**: `Mini/backend/src/controllers/paymentController.js`
   - `createRazorpayOrder`: Creates Razorpay payment order
   - `verifyPayment`: Verifies Razorpay payment signature

2. **Payment Routes**: `Mini/backend/src/routes/paymentRoutes.js`
   - `POST /api/create-razorpay-order`: Create payment order
   - `POST /api/verify-payment`: Verify payment

3. **Server Updated**: `Mini/backend/src/server.js`
   - Added payment routes

## Setup Instructions

### 1. Razorpay Configuration

You need to add your Razorpay keys to the backend `.env` file:

```env
# Add these to Mini/backend/.env
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
```

#### How to Get Razorpay Keys:

1. **Sign up for Razorpay Account**:
   - Go to https://razorpay.com/
   - Sign up or log in

2. **Get Test/Live Keys**:
   - Dashboard → Settings → API Keys
   - Create a test key pair (for development)
   - Or copy live keys (for production)

3. **Add Keys to `.env`**:
   ```env
   RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=your_secret_key_here
   ```

### 2. Environment Variables Required

The backend needs these environment variables in `Mini/backend/.env`:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Server
PORT=6500
```

### 3. Installation

```bash
# Backend dependencies are already installed
cd Mini/backend
npm install  # If not already done

# Frontend dependencies are already installed
cd Mini/frontend
npm install  # If not already done
```

### 4. Running the Application

**Terminal 1 - Backend**:
```bash
cd Mini/backend
npm run dev
```

**Terminal 2 - Frontend**:
```bash
cd Mini/frontend
npm run dev
```

### 5. Testing the Feature

1. Open the application in browser
2. Look for the floating consultation button (bottom right)
3. Click to navigate to consultation page
4. Fill the form:
   - Name: John Doe
   - Age: 25
   - Gender: Male
   - Consultation Type: Skin Care
   - Skin Type: Oily
   - Main Concerns: Acne and oily skin
   - Current Products: None
5. Click "Pay ₹299 & Book Consultation"
6. You'll be redirected to Razorpay checkout
7. Use test card: 4111 1111 1111 1111
8. Any future expiry date
9. Any CVV
10. Any name/email

## Payment Flow

1. **User submits form** → Frontend validates fields
2. **Create Razorpay order** → Backend creates order via Razorpay API
3. **Razorpay checkout** → User completes payment
4. **Payment verification** → Backend verifies signature using crypto
5. **Success** → Consultation booked successfully

## File Structure

```
Mini/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ConsultButton.jsx        # Floating button
│   │   ├── pages/
│   │   │   └── Consultation.jsx         # Booking form
│   │   └── App.jsx                      # Routes configured
│   └── package.json
│
└── backend/
    ├── src/
    │   ├── controllers/
    │   │   └── paymentController.js     # Razorpay logic
    │   ├── routes/
    │   │   └── paymentRoutes.js         # Payment routes
    │   └── server.js                     # Server config
    ├── package.json                      # Contains razorpay dependency
    └── .env                              # Contains Razorpay keys
```

## Additional Notes

- **Test Mode**: Use Razorpay test keys during development
- **Production**: Replace with live keys before deployment
- **Consultation Fee**: Currently hardcoded to ₹299 (29900 paise)
- **Database Storage**: Consultation data is logged but not stored in DB yet
- **Future Enhancement**: Can add Consultation model to save bookings

## Troubleshooting

### Payment Not Working?
1. Check if Razorpay keys are in `.env`
2. Verify backend server is running on port 6500
3. Check browser console for errors
4. Ensure network connectivity for Razorpay CDN

### Button Not Showing?
1. Check if `<ConsultButton />` is in `App.jsx`
2. Verify route `/consultation` exists
3. Check for CSS conflicts with z-index

### Form Not Submitting?
1. Fill all required fields
2. Check browser console for API errors
3. Verify backend payment routes are accessible

## Security Notes

- **Never commit `.env` files** to version control
- **Use environment variables** for all secrets
- **Verify signatures** on backend before processing
- **HTTPS required** in production for Razorpay

## Support

For Razorpay documentation:
- https://razorpay.com/docs/payments/server-integration/nodejs/payment-gateway/build-integration/

