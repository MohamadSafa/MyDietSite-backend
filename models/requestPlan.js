const mongoose = require("mongoose");

const requestPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    unique: true,
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "plan",
    required: true,
  }, // on submitting the request value is null
  height: { type: Number, required: true, default: 1 },
  weight: { type: Number, required: true, default: 1 },
  desiredWeight: { type: Number, required: true },
  planStatus: { type: String, required: true },
});

{
  timestamps: true;
}

const requestPlan = mongoose.model("Order", requestPlanSchema);

module.exports = requestPlan;
