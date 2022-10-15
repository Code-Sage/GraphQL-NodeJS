const { EntitySchema } = require("typeorm");
const { TYPES } = require("./data_types");

const employee = new EntitySchema({
  name: "Employee",
  tableName: "Employees",
  columns: {
    id: {
      primary: true,
      generated: true,
      type: TYPES.INT,
    },
    name: {
      type: TYPES.TEXT,
    },
    job: {
      type: TYPES.TEXT,
    },
    department: {
      type: TYPES.TEXT,
    },
    salary: {
      type: TYPES.INT,
    },
    hire_date: {
      type: TYPES.TIMESTAMP_W_OUT_TZ,
    },
  },
});

module.exports = employee;
