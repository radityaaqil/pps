const { dbConfig } = require("../config/index");

const Insert = async (data) => {
  let db, query, values;
  try {
    db = await dbConfig.pool.connect();
    query = `
          INSERT INTO report (
              activity_id,
              attachments,
              remark
          ) VALUES ($1, $2, $3)
      `;
    values = [data.activity_id, data.attachments, data.remark];
    await db.query(query, values);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    if (db) {
      db.release();
    }
  }

  return;
};

module.exports = {
  Insert,
};
