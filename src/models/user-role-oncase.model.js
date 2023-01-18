import { Types, model, Schema } from 'mongoose';
const UserRoleOnCaseSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: [true, 'Enter userId'],
      ref: 'User',
    },
    patientCaseId: {
      type: Types.ObjectId,
      required: [true, 'Enter patientCaseId'],
      ref: 'PatientCase',
    },
    userRoleId: {
      type: Types.ObjectId,
      required: [true, 'Enter userRoleId'],
      ref: 'UserRole',
    },
  },
  {
    timestamps: true,
  }
);

export default model('UserRoleOnCase', UserRoleOnCaseSchema);
