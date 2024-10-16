import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'manager'], default: 'customer' }
});

// Method to compare entered password with stored hashed password
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
