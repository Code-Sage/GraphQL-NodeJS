const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull } = require("graphql");
const { DateTimeScalarType } = require("../scalars/dateTimeScalar");

let employees = [
  { id: 1, name: "Ahsan", job: "Full Stack Developer", department: "FinTech", salary: 10000, hire_date: new Date() },
  { id: 2, name: "A.Wahab", job: "Senior Software Engineer", department: "E-commerce", salary: 50000, hire_date: new Date() },
  { id: 3, name: "Abdul Sami", job: "Senior Architect", department: "FinTech", salary: 100000, hire_date: new Date() },
  { id: 4, name: "Basharat", job: "Project Manager", department: "E-commerce", salary: 200000, hire_date: new Date() },
  { id: 5, name: "Talism Jaan", job: "Backend Developer", department: "E-commerce", salary: 10000, hire_date: new Date() },
  { id: 6, name: "Sana", job: "Technical Recruiter", department: "HR", salary: 5000, hire_date: new Date() },
];

const EmployeeType = new GraphQLObjectType({
  name: "Employee",
  description: "Employee type.",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    job: { type: new GraphQLNonNull(GraphQLString) },
    department: { type: new GraphQLNonNull(GraphQLString) },
    salary: { type: new GraphQLNonNull(GraphQLInt) },
    hire_date: { type: new GraphQLNonNull(DateTimeScalarType) },
  }),
});

const EmployeeRootQueryType = new GraphQLObjectType({
  name: "EmployeeRootQuery",
  description: "Queries for Employees",
  fields: () => ({
    employees: {
      type: new GraphQLList(EmployeeType),
      args: {},
      resolve: (parent, args) => employees,
    },
    employee: {
      type: EmployeeType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => employees.find(employee => employee.id === args.id),
    },
  }),
});

const EmmployeeRootMutationType = new GraphQLObjectType({
  name: "EmployeeRootMutations",
  description: "Mutations for Employees",
  fields: {
    addEmployee: {
      type: EmployeeType,
      description: "",
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        job: { type: new GraphQLNonNull(GraphQLString) },
        department: { type: new GraphQLNonNull(GraphQLString) },
        salary: { type: new GraphQLNonNull(GraphQLInt) },
        hire_date: { type: new GraphQLNonNull(DateTimeScalarType) },
      },
      resolve: (parent, args) => {
        const employee = { ...args, id: employees.slice(-1)[0].id + 1 };
        employees.push(employee);
        return employee;
      },
    },
    deleteEmployee: {
      type: EmployeeType,
      description: "",
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const employee = employees.find(employee => employee.id === args.id);
        employees = employees.filter(employee => employee.id !== args.id);
        return employee;
      },
    },
    updateEmployee: {
      type: EmployeeType,
      description: "",
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
        job: { type: GraphQLString },
        department: { type: GraphQLString },
        salary: { type: GraphQLInt },
      },
      resolve: (parent, args) => {},
    },
  },
});

const employeeSchema = new GraphQLSchema({
  query: EmployeeRootQueryType,
  mutation: EmmployeeRootMutationType,
});

module.exports = { employeeGQL: graphqlHTTP({ schema: employeeSchema }) };

//  REFERENCES:
//  [1]   https://github.com/WebDevSimplified/Learn-GraphQL/blob/master/server.js
//  [2]   https://github.com/bradtraversy/project-mgmt-graphql/blob/main/server/schema/schema.js
