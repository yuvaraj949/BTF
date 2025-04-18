import express from 'express';
import { body, validationResult } from 'express-validator';
import Registration from '../models/Registration';

const router = express.Router();

// Generate unique registration ID
const generateRegistrationId = (): string => {
  return `BTF25-${Math.floor(100000 + Math.random() * 900000)}`;
};

// Registration endpoint
router.post(
  '/register',
  [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('affiliationType').isIn(['company', 'university', 'school']).withMessage('Valid affiliation type is required'),
    body('institutionName').notEmpty().withMessage('Institution name is required'),
    body('agreeTerms').equals('true').withMessage('You must agree to the terms and conditions')
  ],
  async (req: express.Request, res: express.Response) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if email already registered
      const existingRegistration = await Registration.findOne({ email: req.body.email });
      if (existingRegistration) {
        return res.status(400).json({
          message: 'This email has already been registered for the event'
        });
      }

      // Generate registration ID
      const registrationId = generateRegistrationId();

      // Create new registration
      const registration = new Registration({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        affiliationType: req.body.affiliationType,
        institutionName: req.body.institutionName,
        role: req.body.role || '',
        interestedEvents: req.body.interestedEvents || [],
        agreeTerms: req.body.agreeTerms,
        registrationId
      });

      // Save to database
      await registration.save();

      // Send successful response
      res.status(201).json({
        message: 'Registration successful',
        registrationId,
        email: req.body.email
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error during registration' });
    }
  }
);

// Get registration by ID
router.get('/registration/:id', async (req, res) => {
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

export default router;
