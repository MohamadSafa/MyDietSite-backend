require("dotenv").config();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { error } = require("console");

const generateToken = (id, role) => {
  console.log(process.env.SECRET_KEY)
  const token = jwt.sign({ id, role }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
};

const addUser = async (req, res) => {
  const { fullName, email, password, role, phoneNumber} = req.body;
  try {
    if (!fullName || !email || !password || !role || !phoneNumber)
      throw Error("All fields must be filled !");
    const exist = await User.findOne({ email });
    if (exist) throw Error("Email already in use");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      fullName,
      email,
      password : hashedPassword,
      role,
      phoneNumber,
    });
    if (!user) throw Error("An error occured during adding a user ");
    const token = generateToken(user._id, role);
    res.status(200).json({ message: "Adding a user successfully", user, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add a user", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) throw Error("All fields must be filled");
    const exist = await User.findOne({ email });
    if (!exist) throw Error("Not registered yet");
    const comparing = await bcrypt.compare(password, exist.password);
    if (!comparing) throw Error("Passwords do not match");
    const token = generateToken(exist._id, exist.role);
    res.status(200).json({ message: "login successfully", token });
  } catch (error) {
    res
      .status(403)
      .json({ message: `Failed to login by ${email}`, error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}); // User.find({}) == select * from user
    res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "unable to get data",
      error: error,
    });
  }
};

const getUserByID = async (req, res) => {
  try {
    const user = await User.findById(req.params.ID); // .ID should be the same in the route
    res.status(200).json({
      success: true,
      message: "data retrieved successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "unable to get data by ID",
      error: error,
    });
  }
};

// const addUser = async (req, res) => {
//   const { fullName, email, password, role, phoneNumber, address } = req.body;

//   try {
//     if (!fullName || !email || !password || !role || !phoneNumber || !address) {
//       throw error("All field must be filled");
//     }
//     const user = await User.create({
//       fullName,
//       email,
//       password,
//       role,
//       phoneNumber,
//       address,
//     });
//     res.status(200).json({
//       success: true,
//       message: "Data added successfully",
//       data: user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "unable to add data",
//       error: error,
//     });
//   }
// };

const deleteUserByID = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.deleteOne({ _id: id }); // _id is auto-generated in mongoose
    res.status(200).json({
      success: true,
      message: "Data deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "unable to delete data",
      error: error,
    });
  }
};

const updateUserByID = async (req, res) => {
  const { fullName, email, password, role, phoneNumber} = req.body;
  try {
    const exist = await getUserByIddd(req.params.ID);
    if(exist === null)throw error("no user with this id")
    const user = await User.findByIdAndUpdate(
      { _id: req.params.ID },
      { fullName, email, password, role, phoneNumber}
    );
    const newOne = await getUserByIddd(req.params.ID)
    res.status(200).json({
      success: true,
      message: "data updated successfully.",
      data: newOne,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update data",
      error: error,
    });
  }
};

const switchToAdmin = async (req, res) => {
  const userId = req.params.ID;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: `User with id = ${userId} not found.`,
      });
    }

    if (user.role === "admin") {
      return res.status(400).json({
        success: false,
        message: `User with id = ${userId} is already an admin.`,
      });
    }

    const updatedUser = await User.findByIdAndUpdate({_id:userId},{role : "admin"});
    return res.status(200).json({
      success: true,
      message: `User with id ${userId} switched to admin successfully.`,
      data: updatedUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Error while trying to update user with id ${userId}.`,
      error: error.message,
    });
  }
};

// const switchToSeller = async (req, res) => {
//   const userId = req.params.ID;

//   try {
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: `User with id = ${userId} not found.`,
//       });
//     }

//     if (user.role === "seller") {
//       return res.status(400).json({
//         success: false,
//         message: `User with id = ${userId} is already a seller.`,
//       });
//     }

//     user.role = "seller";
//     await user.save();

//     return res.status(200).json({
//       success: true,
//       message: `User with id ${userId} switched to seller successfully.`,
//       data: user,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       message: `Error while trying to update user with id ${userId}.`,
//       error: error.message,
//     });
//   }
// };
const getUserByIddd = async(id) =>{
  const user = await User.findById({_id : id})
  return user;
}
module.exports = {
  addUser,
  login,
  getAllUsers,
  getUserByID,
  updateUserByID,
  deleteUserByID,
  switchToAdmin,
};