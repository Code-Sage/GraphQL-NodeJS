const { GraphQLString, GraphQLInt, GraphQLNonNull } = require("graphql");
const { DateTimeScalarType } = require("../../../scalars/dateTimeScalar");
const dbConnection = require("../../../../db/connect");

const { EmployeeType, EMPLOYEE_MODEL_NAME } = require("../types");

//  mutation field for use case 'addEmployee'
//  specifying input structure in 'args' field and 'resolver' function for returning output
const addEmployeeMutation = {
  type: EmployeeType, //  output return type
  description: "Add a new employee.",
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    job: { type: new GraphQLNonNull(GraphQLString) },
    department: { type: new GraphQLNonNull(GraphQLString) },
    salary: { type: new GraphQLNonNull(GraphQLInt) },
    hire_date: { type: new GraphQLNonNull(DateTimeScalarType) },
  },
  resolve: async (parent, args) => {
    //  get repo of table Employees
    const employeeRepo = dbConnection.getRepository(EMPLOYEE_MODEL_NAME);
    try {
      //  try to insert new Employee using parameters in 'args' field
      const addedEmployee = await employeeRepo.save(args);
      return addedEmployee;
    } catch (error) {
      console.error(error);
      //  if insertion failed, then add error message and status code to GraphQL error list in response.
      throw new Error(
        JSON.stringify({
          message: `Could not add new employee.`,
          statusCode: 500,
        })
      );
    }
  },
};

module.exports = addEmployeeMutation;
