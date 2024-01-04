const express = require("express");
const app = express();
const connection = require("./config/database");
const userRouter = require("./Routes/userRoute");
const orderRouter = require("./Routes/orderRoute");
const productRoutes = require('./Routes/productRoute');
const cartRoutes = require('./Routes/cartRoute');
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/orders", orderRouter);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

// Allow all origins for development; adjust for production

app.listen(PORT, () => {
  connection.checkConnection();
  console.log(`Server is running on http://localhost:${PORT}`);
});
