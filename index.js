const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = require("./docs");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
dotenv.config();
mongoose
  .connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("db connected"));
mongoose.connection.on("error", (err) => {
  console.log(`db connection error: ${err.message}`);
});

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const invoiceRoutes = require("./routes/invoice");
const orderDetailRoutes = require("./routes/orderDetail");
const variationRoutes = require("./routes/variation");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
    },
    schemes: ["http", "https"],
    servers: [
      {
        url: "https://partypal-vwog.onrender.com/api"
      },
    ],
  },
  apis: ["./docs/*.js"],
};

const specs = swaggerJsDoc(options);

app.get("/api", (req, res) => {
  fs.readFile("docs/apiDocs.json", (err, data) => {
    if (err) {
      res.status(400).json({
        error: err,
      });
    }
    const docs = JSON.parse(data);
    res.json(docs);
  });
});
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", invoiceRoutes);
app.use("/api", orderDetailRoutes);
app.use("/api", variationRoutes);
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Unauthorized!" });
  }
});
const port = process.env.PORT || 8080;
// app.options("*", cors());
app.listen(port, () => {
  console.log(`a node js api listening on port ${port}//http://localhost:8080/api-docs`);
});