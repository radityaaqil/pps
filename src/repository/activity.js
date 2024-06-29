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
            start_date,
            end_date,
            created_by
        ) VALUES ($1, $2, $3, $4, $5, $6)
    `;
    values = [
      data.program_id,
      data.pic,
      data.remark,
      data.start_date,
      data.end_date,
      data.created_by,
    ];
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

const Update = async (data, id) => {
  let db, query, values;
  try {
    db = await dbConfig.pool.connect();

    // Check which column needs to be updated
    const keys = Object.keys(data);
    const setClause = keys
      .map((key, index) => {
        return `${key} = $${index + 1}`;
      })
      .join(", ");

    query = `UPDATE activity SET ${setClause} WHERE id = $${keys.length + 1}`;
    values = Object.values(data);
    values.push(id);

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

const GetByProgramId = async (id) => {
  let db, query, values, result;
  try {
    db = await dbConfig.pool.connect();
    query = `
        SELECT 
            id,
            pic,
            status
        FROM activity 
        WHERE program_id = $1`;
    values = [id];
    result = await db.query(query, values);
    return result.rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    if (db) {
      db.release();
    }
  }
};

module.exports = {
  Insert,
  Update,
  GetByProgramId,
};
