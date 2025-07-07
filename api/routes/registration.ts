/**
 * registration route
 * Express route for handling registration-related API endpoints.
 * Includes validation, email sending, and error handling.
 */
/**
 * Registration API routes for BITS Tech Fest 2025.
 * Handles registration, validation, and confirmation email logic.
 */
import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import nodemailer from 'nodemailer';
import Registration from '../models/Registration';

const router = express.Router();

/**
 * Generate a unique registration ID for each new registration
 */
const generateRegistrationId = (): string => {
  return `BTF25-${Math.floor(100000 + Math.random() * 900000)}`;
};

/**
 * Email transporter setup - optimized for Vercel
 */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false // helps with some SSL issues
  }
});

/**
 * Function to send confirmation email to the user after registration
 */
async function sendConfirmationEmail(
  recipient: string, 
  firstName: string, 
  registrationId: string
): Promise<boolean> {
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
    
    // Use promise-based approach for Vercel compatibility
    const info = await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return false;
  }
}

// Add base64 decode helper
function decodeBase64(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return Buffer.from(str, 'base64').toString('utf8');
}

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
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const existingRegistration = await Registration.findOne({ email: req.body.email });
      if (existingRegistration) {
        return res.status(400).json({
          message: 'This email has already been registered for the event'
        });
      }

      const registrationId = generateRegistrationId();
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

      await registration.save();
      
      // Send confirmation email - optimized for Vercel
      try {
        await sendConfirmationEmail(
          req.body.email, 
          req.body.firstName, 
          registrationId
        );
        console.log('Email sent successfully to:', req.body.email);
      } catch (emailError) {
        console.error('Failed to send email but registration was successful:', emailError);
        // We don't return an error to the client since registration was successful
      }

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

router.get('/registration/:id', async (req, res) => {
  try {
    const id = decodeBase64(req.params.id);
    const registration = await Registration.findOne({ registrationId: id });
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
