var mysql = require('mysql'),
    config = require('../config/' + (process.env.NODE_ENV || 'development'));


var connection = mysql.createConnection(config.db.mysql);

function checkMySQLConnection(){
    connection.connect();
    console.log('Соединение с базой данных установлено');
    return connection.query('SELECT 1');
}


module.exports = {
    mysql: mysql,
    checkMySQLConnection: checkMySQLConnection,
    connection: connection
};