import mysqlConnection from 'mysql2/promise';
//Define un objeto llamado properties
const properties = {
    host: 'localhost',
    user: 'root',
    password: '',
    database:'rest_api_gestion_libro',
};

export const pool = mysqlConnection.createPool(properties);