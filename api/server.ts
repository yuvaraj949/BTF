/**
 * server.ts
 * Main Express server for BITS Tech Fest 2025 API.
 * Handles API endpoints, MongoDB connection, CORS, and email sending.
 * Entry point for backend services.
 */
/**
 * Main Express server for BITS Tech Fest 2025 API.
 * Handles API endpoints, MongoDB connection, CORS, and email sending.
 * Entry point for backend services.
 */
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import Registration from './models/Registration';
import QRCode from 'qrcode';
import Team from './models/Team';
import RegistrationLog from './models/RegistrationLog';
import HackathonTeam from './models/HackathonTeam';
import Counter from './models/Counter';

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


/**
 * Connect to MongoDB using DB name from .env
 */
const dbName = process.env.DB_NAME;
const dbConnString = process.env.DB_CONN_STRING || process.env.MONGODB_URI_UNI || '';

mongoose.connect(dbConnString, {
  dbName: dbName
})
  .then(() => console.log(`MongoDB connected successfully to database: ${dbName}`))
  .catch(err => console.error('MongoDB connection error:', err));


/**
 * Generate registration ID in ascending order (no clashes)
 */
const generateRegistrationId = async (): Promise<string> => {
  // Find the latest registration document
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
  // Pad with leading zeros for consistent formatting
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

/**
 * Send confirmation email for general registration
 */
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
  const { id } = req.params;
  try {
    if (/^BTF25-\d{6}$/.test(id)) {
      // Workshop/regular registration
      const registration = await Registration.findOne({ registrationId: id });
      if (!registration) return res.status(404).json({ message: 'Registration not found' });
      return res.json({
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
    } else if (/^ENG25-\d{6}$/.test(id)) {
      // Team pass
      const team = await Team.findOne({ teamId: id });
      if (!team) return res.status(404).json({ message: 'Team not found' });
      return res.json({
        type: 'team',
        teamId: team.teamId,
        teamName: team.teamName,
        university: team.university,
        leader: team.leader,
        teammates: team.teammates,
        registrationDate: team.registrationDate
      });
    } else if (/^ENGMEM-\d{6}$/.test(id)) {
      // Individual member pass
      // Find in Team (leader or teammates)
      const team = await Team.findOne({ $or: [ { 'leader.memberId': id }, { 'teammates.memberId': id } ] });
      if (!team) return res.status(404).json({ message: 'Member not found' });
      let member = null;
      if (team.leader.memberId === id) member = team.leader;
      else member = team.teammates.find(m => m.memberId === id);
      if (!member) return res.status(404).json({ message: 'Member not found' });
      // Optionally fetch RegistrationLog for more info
      const regLog = await RegistrationLog.findOne({ memberId: id });
      return res.json({
        type: 'member',
        memberId: member.memberId,
        name: member.name,
        email: member.email,
        phone: member.phone,
        degree: member.degree,
        year: member.year || '',
        branch: member.branch || '',
        college: team.university,
        teamId: team.teamId,
        teamName: team.teamName,
        registrationDate: regLog ? regLog.registrationDate : team.registrationDate
      });
    } else {
      return res.status(404).json({ message: 'Invalid registration or member ID' });
    }
  } catch (error) {
    console.error('Error fetching registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper to generate the next N unique memberIds for Engenity using atomic counter
async function generateNextMemberIds(count: number) {
  // Use a counter collection for atomic increments
  const counterId = 'engunity_memberId';
  // Atomically increment the counter by count and get the starting value
  const counter = await Counter.findOneAndUpdate(
    { _id: counterId },
    { $inc: { seq: count } },
    { new: true, upsert: true }
  );
  const start = counter.seq - count + 1;
  return Array.from({ length: count }, (_, i) => `ENGMEM-${String(start + i).padStart(6, '0')}`);
}

// --- HACKATHON (ENGENITY) REGISTRATION ROUTE ---
app.post('/api/hackathon-register', async (req, res) => {
  const {
    teamName,
    university,
    leaderName,
    leaderEmail,
    leaderPhone,
    leaderDegree,
    leaderYear,
    leaderBranch,
    teammates,
    agreeTerms
  } = req.body;

  if (!teamName || !university || !leaderName || !leaderEmail || !leaderPhone || !leaderDegree || !Array.isArray(teammates) || typeof agreeTerms !== 'boolean') {
    return res.status(400).json({ message: 'Missing required fields.' });
  }
  if (!agreeTerms) {
    return res.status(400).json({ message: 'You must agree to the terms.' });
  }
  if (teammates.length > 4) {
    return res.status(400).json({ message: 'Max 4 teammates allowed (5 including leader).' });
  }
  try {
    // Generate teamId
    const teamId = await Team.generateTeamId();
    // Generate memberIds for all members (atomic)
    const allMembersRaw = [
      { name: leaderName, email: leaderEmail, phone: leaderPhone, degree: leaderDegree, year: leaderYear, branch: leaderBranch },
      ...teammates
    ];
    const memberIds = await generateNextMemberIds(allMembersRaw.length);
    const allMembers = allMembersRaw.map((member, idx) => ({ ...member, memberId: memberIds[idx] }));
    const leader = allMembers[0];
    const teammatesWithIds = allMembers.slice(1);
    // Save team in Team model
    const teamDoc = new Team({
      teamId,
      teamName,
      university,
      leader,
      teammates: teammatesWithIds,
    });
    await teamDoc.save();
    // Save in HackathonTeam model (for legacy/compatibility)
    const hackathonTeamDoc = new HackathonTeam({
      teamName,
      teamId,
      university,
      leader,
      teammates: teammatesWithIds,
    });
    await hackathonTeamDoc.save();
    // Log all members in RegistrationLog with memberId
    for (const member of allMembers) {
      const registrationId = await RegistrationLog.generateRegistrationId();
      await RegistrationLog.create({
        registrationId,
        memberId: member.memberId,
        type: 'engunity',
        name: member.name,
        email: member.email,
        teamName,
        teamId,
      });
    }
    // --- EMAIL LOGIC ---
    // Prepare team details HTML
    const teamDetailsHtml = `
      <div style="font-family: Arial, sans-serif;">
        <h2 style="color: #F66200;">Engenity Hackathon Team Registration</h2>
        <p><b>Team Name:</b> <span style='color:#F66200;'>${teamName}</span></p>
        <p><b>Team ID:</b> <span style='color:#F66200;'>${teamId}</span></p>
        <p><b>University:</b> <span style='color:#F66200;'>${university}</span></p>
        <p><b>Leader:</b> ${leader.name} (${leader.email}, ${leader.phone}, ${leader.degree}, <b>ID:</b> ${leader.memberId})</p>
        <p><b>Teammates:</b></p>
        <ul>
          ${teammatesWithIds.map((m, i) => `<li>${i+1}. ${m.name} (${m.email}, ${m.phone}, ${m.degree}, <b>ID:</b> ${m.memberId})</li>`).join('')}
        </ul>
        <p style="color:#F66200; font-size:13px;">Please carry your pass while attending the event.</p>
        <p style="color:#F66200; font-size:13px;">Note: Each team member will receive their individual Engenity pass by email. This pass is valid for both days of the event (12th and 15th November 2025).</p>
      </div>
    `;
    // Send one email to all team members with team details
    const allEmails = allMembers.map(m => m.email).join(',');
    await transporter.sendMail({
      from: `"BITS Event 2025" <${process.env.EMAIL_USER}>`,
      to: allEmails,
      subject: `Engenity Hackathon Registration Confirmation - Team ${teamName}`,
      html: teamDetailsHtml
    });
    // Send individual pass emails (with memberId)
    for (const member of allMembers) {
      // Generate QR code for their memberId
      const qrBuffer = await QRCode.toBuffer(member.memberId, {
        color: { dark: '#F66200', light: '#000000' },
        margin: 2,
        width: 200
      });
      const mailOptions = {
        from: `"BITS Event 2025" <${process.env.EMAIL_USER}>`,
        to: member.email,
        subject: 'Your Engenity Hackathon Pass',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background: #181818; color: #F66200;">
            <h2 style="color: #F66200; text-align: center;">Engenity Hackathon Pass</h2>
            <p>Dear ${member.name},</p>
            <p>You are registered for Engenity Hackathon as part of <b>Team ${teamName}</b> (ID: <span style='color:#F66200;'>${teamId}</span>).</p>
            <div style="background-color: #111; padding: 15px; margin: 15px 0; border-radius: 5px;">
              <p style='color:#fff;'><strong>Event Date:</strong> Nov 15, 2025</p>
              <p style='color:#fff;'><strong>Venue:</strong> BITS Pilani Dubai Campus, Dubai, UAE</p>
              <p><strong>Your Team ID:</strong> <span style="color:#F66200">${teamId}</span></p>
              <p><strong>Your Member ID:</strong> <span style="color:#F66200">${member.memberId}</span></p>
              <div style="text-align:center; margin: 10px 0;">
                <img src="cid:qrimage" alt="QR Code" style="width:120px; height:120px; background:#000; padding:8px; border-radius:32px; box-shadow:0 0 0 6px #F66200, 0 0 0 14px #181818;" />
              </div>
            </div>
            <p><b>Your Details:</b></p>
            <ul>
              <li><b>Name:</b> <span style='color:#F66200;'>${member.name}</span></li>
              <li><b>Email:</b> <a href='mailto:${member.email}' style='color:#F66200;'>${member.email}</a></li>
              <li><b>Phone:</b> <span style='color:#F66200;'>${member.phone}</span></li>
              <li><b>Degree:</b> <span style='color:#F66200;'>${member.degree}</span></li>
              <li><b>Team:</b> <span style='color:#F66200;'>${teamName}</span></li>
              <li><b>Team ID:</b> <span style='color:#F66200;'>${teamId}</span></li>
              <li><b>Member ID:</b> <span style='color:#F66200;'>${member.memberId}</span></li>
            </ul>
            <p style="color:#F66200; font-size:13px; margin:10px 0 0 0;">This pass is valid for both days of the event (12th and 15th November 2025). Please carry this pass with you while attending the event.</p>
            <div style="margin:18px 0 0 0; text-align:center;">
              <a href="https://btf-2025.vercel.app/pass/${member.memberId}" style="background:#F66200; color:#181818; padding:10px 18px; border-radius:8px; text-decoration:none; font-weight:bold;">View & Download Pass (PDF)</a>
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
    }
    // --- END EMAIL LOGIC ---
    res.status(201).json({
      success: true,
      message: 'Hackathon registration successful',
      teamId,
      members: allMembers.map(m => ({ name: m.name, email: m.email, memberId: m.memberId })),
    });
  } catch (error) {
    console.error('Hackathon registration error:', error);
    res.status(500).json({ message: 'Server error during hackathon registration' });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
