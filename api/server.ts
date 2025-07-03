import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import HackathonTeam from './models/HackathonTeam'; // <-- NEW MODEL

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

// Send confirmation email to team leader
async function sendTeamConfirmationEmail(
  recipient: string,
  leaderName: string,
  teamName: string,
  registrationId: string,
  members: any[]
): Promise<boolean> {
  try {
    const memberList = members.map((m, i) =>
      `<li><b>${i === 0 ? 'Team Leader' : `Member ${i+1}`}</b>: ${m.firstName} ${m.lastName} (${m.email}, ${m.countryCode}${m.phoneNumber}, ${m.college}, ${m.educationLevel})</li>`
    ).join('');
    const mailOptions = {
      from: `"BITS Hackathon 2025" <${process.env.EMAIL_USER}>`,
      to: recipient,
      subject: 'Your BITS Hackathon 2025 Team Registration Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="color: #333; text-align: center;">Team Registration Confirmation</h2>
          <p>Dear ${leaderName},</p>
          <p>Thank you for registering your team <b>${teamName}</b> for BITS Hackathon 2025!</p>
          <div style="background-color: #f5f5f5; padding: 15px; margin: 15px 0; border-radius: 5px;">
            <p><strong>Event Date:</strong> Nov 19, 2025</p>
            <p><strong>Venue:</strong> BITS Pilani Dubai Campus, Dubai, UAE</p>
            <p><strong>Your Team Registration ID:</strong> ${registrationId}</p>
          </div>
          <p><b>Team Members:</b></p>
          <ul>${memberList}</ul>
          <p>We're excited to have your team join us. Please save your registration ID for future reference.</p>
          <p>If you have any questions, feel free to reply to this email.</p>
          <p>Best regards,<br/>BITS Hackathon Team</p>
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

// --- HACKATHON TEAM REGISTRATION ROUTE ---
app.post('/api/register', async (req, res) => {
  const { teamName, members } = req.body;

  // Basic validation
  if (!teamName || !Array.isArray(members) || members.length < 1 || members.length > 5) {
    return res.status(400).json({ message: 'Invalid team data. Team name and 1-5 members required.' });
  }
  for (const m of members) {
    if (
      !m.firstName || !m.lastName || !m.email || !m.countryCode ||
      !m.phoneNumber || !m.college || !['UG','PG','PhD'].includes(m.educationLevel)
    ) {
      return res.status(400).json({ message: 'All member fields are required.' });
    }
  }

  try {
    const registrationId = generateRegistrationId();
    const team = new HackathonTeam({
      teamName,
      members,
      registrationId
    });
    await team.save();

    // Send confirmation email to team leader (first member)
    await sendTeamConfirmationEmail(
      members[0].email,
      members[0].firstName,
      teamName,
      registrationId,
      members
    );

    res.status(201).json({
      message: 'Team registration successful',
      registrationId,
      email: members[0].email
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Get registration details
app.get('/api/registration/:id', async (req, res) => {
  try {
    const team = await HackathonTeam.findOne({ registrationId: req.params.id });
    if (!team) {
      return res.status(404).json({ message: 'Registration not found' });
    }
    res.json({
      teamName: team.teamName,
      registrationId: team.registrationId,
      members: team.members
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
