const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull } = require("graphql");
const { DateTimeScalarType } = require("../../scalars/dateTimeScalar");

const EMPLOYEE_MODEL_NAME = "Employee";
//  Employee entity representation in GraphQL
const EmployeeType = new GraphQLObjectType({
  name: EMPLOYEE_MODEL_NAME,
  description: `${EMPLOYEE_MODEL_NAME} type.`,
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    job: { type: new GraphQLNonNull(GraphQLString) },
    department: { type: new GraphQLNonNull(GraphQLString) },
    salary: { type: new GraphQLNonNull(GraphQLInt) },
    hire_date: { type: new GraphQLNonNull(DateTimeScalarType) },
  }),
});

module.exports = { EmployeeType, EMPLOYEE_MODEL_NAME };
