const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '104.197.56.244',
    user: 'jay',
    password: 'DB_PASs_24@24@@',
    database: 'agencyai',
    waitForConnections: true,
    connectionLimit: 10,
})

exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless v4! Your function executed successfully!",
    }),
  };
};

const dataById = `
  SELECT * FROM users WHERE ID = ?
`;

exports.getDataById = async (event) => {
  let connection;

  try {
    const {
      id,
      dryRun,
    } = event.queryStringParameters || {};

    const isDryRun = dryRun === 'true';
    console.log(isDryRun ? 'Dry Run' : 'Not Dry Run');
    console.log('id', id);

    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "No ID Provided!",
        }),
      };
    }
    connection = await pool.getConnection();

    const [rows] = await connection.query(dataById, [id])

    console.log('rows', rows)

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Go Serverless v4! Your function executed successfully!",
      }),
    };

    // return {
    //   statusCode: 200,
    //   body: JSON.stringify({
    //     message: "Data retrieved successfully!",
    //   }),
    // };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: `Failed to fetch data:: ${error.message}`
      }),
    };
  } finally {
    if (connection) {
      try {
        await connection.release();
      } catch (releaseError) {
        console.error('Error releasing connection:', releaseError);
      }
    }
  }
};