import express from 'express';
import mongoose, { SetExpressionOperator } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { body, validationResult } from 'express-validator';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
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

    // In a real application, you would send a confirmation email here
    
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

// Get registration details
app.get('/api/registration/:id', async (req, res) => {
  try {
    const registration = await Registration.findOne({ registrationId: req.params.id });
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }
    
    res.json({
      firstName: registration.firstName,
      lastName: registration.lastName,
      email: registration.email,
      registrationId: registration.registrationId,
      interestedEvents: registration.interestedEvents
    });
  } catch (error) {
    console.error('Error fetching registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get event statistics (for admin purposes)
app.get('/api/event-stats', async (req, res) => {
  try {
    const totalRegistrations = await Registration.countDocuments();
    
    // Count registrations by affiliation type
    const affiliationStats = await Registration.aggregate([
      { $group: { _id: '$affiliationType', count: { $sum: 1 } } }
    ]);
    
    // Count interest in each event
    const eventInterestStats = await Registration.aggregate([
      { $unwind: '$interestedEvents' },
      { $group: { _id: '$interestedEvents', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    res.json({
      totalRegistrations,
      affiliationStats,
      eventInterestStats
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Server error' });
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

