import mongoose, { Schema } from "mongoose";

const pharmacySchema = new Schema(
  {
    pharmacy_name: {
      type: String,
      required: false
    },

    phone: {
      type: String,
      required: false
    },

    address: {
      type: String,
      required: false
    },

    logo: {
      type: Number,
      required: true,
      default: 0.0
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true
    },

    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order", // Reference to the Order model
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
    ]
  },
  {
    timestamps: true
  }
);

const Pharmacy =
  mongoose.models.Pharmacy || mongoose.model("Pharmacy", pharmacySchema);

export default Pharmacy;
