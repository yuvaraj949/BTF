/**
 * HackathonTeam model
 * Mongoose schema for hackathon team registrations.
 * Includes validation for team size and member details.
 */
/**
 * Mongoose schema for hackathon team registrations.
 * Fields: team name, members, registrationId, etc.
 */
import mongoose, { Document, Schema } from 'mongoose';

export interface IHackathonTeammate {
  memberId: string;
  name: string;
  email: string;
  phone: string;
  degree: string;
}

export interface IHackathonTeam extends Document {
  teamName: string;
  teamId: string;
  university: string;
  leader: IHackathonTeammate;
  teammates: IHackathonTeammate[];
  registrationDate: Date;
}

const hackathonTeammateSchema = new Schema<IHackathonTeammate>({
  memberId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  degree: { type: String, required: true },
});

const hackathonTeamSchema = new Schema<IHackathonTeam>({
  teamName: { type: String, required: true },
  teamId: { type: String, unique: true },
  university: { type: String, required: true },
  leader: { type: hackathonTeammateSchema, required: true },
  teammates: {
    type: [hackathonTeammateSchema],
    required: true,
    validate: {
      validator: function(arr: IHackathonTeammate[]) {
        return Array.isArray(arr) && arr.length >= 0 && arr.length <= 4;
      },
      message: 'Team can have 0-4 teammates (max 5 including leader)'
    }
  },
  registrationDate: { type: Date, default: Date.now }
});

export default mongoose.model<IHackathonTeam>('HackathonTeam', hackathonTeamSchema);
