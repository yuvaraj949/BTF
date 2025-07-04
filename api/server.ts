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


// Generate registration ID in ascending order (no clashes)
const generateRegistrationId = async (): Promise<string> => {
  // Find the latest registration
  const latest = await Registration.findOne({})
    .sort({ registrationDate: -1 })
    .select('registrationId')
    .lean();
  let nextNumber = 1;
  if (latest && latest.registrationId) {
    // Extract the number part from the registrationId (e.g., BTF25-000001)
    const match = latest.registrationId.match(/BTF25-(\d{6})/);
    if (match) {
      nextNumber = parseInt(match[1], 10) + 1;
    }
  }
  // Pad with leading zeros
  const nextId = `BTF25-${String(nextNumber).padStart(6, '0')}`;
  return nextId;
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
    // Generate QR code as data URL (using Google Chart API for email compatibility)
    // Use Google Chart API for QR, with a white background and more rounded border (simulate with border-radius and box-shadow)
    const qrUrl = `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chco=FFD600,000000&chld=H|0&chl=${encodeURIComponent(registrationId)}`;
    const mailOptions = {
      from: `"BITS Event 2025" <${process.env.EMAIL_USER}>`,
      to: recipient,
      subject: 'Your BITS Event 2025 Registration Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background: #181818; color: #FFD600;">
          <h2 style="color: #FFD600; text-align: center;">Registration Confirmation</h2>
          <p>Dear ${firstName},</p>
          <p>Thank you for registering for BITS Event 2025!</p>
          <div style="background-color: #23272F; padding: 15px; margin: 15px 0; border-radius: 5px;">
            <p style='color:#fff;'><strong>Event Date:</strong> Nov 19, 2025</p>
            <p style='color:#fff;'><strong>Venue:</strong> BITS Pilani Dubai Campus, Dubai, UAE</p>
            <p><strong>Your Registration ID:</strong> <span style="color:#FFD600">${registrationId}</span></p>
            <div style="text-align:center; margin: 10px 0;">
              <img src="${qrUrl}" alt="QR Code" style="width:120px; height:120px; background:#000; padding:8px; border-radius:32px; box-shadow:0 0 0 6px #FFD600, 0 0 0 14px #181818;" />
            </div>
          </div>
          <p><b>Your Details:</b></p>
          <ul>
            <li><b>Name:</b> <span style='color:#FFD600;'>${registrationData.firstName} ${registrationData.lastName}</span></li>
            <li><b>Email:</b> <a href='mailto:${registrationData.email}' style='color:#FFD600;'>${registrationData.email}</a></li>
            <li><b>Phone:</b> <span style='color:#FFD600;'>${registrationData.phone}</span></li>
            <li><b>Affiliation:</b> <span style='color:#FFD600;'>${registrationData.affiliationType} - ${registrationData.institutionName}</span></li>
            <li><b>Role:</b> <span style='color:#FFD600;'>${registrationData.role || '-'}</span></li>
            <li><b>Interested Events:</b> <span style='color:#FFD600;'>${(registrationData.interestedEvents || []).join(', ') || '-'}</span></li>
          </ul>
          <p style="color:#FFD600; font-size:13px; margin:10px 0 0 0;">Please carry this pass with you while attending the event.</p>
          <div style="margin:18px 0 0 0; text-align:center;">
            <a href="https://btf-2025.vercel.app/pass/${registrationId}" style="background:#FFD600; color:#181818; padding:10px 18px; border-radius:8px; text-decoration:none; font-weight:bold;">View & Download Pass (PDF)</a>
          </div>
          <p style="margin-top:18px; color:#aaa;">If you have any questions, feel free to reply to this email.</p>
          <p style="margin-top:8px;">Best regards,<br/>BITS Event Team</p>
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
    const registrationId = await generateRegistrationId();
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
