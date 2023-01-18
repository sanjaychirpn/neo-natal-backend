import { model, Schema } from 'mongoose';

const UserRoleSchema = new Schema(
  {
    name: { type: String, unique: true, required: [true, 'Enter name'] },
    description: { type: String, required: [true, 'Enter description'] },
    videoUrl: { type: String, required: [true, 'Enter videoUrl'] },
  },
  {
    timestamps: true,
  }
);

export default model('UserRole', UserRoleSchema);
