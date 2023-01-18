import { model, Schema, Types } from 'mongoose';

const PatientCaseSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Enter name'],
    },
    patientId: {
      type: Types.ObjectId,
      required: [true, 'Enter patientId'],
      ref: 'Patient',
    },
    description: {
      type: String,
      default: null,
    },
    audioFileUrl: {
      type: String,
      default: null,
    },
    location: {
      latitude: {
        type: String,
        default: null,
      },
      longitude: {
        type: String,
        default: null,
      },
    },
    correctTransport: {
      type: { id: { type: Number }, title: { type: String } },
      default: null,
    },
    correctResponseTime: {
      type: { id: { type: Number }, title: { type: String } },
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default model('PatientCase', PatientCaseSchema);
