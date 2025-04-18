import mongoose, { Document, Schema } from 'mongoose';

export interface IRegistration extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  affiliationType: 'company' | 'university' | 'school';
  institutionName: string;
  role: string;
  interestedEvents: string[];
  agreeTerms: boolean;
  registrationId: string;
  registrationDate: Date;
}

const registrationSchema = new Schema<IRegistration>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  affiliationType: { 
    type: String, 
    enum: ['company', 'university', 'school'],
    required: true 
  },
  institutionName: { type: String, required: true },
  role: { type: String },
  interestedEvents: [{ type: String }],
  agreeTerms: { type: Boolean, required: true },
  registrationId: { type: String, unique: true },
  registrationDate: { type: Date, default: Date.now }
});

export default mongoose.model<IRegistration>('Registration', registrationSchema);
