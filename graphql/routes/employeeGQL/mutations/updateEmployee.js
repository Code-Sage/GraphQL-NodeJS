const { GraphQLString, GraphQLInt, GraphQLNonNull } = require("graphql");
const dbConnection = require("../../../../db/connect");

const { EmployeeType, EMPLOYEE_MODEL_NAME } = require("../types");

//  mutation field for use case 'updateEmployee'
//  specifying input structure in 'args' field and 'resolver' function for returning output
const updateEmployeeMutation = {
  type: EmployeeType, //  output return type
  description: "Update info of an employee by id.",
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLString },
    job: { type: GraphQLString },
    department: { type: GraphQLString },
    salary: { type: GraphQLInt },
  },
  resolve: async (parent, args) => {
    //  get repo of table Employees
    const employeeRepo = dbConnection.getRepository(EMPLOYEE_MODEL_NAME);
    try {
      //  try to update Employee using parameter(s) in 'args' field,
      //  Employee with id === args.id will be updated
      const updatedEmployeeInfo = await employeeRepo.save(args);
      const updatedEmployee = await employeeRepo.findOneBy({ id: updatedEmployeeInfo.id });
      return updatedEmployee;
    } catch (error) {
      console.error(error);
      //  if update fails, then add error message and status code to GraphQL error list in response.
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
