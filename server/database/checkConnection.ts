import database from './client';

database
  .getConnection()
  .then(conn => {
    console.log(`Database connection successful: ${process.env.DB_NAME}`);
    conn.release();
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });
