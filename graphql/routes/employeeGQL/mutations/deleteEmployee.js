const { GraphQLInt, GraphQLNonNull } = require("graphql");
const dbConnection = require("../../../../db/connect");

const { EmployeeType, EMPLOYEE_MODEL_NAME } = require("../types");

const deleteEmployeeMutation = {
  type: EmployeeType,
  description: "Delete an employee by id.",
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args) => {
    const employeeRepo = dbConnection.getRepository(EMPLOYEE_MODEL_NAME);
    try {
      const employeeToDelete = await employeeRepo.findOneBy({ id: args.id });
      if (employeeToDelete) await employeeRepo.remove(args);
      else
        throw new Error(
          JSON.stringify({
            message: `Employee with ID: ${args.id} not found!`,
            statusCode: 404,
          })
        );
      return null;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
};

module.exports = deleteEmployeeMutation;
