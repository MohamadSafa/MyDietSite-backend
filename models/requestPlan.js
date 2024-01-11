const mongoose = require("mongoose");

const requestPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
    unique: true,
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "plans",
    required: false,
  }, // on submitting the request value is null
  height: { type: Number, required: true},
  weight: { type: Number, required: true},
  desiredWeight: { type: Number, required: true },
  planStatus: { type: String, required: false , default : "Pending" , enum : ["Pending","done"]},
});

{
  timestamps: true;
}

const requestPlan = mongoose.model("requests", requestPlanSchema);

module.exports = requestPlan;
