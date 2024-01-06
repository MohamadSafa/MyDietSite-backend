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
        }, // breakfast, snack1, lunch, snack2, dinner
        mealDescription: {
          type: String,
          required: true,
        }, // Labneh ecreme, almonds, taouk, apple, turkey
      },
    ],
  },
  { timestamps: true } // Automatically add createdAt and updatedAt to the schema
);

const Plan = mongoose.model("Product", planSchema);

module.exports = Plan;
