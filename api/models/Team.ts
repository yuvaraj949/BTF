import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ITeamMember {
  name: string;
  email: string;
  phone: string;
  degree: string;
}

export interface ITeam extends Document {
  teamId: string;
  teamName: string;
  university: string;
  leader: ITeamMember;
  teammates: ITeamMember[];
  registrationDate: Date;
}

interface TeamModel extends Model<ITeam> {
  generateTeamId: () => Promise<string>;
}

const teamMemberSchema = new Schema<ITeamMember>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  degree: { type: String, required: true },
});

const teamSchema = new Schema<ITeam>({
  teamId: { type: String, unique: true },
  teamName: { type: String, required: true },
  university: { type: String, required: true },
  leader: { type: teamMemberSchema, required: true },
  teammates: { type: [teamMemberSchema], required: true },
  registrationDate: { type: Date, default: Date.now },
});

teamSchema.statics.generateTeamId = async function() {
  const latest = await this.findOne({})
    .sort({ registrationDate: -1 })
    .select('teamId')
    .lean();
  let nextNumber = 1;
  if (latest && latest.teamId) {
    const match = latest.teamId.match(/ENG25-(\d{6})/);
    if (match) {
      nextNumber = parseInt(match[1], 10) + 1;
    }
  }
  return `ENG25-${String(nextNumber).padStart(6, '0')}`;
};

export default mongoose.model<ITeam, TeamModel>('Team', teamSchema); 