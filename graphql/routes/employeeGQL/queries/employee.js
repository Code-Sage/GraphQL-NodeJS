const { GraphQLInt, GraphQLNonNull } = require("graphql");
const dbConnection = require("../../../../db/connect");

const { EmployeeType, EMPLOYEE_MODEL_NAME } = require("../types");

const specificEmployeeQuery = {
  type: EmployeeType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args) => {
    const employeeRepo = dbConnection.getRepository(EMPLOYEE_MODEL_NAME);
    try {
      const employee = await employeeRepo.findOneBy({ id: args.id });
      console.log(employee);
      return employee;
    } catch (error) {
      console.error(error);
      return {};
    }
  },
};

module.exports = specificEmployeeQuery;
