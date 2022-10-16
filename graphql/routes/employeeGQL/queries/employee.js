const { GraphQLInt, GraphQLNonNull } = require("graphql");
const dbConnection = require("../../../../db/connect");

const { EmployeeType, EMPLOYEE_MODEL_NAME } = require("../types");

//  query field for fetching an Employee by id.
const specificEmployeeQuery = {
  type: EmployeeType, //  output return type
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args) => {
    //  get repo of table Employees
    const employeeRepo = dbConnection.getRepository(EMPLOYEE_MODEL_NAME);
    try {
      //  try to find Employee using parameter(s) in 'args' field,
      //  Employee with id === args.id will be returned if found
      const employee = await employeeRepo.findOneBy({ id: args.id });
      return employee;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

module.exports = specificEmployeeQuery;
