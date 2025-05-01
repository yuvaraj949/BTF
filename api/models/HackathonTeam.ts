import mongoose, { Document, Schema } from 'mongoose';

export interface ITeamMember {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  college: string;
  educationLevel: 'UG' | 'PG' | 'PhD';
}

export interface IHackathonTeam extends Document {
  teamName: string;
  members: ITeamMember[];
  registrationId: string;
  registrationDate: Date;
}

const teamMemberSchema = new Schema<ITeamMember>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  countryCode: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  college: { type: String, required: true },
  educationLevel: { type: String, enum: ['UG', 'PG', 'PhD'], required: true }
});

const hackathonTeamSchema = new Schema<IHackathonTeam>({
  teamName: { type: String, required: true },
  members: { 
    type: [teamMemberSchema], 
    required: true, 
    validate: {
      validator: function(arr: ITeamMember[]) {
        return Array.isArray(arr) && arr.length >= 1 && arr.length <= 5;
      },
      message: 'Team must have 1-5 members'
    }
  },
  registrationId: { type: String, unique: true },
  registrationDate: { type: Date, default: Date.now }
});

export default mongoose.model<IHackathonTeam>('HackathonTeam', hackathonTeamSchema);
