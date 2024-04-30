const { dbConfig } = require("../config/index");

const Insert = async (data) => {
  let db, query, values;
  try {
    db = await dbConfig.pool.connect();
    query = `
        INSERT INTO activity (
            program_id,
            pic,
            remark,
            created_by
        ) VALUES ($1, $2, $3, $4)
    `;
    values = [data.program_id, data.pic, data.remark, data.created_by];
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
