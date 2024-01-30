const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Aman@123",
    database: "perntodo",
    host: "localhost",
    port: 5432
})

module.exports = pool