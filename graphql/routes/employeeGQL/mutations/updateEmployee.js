const { GraphQLString, GraphQLInt, GraphQLNonNull } = require("graphql");
const dbConnection = require("../../../../db/connect");

const { EmployeeType, EMPLOYEE_MODEL_NAME } = require("../types");

const updateEmployeeMutation = {
  type: EmployeeType,
  description: "Update info of an employee by id.",
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLString },
    job: { type: GraphQLString },
    department: { type: GraphQLString },
    salary: { type: GraphQLInt },
  },
  resolve: async (parent, args) => {
    const employeeRepo = dbConnection.getRepository(EMPLOYEE_MODEL_NAME);
    try {
      const updatedEmployeeInfo = await employeeRepo.save(args);
      const updatedEmployee = await employeeRepo.findOneBy({ id: updatedEmployeeInfo.id });
      return updatedEmployee;
    } catch (error) {
      console.error(error);
      throw new Error(
        JSON.stringify({
          message: `Employee with ID: ${args.id} not found!`,
          statusCode: 404,
        })
      );
    }
  },
};

module.exports = updateEmployeeMutation;
