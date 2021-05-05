//para consultar ala bd,se utliza mysql2/promise  para los await
const mysql = require("mysql2/promise");

const databaseConfig = require("./databaseConfig");

async function query(sql, params){

    const connection = await mysql.createConnection(databaseConfig.connection);
    const [result] = await connection.execute(sql, params);
    return result;
}

const Database = {
    query,
};

module.exports = Database;