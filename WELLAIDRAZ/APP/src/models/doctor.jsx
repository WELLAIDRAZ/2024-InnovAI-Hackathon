import mongoose, { Schema } from "mongoose";

const doctorSchema = new Schema(
  {
    name: {
      type: String,
      required: false
    },

    email: {
      type: String,
      required: false
    },

    phone: {
      type: String,
      required: false
    },
    speciality: {
      type: String,
      required: false
    },

    number_of_orders: {
      type: Number,
      required: true,
      default: 0
    },

    first_cnx_date: {
      type: Date,
      required: false
    },

    note: {
      type: String,
      required: false
    },

    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true
      }
    ],
    patients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient", // Reference to the Patient model
        required: true
      }
    ],
    drugs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Drug", // Reference to the Drug model
        required: true
      }
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order", // Reference to the Order model
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
);

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;
