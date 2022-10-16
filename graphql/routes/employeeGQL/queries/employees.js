const { GraphQLList } = require("graphql");
const dbConnection = require("../../../../db/connect");
const { EmployeeType, EMPLOYEE_MODEL_NAME } = require("../types");

//  query field for fetching all Employees in DB.
const allEmployeesQuery = {
  type: new GraphQLList(EmployeeType), //  output return type
  args: {},
  resolve: async () => {
    //  get repo of table Employees
    const employeeRepo = dbConnection.getRepository(EMPLOYEE_MODEL_NAME);
    try {
      //  fetch all Employees in table 'Employees'
      const employees = await employeeRepo.find();
      return employees;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
};

module.exports = allEmployeesQuery;
