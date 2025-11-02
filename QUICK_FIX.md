# Quick Fix: Backend is Running but Razorpay Not Configured

## Current Status
✅ Backend server is running on port 6500  
✅ All routes are working  
⚠️ Razorpay payment gateway needs configuration

## Issue
When you click "Pay ₹299 & Book Consultation", you get a clear error message:
`"Payment gateway is not configured. Please add Razorpay keys to .env file."`

## Solution: Add Razorpay Keys

### Step 1: Create/Edit .env File
Open or create the file:
```
Mini/backend/.env
```

### Step 2: Add Razorpay Keys
Add these lines to your `.env` file:

```env
RAZORPAY_KEY_ID=your_key_id_here
RAZORPAY_KEY_SECRET=your_secret_key_here
```

### Step 3: Get Your Keys

#### Option A: Get Test Keys (Recommended for Development)
1. Go to https://dashboard.razorpay.com/
2. Sign up or log in
3. In the left sidebar, click on "Settings"
4. Click "API Keys"
5. Click "Generate Test Key"
6. Copy the "Key ID" and "Key Secret"
7. Paste them in your `.env` file

#### Option B: Get Live Keys (For Production)
1. Go to https://dashboard.razorpay.com/
2. Log in to your account
3. Settings → API Keys
4. Copy your existing live keys

### Step 4: Example .env File
Your complete `.env` file should look like this:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/minimalist

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Razorpay Keys
RAZORPAY_KEY_ID=rzp_test_1234567890
RAZORPAY_KEY_SECRET=your_secret_key_here

# Server Port
PORT=6500
```

### Step 5: Restart Backend
After adding the keys, restart your backend server:

```bash
# Stop the current backend (Ctrl+C in terminal)
# Then restart:
cd Mini/backend
npm run dev
```

### Step 6: Test Again
1. Go to your frontend (usually http://localhost:5173)
2. Click the consultation button (purple button bottom-right)
3. Fill the form
4. Click "Pay ₹299 & Book Consultation"
5. You should now see Razorpay checkout!

## Testing Payment with Test Keys

When you use Razorpay test keys, use these test card details:

**Test Card**: 4111 1111 1111 1111  
**Expiry**: Any future date (e.g., 12/25)  
**CVV**: Any 3 digits (e.g., 123)  
**Name**: Any name  
**Email**: Any email  

## If Still Not Working

### Check 1: .env File Location
Make sure `.env` is in `Mini/backend/.env` (same folder as `package.json`)

### Check 2: Server Restarted
Backend must be restarted to load new environment variables

### Check 3: No Extra Spaces
Make sure there are no spaces around the `=` sign:
```env
# ✅ CORRECT
RAZORPAY_KEY_ID=rzp_test_1234567890

# ❌ WRONG
RAZORPAY_KEY_ID = rzp_test_1234567890
```

### Check 4: Check Console
Look at the backend terminal. You should see:
```
🚀 Server running on port 6500
MongoDB Connected: localhost
```

### Check 5: Test with curl
```powershell
$body = '{"amount":29900,"currency":"INR"}' | ConvertFrom-Json | ConvertTo-Json -Compress
Invoke-WebRequest -Uri http://localhost:6500/api/create-razorpay-order -Method POST -Body $body -ContentType "application/json"
```

If you see an error, it will tell you what's wrong.

## Current Working State

✅ **Frontend**: Running and connected  
✅ **Backend**: Running on port 6500  
✅ **Database**: Connected  
✅ **Routes**: All working  
✅ **Consultation Form**: Beautiful and ready  
✅ **Payment Integration**: Just needs keys!

## Need Help?

If you're still having issues:
1. Check the backend console for error messages
2. Make sure the `.env` file exists and has the correct keys
3. Restart the backend server after editing `.env`
4. Test with the curl command above

## Security Note

⚠️ **NEVER commit your `.env` file to Git!**

The `.env` file should already be in `.gitignore`. If not, add it:
```
Mini/backend/.env
```

