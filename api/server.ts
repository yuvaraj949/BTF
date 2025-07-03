import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import Registration from './models/Registration';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:3000', 'https://btf-2025.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI_UNI || '')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

const generateRegistrationId = (): string => {
  return `BTF25-${Math.floor(100000 + Math.random() * 900000)}`;
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Send confirmation email for general registration
async function sendRegistrationConfirmationEmail(
  recipient: string,
  firstName: string,
  registrationId: string,
  registrationData: any
): Promise<boolean> {
  try {
    const mailOptions = {
      from: `"BITS Event 2025" <${process.env.EMAIL_USER}>`,
      to: recipient,
      subject: 'Your BITS Event 2025 Registration Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="color: #333; text-align: center;">Registration Confirmation</h2>
          <p>Dear ${firstName},</p>
          <p>Thank you for registering for BITS Event 2025!</p>
          <div style="background-color: #f5f5f5; padding: 15px; margin: 15px 0; border-radius: 5px;">
            <p><strong>Event Date:</strong> Nov 19, 2025</p>
            <p><strong>Venue:</strong> BITS Pilani Dubai Campus, Dubai, UAE</p>
            <p><strong>Your Registration ID:</strong> ${registrationId}</p>
          </div>
          <p><b>Your Details:</b></p>
          <ul>
            <li><b>Name:</b> ${registrationData.firstName} ${registrationData.lastName}</li>
            <li><b>Email:</b> ${registrationData.email}</li>
            <li><b>Phone:</b> ${registrationData.phone}</li>
            <li><b>Affiliation:</b> ${registrationData.affiliationType} - ${registrationData.institutionName}</li>
            <li><b>Role:</b> ${registrationData.role || '-'}</li>
            <li><b>Interested Events:</b> ${(registrationData.interestedEvents || []).join(', ') || '-'}</li>
          </ul>
          <p>We're excited to have you join us. Please save your registration ID for future reference.</p>
          <p>If you have any questions, feel free to reply to this email.</p>
          <p>Best regards,<br/>BITS Event Team</p>
        </div>
      `
    };
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return false;
  }
}

app.options('*', (req, res) => res.status(200).end());

app.get('/', (req, res) => {
  res.send('api active');
});

// --- GENERAL REGISTRATION ROUTE ---
app.post('/api/register', async (req, res) => {
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

  // Basic validation
  if (!firstName || !lastName || !email || !phone || !affiliationType || !institutionName || typeof agreeTerms !== 'boolean') {
    return res.status(400).json({ message: 'Missing required fields.' });
  }
  if (!['company', 'university', 'school'].includes(affiliationType)) {
    return res.status(400).json({ message: 'Invalid affiliation type.' });
  }
  if (!agreeTerms) {
    return res.status(400).json({ message: 'You must agree to the terms.' });
  }

  try {
    const registrationId = generateRegistrationId();
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
    await registration.save();


    // Send confirmation email
    await sendRegistrationConfirmationEmail(
      email,
      firstName,
      registrationId,
      req.body
    );

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
      phone: registration.phone,
      affiliationType: registration.affiliationType,
      institutionName: registration.institutionName,
      role: registration.role,
      interestedEvents: registration.interestedEvents,
      agreeTerms: registration.agreeTerms,
      registrationId: registration.registrationId,
      registrationDate: registration.registrationDate
    });
  } catch (error) {
    console.error('Error fetching registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
