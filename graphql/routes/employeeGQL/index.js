const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema, GraphQLObjectType } = require("graphql");

const EmployeeRootQueryType = new GraphQLObjectType({
  name: "EmployeeRootQuery",
  description: "Queries for Employees",
  fields: () => ({
    employees: require("./queries/employees"),
    employee: require("./queries/employee"),
  }),
});

const EmmployeeRootMutationType = new GraphQLObjectType({
  name: "EmployeeRootMutations",
  description: "Mutations for Employees",
  fields: {
    addEmployee: require("./mutations/addEmployee"),
    deleteEmployee: require("./mutations/deleteEmployee"),
    updateEmployee: require("./mutations/updateEmployee"),
  },
});

const employeeSchema = new GraphQLSchema({
  query: EmployeeRootQueryType,
  mutation: EmmployeeRootMutationType,
});

const employeeGQL = graphqlHTTP({
  schema: employeeSchema,
  customFormatErrorFn: err => {
    try {
      return JSON.parse(err.message);
    } catch (error) {
      return err.message;
    }
  },
});

module.exports = employeeGQL;

//  REFERENCES:
//  [1]   https://github.com/WebDevSimplified/Learn-GraphQL/blob/master/server.js
//  [2]   https://github.com/bradtraversy/project-mgmt-graphql/blob/main/server/schema/schema.js
