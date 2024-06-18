import mysql, { PoolOptions } from 'mysql2/promise';

const dbAccess: PoolOptions = {
    host: '',
    user: '',
    password: '
    database: '',
    waitForConnections: true,
    connectionLimit: 10,
}

export const pool = mysql.createPool(dbAccess)
