const { dbConfig } = require("../config/index");

const insert = async (program_id, user_id, db) => {
  let query, values;
  try {
    query = `INSERT INTO user_assignation (program_id, user_id) VALUES ($1, $2)`;
    values = [program_id, user_id];
    await db.query(query, values);
  } catch (error) {
    console.log(error);
    throw error;
  }

  return;
};

const BulkInsert = async (program_id, user_ids) => {
  let db;
  try {
    db = await dbConfig.pool.connect();
    await db.query("BEGIN");
    for (let i = 0; i < user_ids.length; i++) {
      await insert(program_id, user_ids[i], db);
    }
    await db.query("COMMIT");
  } catch (error) {
    await db.query("ROLLBACK");
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
  BulkInsert,
};
