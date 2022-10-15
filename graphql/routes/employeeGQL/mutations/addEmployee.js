const { GraphQLString, GraphQLInt, GraphQLNonNull } = require("graphql");
const { DateTimeScalarType } = require("../../../scalars/dateTimeScalar");
const dbConnection = require("../../../../db/connect");

const { EmployeeType, EMPLOYEE_MODEL_NAME } = require("../types");

const addEmployeeMutation = {
  type: EmployeeType,
  description: "Add a new employee.",
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    job: { type: new GraphQLNonNull(GraphQLString) },
    department: { type: new GraphQLNonNull(GraphQLString) },
    salary: { type: new GraphQLNonNull(GraphQLInt) },
    hire_date: { type: new GraphQLNonNull(DateTimeScalarType) },
  },
  resolve: async (parent, args) => {
    const employeeRepo = dbConnection.getRepository(EMPLOYEE_MODEL_NAME);
    try {
      const addedEmployee = await employeeRepo.save(args);
      return addedEmployee;
    } catch (error) {
      console.error(error);
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
