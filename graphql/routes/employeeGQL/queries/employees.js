const { GraphQLList } = require("graphql");
const dbConnection = require("../../../../db/connect");
const { EmployeeType, EMPLOYEE_MODEL_NAME } = require("../types");

const allEmployeesQuery = {
  type: new GraphQLList(EmployeeType),
  args: {},
  resolve: async () => {
    const employeeRepo = dbConnection.getRepository(EMPLOYEE_MODEL_NAME);
    try {
      const employees = await employeeRepo.find();
      return employees;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
};

module.exports = allEmployeesQuery;
