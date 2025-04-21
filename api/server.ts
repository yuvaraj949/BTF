import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { body, validationResult } from 'express-validator';
import nodemailer from 'nodemailer';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:3000', 'https://btfbpdc.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || '')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Registration Schema
const registrationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  affiliationType: { type: String, enum: ['company', 'university', 'school'] },
  institutionName: { type: String },
  role: { type: String },
  interestedEvents: [{ type: String }],
  agreeTerms: { type: Boolean, required: true },
  registrationDate: { type: Date, default: Date.now },
  registrationId: { type: String, unique: true }
});

// Registration Model
const Registration = mongoose.model('Registration', registrationSchema);

// Generate unique registration ID
const generateRegistrationId = () => {
  return `BTF25-${Math.floor(100000 + Math.random() * 900000)}`;
};

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Function to send confirmation email
async function sendConfirmationEmail(
  recipient: string,
  firstName: string,
  registrationId: string
): Promise<boolean> {
  // Function implementation remains the same
  try {
    const mailOptions = {
      from: `"BITS Tech Fest 2025" <${process.env.EMAIL_USER}>`,
      to: recipient,
      subject: 'Your BITS Tech Fest 2025 Registration Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="color: #333; text-align: center;">Registration Confirmation</h2>
          <p>Dear ${firstName},</p>
          <p>Thank you for registering for BITS Tech Fest 2025!</p>
          <div style="background-color: #f5f5f5; padding: 15px; margin: 15px 0; border-radius: 5px;">
            <p><strong>Event Date:</strong> April 30, 2025</p>
            <p><strong>Venue:</strong> BITS Pilani Dubai Campus, Dubai, UAE</p>
            <p><strong>Your Registration ID:</strong> ${registrationId}</p>
          </div>
          <p>We're excited to have you join us for this event. Please save your registration ID for future reference.</p>
          <p>If you have any questions, feel free to reply to this email.</p>
          <p>Best regards,<br>BITS Tech Fest Team</p>
        </div>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return false;
  }
}


app.options('*', (req, res) => {
  res.status(200).end();
});

app.get('/', (req, res) => {
  res.send('api active');
});

// Registration Route
app.post('/api/register', [
  // Validation
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Must be a valid email'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('agreeTerms').equals('true').withMessage('You must agree to the terms and conditions')
], async (req: express.Request, res: express.Response) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    affiliationType,
    institutionName,
    role,
    interestedEvents,
    agreeTerms
  } = req.body;

  try {
    // Check if user already registered
    const existingRegistration = await Registration.findOne({ email });
    if (existingRegistration) {
      return res.status(400).json({
        message: 'This email has already been registered for the event'
      });
    }

    // Create registration ID
    const registrationId = generateRegistrationId();
    
    // Create new registration
    const registration = new Registration({
      firstName,
      lastName,
      email,
      phone,
      affiliationType,
      institutionName,
      role,
      interestedEvents,
      agreeTerms,
      registrationId
    });

    // Save registration to database
    await registration.save();
    
    // Send confirmation email
    await sendConfirmationEmail(email, firstName, registrationId);

    res.status(201).json({
      message: 'Registration successful',
      registrationId,
      email
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Start server
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the Express app for Vercel
export default app;
