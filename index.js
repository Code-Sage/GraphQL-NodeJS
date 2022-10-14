const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const { employeeGQL } = require("./graphql/routes/employeeGQL");
const app = express();

app.use(express.json());
app.use(morgan("common"));

app.use("/employee", employeeGQL);

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
