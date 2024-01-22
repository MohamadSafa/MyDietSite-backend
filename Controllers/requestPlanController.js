const RequestPlan = require('../models/requestPlan');

const getAllRequestPlans = async (req, res) => {
  try {
    const requestPlans = await RequestPlan.find({}); // User.find({}) == select * from user
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

const getrequestPlanByUserID = async (req, res) => {
  try {
    const requestPlan = await RequestPlan.findOne({userId : req.params.Id} )
    .populate({
      path : "userId",
      model : "users",
      select : "fullName email"
    })
    .populate({
      path : "planId",
      model : "plans",
      select : "planName planDescription meals"
    })
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
    if ( !userId  || !height || !weight || !desiredWeight  ) {
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
    const requestPlan = await RequestPlan.deleteOne({ _id: id }); // _id is auto-generated in mongoose
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
  const { planId, height, weight, desiredWeight, planStatus } = req.body;
  try {
    const requestPlan = await RequestPlan.findByIdAndUpdate(
      { _id: req.params.ID },
      {planId, height, weight, desiredWeight, planStatus }
    );
    
    const plan = await getPlanByIdd(req.params.ID);
    res.status(200).json({
      success: true,
      message: "requestPlan updated successfully.",
      data: plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update requestPlan",
      error: error,
    });
  }
};

const updaterequestPlanByUserID = async (req, res) => {
  const { planId, height, weight, desiredWeight, planStatus } = req.body;
  try {
    const request = await RequestPlan.findOne({userId : req.params.ID});
    const requestPlan = await RequestPlan.findByIdAndUpdate(
      {_id: request._id.toString() },
      {planId, height, weight, desiredWeight, planStatus }
    );
    const updated = await RequestPlan.findOne({userId : req.params.ID});
    
    res.status(200).json({
      success: true,
      message: "requestPlan updated successfully.",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update requestPlan",
      error: error,
    });
  }
};

const getPlanByIdd = async(id) =>{
  const plan = await RequestPlan.findById({_id : id})
  return plan;
}



module.exports = {
  getAllRequestPlans,
  getrequestPlanByID,
  addRequestPlan,
  deleterequestPlanByID,
  updaterequestPlanByID,
  updaterequestPlanByUserID,
  getrequestPlanByUserID
};