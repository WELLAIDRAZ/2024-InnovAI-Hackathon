import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    // client_id: {
    //   type: String,
    //   required: false
    // },

    // operator_id: {
    //   type: String,
    //   required: false
    // },

    total_amount: {
      type: Number,
      required: true,
      default: 0.0
    },

    status: {
      type: String,
      required: true,
      default: "received"
    },

    note: {
      type: String,
      required: false
    },

    replyAt: {
      type: Date,
      required: false
    },

    image_url: {
      type: String,
      required: false
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true
    },

    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient", // Reference to the Patient model
      required: false
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor", // Reference to the Doctor model
      required: false
    },

    drugs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drug", // Reference to the Drug model
      required: false
    }]
  },
  {
    timestamps: false
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
