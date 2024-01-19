const Plan = require("../models/plan");
// const { imageUploader } = require("../extra/imageUploader");

const addPlan = async (req, res) => {
  try {
    const {
      planName,
      planDescription,
      meals
    } = req.body;

    if (
      !planName ||
      !planDescription ||
      !meals
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    

    const newPlan = new Plan({
        planName,
        planDescription,
        meals
    });
    console.log(meals)
    const savedPlan = await Plan.create(newPlan)

    res.status(200).json({
      success: true,
      message: "Plan added successfully",
      data: savedPlan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Unable to add plan",
      error: error,
    });
  }
};

const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find({});
    res.status(200).json({
      success: true,
      message: "Plans retrieved successfully",
      data: plans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to get all plans",
      error: error,
    });
  }
};

const getPlanByID = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.ID);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: `Plan with id ${req.params.ID} not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Plan data retrieved successfully",
      data: plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to get plan data by id",
      error: error,
    });
  }
};

const updatePlanByID = async (req, res) => {
  const {planName, planDescription, meals} = req.body
  try {
    const updatedPlan = await Plan.findByIdAndUpdate(
      {_id: req.params.ID},
      {planName, planDescription, meals}
    );
    if (!updatedPlan) {
      res.status(404).json({
        success: false,
        message: "Plan not found",
      });
      return;
    }
    const newPlan = await getPlanByIdd(req.params.ID)
    res.status(200).json({
      success: true,
      message: "Plan updated successfully",
      data: newPlan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update plan",
      error: error,
    });
  }
};

const deletePlanByID = async (req, res) => {
  try {
    const deletedPlan = await Plan.deleteOne({ _id: req.params.ID });

    if (deletedPlan.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: `No plan found with id ${req.params.ID}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `plan with id ${req.params.ID} deleted successfully`,
      data: deletedPlan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete plan",
      error: error,
    });
  }
};

// const getPlansByBrand = async (req, res) => {
//   try {
//     const products = await Product.find({ productBrand: req.params.brand });
//     res.status(200).json({
//       success: true,
//       message: "Products retrieved by brand successfully",
//       data: products,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Unable to get products by brand",
//       error: error,
//     });
//   }
// };

const getPlansByName = async (req, res) => {
  try {
    const plans = await Plan.find({
        planName: req.body.name 
    });
    res.status(200).json({
      success: true,
      message: "Plans retrieved by name successfully",
      data: plans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to get plans by name",
      error: error,
    });
  }
};

const getPlanByIdd = async(id) =>{
  const plan = await Plan.findById({_id : id})
  return plan;
}

module.exports = {
  addPlan,
  getAllPlans,
  getPlanByID,
  updatePlanByID,
  deletePlanByID,
  getPlansByName,
};