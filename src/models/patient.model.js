import { model, Schema } from 'mongoose';
const PatientSchema = new Schema(
  {
    name: { type: String, required: [true, 'Enter name'] },
    age: { type: Number, required: [true, 'Enter age'] },
    weight: { type: Number, required: [true, 'Enter age'] },
    bloodGas: {
      pH: {
        type: String,
        default: null,
        min: [0, 'pH cannot be lower than 0'],
        max: [14, 'pH cannot be higher than 14'],
      },
      pC02: { type: String, default: null },
      PO2: { type: String, default: null },
      HCO3: { type: String, default: null },
      BE: { type: String, default: null },
      Hct: { type: String, default: null },
      Glu: { type: String, default: null },
      iCa: { type: String, default: null },
      Na: { type: String, default: null },
      K: { type: String, default: null },
      HR: { type: String, default: null },
      PRE: { type: String, default: null },
      POST: { type: String, default: null },
      BP: { type: String, default: null },
    },
    xRayImages: [{ type: String, default: null }],
    vitals: {
      HR: { type: String, default: null },
      RR: { type: String, default: null },
      Sats: { type: String, default: null },
      Pre: { type: String, default: null },
      Post: { type: String, default: null },
      BP: { type: String, default: null },
      Mean: { type: String, default: null },
    },
    vitalsImages: [{ type: String, default: null }],
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default model('Patient', PatientSchema);
