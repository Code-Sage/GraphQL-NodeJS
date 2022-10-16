const { GraphQLInt, GraphQLNonNull } = require("graphql");
const dbConnection = require("../../../../db/connect");

const { EmployeeType, EMPLOYEE_MODEL_NAME } = require("../types");

//  mutation field for use case 'deleteEmployee'
//  specifying input structure in 'args' field and 'resolver' function for returning output
const deleteEmployeeMutation = {
  type: EmployeeType, //  output return type
  description: "Delete an employee by id.",
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args) => {
    //  get repo of table Employees
    const employeeRepo = dbConnection.getRepository(EMPLOYEE_MODEL_NAME);
    try {
      //  try to delete Employee using parameter(s) in 'args' field
      const employeeToDelete = await employeeRepo.findOneBy({ id: args.id });
      if (employeeToDelete) await employeeRepo.remove(args);
      else {
        //  if specified Employee does not exist, then add error message and status code to GraphQL error list in response.
        throw new Error(
          JSON.stringify({
            message: `Employee with ID: ${args.id} not found!`,
            statusCode: 404,
          })
        );
      }
      return null;
    } catch (error) {
      console.error(error);
      //  pass on error to GraphQL list of errors in response.
      throw new Error(error.message);
    }
  },
};

module.exports = deleteEmployeeMutation;
