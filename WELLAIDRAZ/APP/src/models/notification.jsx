import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true,
  },
}, {
  timestamps: true  // Add timestamps option here
});

const Notification = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);

export default Notification;
