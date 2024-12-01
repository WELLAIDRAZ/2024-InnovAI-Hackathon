import mongoose, { Schema } from "mongoose";

const drugSchema = new Schema(
  {
    drug_name: {
      type: String,
      required: false
    },

    drug_form: {
      type: String,
      required: false
    },

    dosage: {
      type: String,
      required: false
    },

    ppv: {
      type: Number,
      required: true,
      default: 0.0
    },

    number_of_sells: {
      type: Number,
      required: true,
      default: 0
    },

    expiry_date: {
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

const Drug = mongoose.models.Drug || mongoose.model("Drug", drugSchema);

export default Drug;
