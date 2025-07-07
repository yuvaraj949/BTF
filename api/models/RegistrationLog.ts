import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IRegistrationLog extends Document {
  registrationId: string;
  memberId?: string;
  type: 'workshop' | 'engunity';
  name: string;
  email: string;
  teamName?: string;
  teamId?: string;
  registrationDate: Date;
}

const registrationLogSchema = new Schema<IRegistrationLog>({
  registrationId: { type: String, unique: true },
  memberId: { type: String },
  type: { type: String, enum: ['workshop', 'engunity'], required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  teamName: { type: String },
  teamId: { type: String },
  registrationDate: { type: Date, default: Date.now },
});

registrationLogSchema.statics.generateRegistrationId = async function() {
  const latest = await this.findOne({})
    .sort({ registrationDate: -1 })
    .select('registrationId')
    .lean();
  let nextNumber = 1;
  if (latest && latest.registrationId) {
    const match = latest.registrationId.match(/BTF25-(\d{6})/);
    if (match) {
      nextNumber = parseInt(match[1], 10) + 1;
    }
  }
  return `BTF25-${String(nextNumber).padStart(6, '0')}`;
};

interface RegistrationLogModel extends Model<IRegistrationLog> {
  generateRegistrationId: () => Promise<string>;
}

export default mongoose.model<IRegistrationLog, RegistrationLogModel>('RegistrationLog', registrationLogSchema); 