const { dbConfig } = require("../config/index");

const Insert = async (data) => {
  let db, query, values;
  try {
    db = await dbConfig.pool.connect();
    query = `
        INSERT INTO "program" (
            name,
            start_date,
            end_date,
            status,
            frequency,
            monitoring_method,
            kpi,
            result,
            enforcement_method,
            created_by
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `;
    values = [
      data.name,
      data.start_date,
      data.end_date,
      data.status,
      data.frequency,
      data.monitoring_method,
      data.kpi,
      data.result,
      data.enforcement_method,
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

const GetByID = async (id) => {
  let db, query, values, result;
  try {
    db = await dbConfig.pool.connect();
    query = `
        SELECT 
            name,
            start_date,
            end_date,
            status,
            frequency,
            monitoring_method,
            kpi,
            result,
            enforcement_method 
        FROM "program" 
        WHERE id = $1
    `;
    values = [id];
    result = await db.query(query, values);
    return result.rows[0];
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
  GetByID,
};
