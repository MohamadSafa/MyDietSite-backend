const RequestPlan = require('../models/requestPlan');

const getAllRequestPlans = async (req, res) => {
  try {
    const requestPlans = await requestPlan.find({}); // User.find({}) == select * from user
    res.status(200).json({
      success: true,
      message: "order retrieved successfully",
      data: requestPlans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "unable to get requestPlan",
      error: error,
    });
  }
};

const getrequestPlanByID = async (req, res) => {
  try {
    const requestPlan = await RequestPlan.findById(req.params.ID); // .ID should be the same in the route
    res.status(200).json({
      success: true,
      message: "requestPlan retrieved successfully",
      data: requestPlan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "unable to get requestPlan by ID",
      error: error,
    });
  }
};

const addRequestPlan = async (req, res) => {
  const { userId, planId , height, weight, desiredWeight, planStatus } = req.body;

  try {
    if ( !userId || !planId || !height || !weight || !desiredWeight || !planStatus ) {
      throw error("All field must be filled");
    }
    const requestPlan = await RequestPlan.create({
      userId,
      planId,
        height,
        weight,
        desiredWeight,
        planStatus,
    });

    res.status(200).json({
      success: true,
      message: "RequestPlan added successfully",
      data: requestPlan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "unable to add requestPlan",
      error: error,
    });
  }
};

const deleterequestPlanByID = async (req, res) => {
  const { id } = req.params;
  try {
    const requestPlan = await requestPlan.deleteOne({ _id: id }); // _id is auto-generated in mongoose
    res.status(200).json({
      success: true,
      message: "requestPlan deleted successfully",
      data: requestPlan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "unable to delete requestPlan",
      error: error,
    });
  }
};

const updaterequestPlanByID = async (req, res) => {
  const { height, weight, desiredWeight, planStatus } = req.body;
  try {
    const requestPlan = await requestPlan.findByIdAndUpdate(
      { _id: req.params.ID },
      { height, weight, desiredWeight, planStatus }
    );
    res.status(200).json({
      success: true,
      message: "requestPlan updated successfully.",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update requestPlan",
      error: error,
    });
  }
};

module.exports = {
  getAllRequestPlans,
  getrequestPlanByID,
  addRequestPlan,
  deleterequestPlanByID,
  updaterequestPlanByID,
};