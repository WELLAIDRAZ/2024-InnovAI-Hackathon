import mongoose, { Schema } from "mongoose";
import crypto from "crypto";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure Email is unique if needed
    lowercase: true, // Store email in lowercase for consistency
  },
  signedUpVia: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: function () {
      return this.type === "form";
    },
  },
  birthDate: {
    type: String,
    required: function () {
      return this.type === "form";
    },
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  operators: {
    type: [String],
    default: [], // Initialize as an empty array if no operators are added yet
    required: false
  },
  verifyToken: {
    type: String,
  },
  verifyCode: {
    type: String,
  },
  verifyCodeExpire: {
    type: Date,
  },
  verifyTokenExpire: {
    type: Date,
  },

//   pharmacy_name: {
//     type: String,
//     required: false
//   },

//   pharmacy_phone: {
//     type: String,
//     required: false
//   },

//   pharmacy_address: {
//     type: String,
//     required: false
//   },

//   pharmacy_logo: {
//     type: String,
//     required: false,
//   },

  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',  // Reference to the Order model
  }],
  patients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',  // Reference to the Patient model
  }],
  doctors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',  // Reference to the Doctor model
  }],
  drugs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Drug',  // Reference to the Drug model
  }],
  notifications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notification',  // Reference to the Notification model
  }],
});

userSchema.methods.getVerificationToken = function () {
  //Generate Verification Token
  const verificationToken = crypto.randomBytes(20).toString("hex");

  //Hash the Token
  this.verifyToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  //Set the Token expiring date
  this.verifyTokenExpire  = new Date(Date.now() + 30 * 60 * 1000);
  return verificationToken;
};
userSchema.methods.getVerificationCode = function () {
  //Generate Verification Token
  const verificationCode = crypto.randomBytes(20).toString("hex");

  //Hash the Token
  this.verifyCode = verificationCode

  //Set the Token expiring date
  this.verifyCodeExpire  = new Date(Date.now() + 30 * 60 * 1000);
  return verificationCode;
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
