import mysql, { PoolOptions } from 'mysql2/promise';

const dbAccess: PoolOptions = {
    host: '104.197.56.244',
    user: 'jay',
    password: 'DB_PASs_24@24@@',
    database: 'agencyai',
    waitForConnections: true,
    connectionLimit: 10,
}

export const pool = mysql.createPool(dbAccess)