const { DataSource } = require("typeorm");

//  initialize connection to DB with all credentials below and export DataSource for use across application
const dataSource = new DataSource({
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  //  entities are TypeORM representations of tables in the DB
  entities: [require("../models/employee")],
});

dataSource
  .initialize()
  .then(connection => connection)
  .catch(error => {
    console.error(error);
    return error;
  });

module.exports = dataSource;

//  REFERENCE:  https://typeorm.io/data-source
