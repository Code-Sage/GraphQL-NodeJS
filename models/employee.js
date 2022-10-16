const { EntitySchema } = require("typeorm");
const { TYPES } = require("./column_data_types");

//  TypeORM representation of Employees table in DB
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
      nullable: false,
    },
    job: {
      type: TYPES.TEXT,
      nullable: false,
    },
    department: {
      type: TYPES.TEXT,
      nullable: false,
    },
    salary: {
      type: TYPES.INT,
      nullable: false,
    },
    hire_date: {
      type: TYPES.TIMESTAMP_W_OUT_TZ,
      nullable: false,
    },
  },
});

module.exports = employee;
