const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    planName: { type: String, required: true },
    planDescription: { type: String, required: true },
    meals: [
      {
        mealName: {
          type: String,
          required: true,
        }, // breakfast, lunch, snack1, snack2, dinner
        mealDescription: {
          type: String,
          required: true,
        }, // eggs, taouk, apple, almonds, turkey
      },
    ],
  },
  { timestamps: true } // Automatically add createdAt and updatedAt to the schema
);

const Plan = mongoose.model("Product", planSchema);

module.exports = Plan;
