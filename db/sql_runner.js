const {Pool} = require("pg"); // called destructuring. taking the "Pool" class from "pg" (postgress)

const pool = new Pool({
  host: "localhost",
  database: "star_wars"
});

class SqlRunner {
  static run(sqlQuery, values = []) {
    return pool.query(sqlQuery, values).then(results => {
      return results;
    });
  }
}

module.exports = SqlRunner;
