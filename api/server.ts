import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import Registration from './models/Registration';
import QRCode from 'qrcode';

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

// Always use the 2025 database, regardless of the original DB in the URI
let baseUri = process.env.MONGODB_URI_UNI || '';
if (baseUri) {
  // Replace the database name in the URI with '2025'
  baseUri = baseUri.replace(/(mongodb(?:\+srv)?:\/\/[^/]+)\/(\w+)/, '$1/2025');
}
mongoose.connect(baseUri)
  .then(() => console.log('MongoDB connected to 2025 database successfully'))
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
    // Generate QR code as a buffer (for attachment)
    const qrBuffer = await QRCode.toBuffer(registrationId, {
      color: {
        dark: '#F66200', // logo orange
        light: '#000000' // black background
      },
      margin: 2,
      width: 200
    });
    const mailOptions = {
      from: `"BITS Event 2025" <${process.env.EMAIL_USER}>`,
      to: recipient,
      subject: 'Your BITS Event 2025 Registration Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background: #181818; color: #F66200;">
          <h2 style="color: #F66200; text-align: center;">Registration Confirmation</h2>
          <p>Dear ${firstName},</p>
          <p>Thank you for registering for BITS Event 2025!</p>
          <div style="background-color: #111; padding: 15px; margin: 15px 0; border-radius: 5px;">
            <p style='color:#fff;'><strong>Event Date:</strong> Nov 19, 2025</p>
            <p style='color:#fff;'><strong>Venue:</strong> BITS Pilani Dubai Campus, Dubai, UAE</p>
            <p><strong>Your Registration ID:</strong> <span style="color:#F66200">${registrationId}</span></p>
            <div style="text-align:center; margin: 10px 0;">
              <img src="cid:qrimage" alt="QR Code" style="width:120px; height:120px; background:#000; padding:8px; border-radius:32px; box-shadow:0 0 0 6px #F66200, 0 0 0 14px #181818;" />
            </div>
          </div>
          <p><b>Your Details:</b></p>
          <ul>
            <li><b>Name:</b> <span style='color:#F66200;'>${registrationData.firstName} ${registrationData.lastName}</span></li>
            <li><b>Email:</b> <a href='mailto:${registrationData.email}' style='color:#F66200;'>${registrationData.email}</a></li>
            <li><b>Phone:</b> <span style='color:#F66200;'>${registrationData.phone}</span></li>
            <li><b>Affiliation:</b> <span style='color:#F66200;'>${registrationData.affiliationType} - ${registrationData.institutionName}</span></li>
            <li><b>Role:</b> <span style='color:#F66200;'>${registrationData.role || '-'}</span></li>
            <li><b>Interested Events:</b> <span style='color:#F66200;'>${(registrationData.interestedEvents || []).join(', ') || '-'}</span></li>
          </ul>
          <p style="color:#F66200; font-size:13px; margin:10px 0 0 0;">Please carry this pass with you while attending the event.</p>
          <div style="margin:18px 0 0 0; text-align:center;">
            <a href="https://btf-2025.vercel.app/pass/${registrationId}" style="background:#F66200; color:#181818; padding:10px 18px; border-radius:8px; text-decoration:none; font-weight:bold;">View & Download Pass (PDF)</a>
          </div>
          <p style="margin-top:18px; color:#aaa;">If you have any questions, feel free to reply to this email.</p>
          <p style="margin-top:8px;">Best regards,<br/>BITS Event Team</p>
        </div>
      `,
      attachments: [
        {
          filename: 'qrcode.png',
          content: qrBuffer,
          cid: 'qrimage'
        }
      ]
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
