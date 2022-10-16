const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema, GraphQLObjectType } = require("graphql");

//  GraphQL type specifying 'fields' provided by main entry point for queries on endpoint "/employee"
const EmployeeRootQueryType = new GraphQLObjectType({
  name: "EmployeeRootQuery",
  description: "Queries for Employees",
  fields: () => ({
    employees: require("./queries/employees"),
    employee: require("./queries/employee"),
  }),
});

//  GraphQL type specifying 'fields'/operations provided by main entry point for mutations on endpoint "/employee"
const EmmployeeRootMutationType = new GraphQLObjectType({
  name: "EmployeeRootMutations",
  description: "Mutations for Employees",
  fields: {
    addEmployee: require("./mutations/addEmployee"),
    deleteEmployee: require("./mutations/deleteEmployee"),
    updateEmployee: require("./mutations/updateEmployee"),
  },
});

//  GraphQL schema for endpoint "/employee"
const employeeSchema = new GraphQLSchema({
  query: EmployeeRootQueryType,
  mutation: EmmployeeRootMutationType,
});

//  GraphQL middleware made for ExpressJS from GraphQL schema above
const employeeGQL = graphqlHTTP({
  schema: employeeSchema,
  //  handling custom errors that are JSON strings
  customFormatErrorFn: err => {
    try {
      return JSON.parse(err.message);
    } catch (error) {
      return err;
    }
  },
});

module.exports = employeeGQL;

//  REFERENCES:
//  [1]   https://github.com/WebDevSimplified/Learn-GraphQL/blob/master/server.js
//  [2]   https://github.com/bradtraversy/project-mgmt-graphql/blob/main/server/schema/schema.js
