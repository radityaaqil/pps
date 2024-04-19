const { dbConfig } = require("../config/index");

const Insert = async (data) => {
  let db, query, values;
  try {
    db = await dbConfig.pool.connect();
    query = `
        INSERT INTO "program" (
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `;
    values = [
      data.name,
      data.email,
      data.password,
      data.nik,
      data.phone_number,
      data.address,
      data.birth_date,
      data.created_by,
    ];
    await db.query(query, values);
  } catch (error) {
    throw error;
  } finally {
    if (db) {
      db.release();
    }
  }

  return;
};
