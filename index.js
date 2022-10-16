const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const employeeGQL = require("./graphql/routes/employeeGQL");

const app = express();

//  middleware for parsing request's JSON body
app.use(express.json());
//  middleware for loggin summary of every request to server
app.use(morgan("common"));

//  attaching GraphQL schema to Express endpoint
app.use("/employee", employeeGQL);

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
