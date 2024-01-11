const express = require("express");
const app = express();
const connection = require("./config/database");
const userRouter = require("./Routes/userRoute");
const requestPlanRouter = require("./Routes/requestPlanRoute");
const planRoutes = require('./Routes/planRoute');
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/requests", requestPlanRouter);
app.use("/plans", planRoutes);

// Allow all origins for development; adjust for production

app.listen(PORT, () => {
  connection.checkConnection();
  console.log(`Server is running on http://localhost:${PORT}`);
});
