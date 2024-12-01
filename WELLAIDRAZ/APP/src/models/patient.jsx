import mongoose, { Schema } from "mongoose";

const patientSchema = new Schema(
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

    mean_distance: {
      type: String,
      required: false
    },

    number_of_sells: {
      type: Number,
      required: true,
      default: 0
    },

    first_cnx_date: {
      type: Date,
      required: false
    },

    total_amount: {
      type: Number,
      required: true,
      default: 0.0
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
    doctors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor", // Reference to the Doctor model
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

const Patient =
  mongoose.models.Patient || mongoose.model("Patient", patientSchema);

export default Patient;
