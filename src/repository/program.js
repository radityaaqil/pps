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
            frequency,
            monitoring_method,
            kpi,
            result,
            background,
            enforcement_method,
            created_by
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `;
    values = [
      data.name,
      data.start_date,
      data.end_date,
      data.frequency,
      data.monitoring_method,
      data.kpi,
      data.result,
      data.background,
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

const Update = async (data, id) => {
  let db, query, values;
  try {
    db = await dbConfig.pool.connect();
    query = `
        UPDATE "program" SET
            name = $1,
            frequency = $2,
            monitoring_method = $3,
            kpi = $4,
            background = $5,
            enforcement_method = $6,
            updated_by = $7, updated_at = now() WHERE id = $8
      `;
    values = [
      data.name,
      data.frequency,
      data.monitoring_method,
      data.kpi,
      data.background,
      data.enforcement_method,
      data.updated_by,
      id,
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
            background,
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

const UpdateStatus = async (status, id) => {
  let db, query, values;
  try {
    db = await dbConfig.pool.connect();
    query = `UPDATE "program" SET status = $1 WHERE id = $2`;
    values = [status, id];
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

const GetList = async (keyword) => {
  let db, query, values, result;
  try {
    db = await dbConfig.pool.connect();
    query = `
        SELECT 
            id,
            name,
            start_date,
            end_date,
            status,
            frequency,
            monitoring_method,
            kpi,
            result,
            enforcement_method 
        FROM "program"`;

    // Build Condition
    if (keyword !== "") {
      query += ` WHERE LOWER(name) ILIKE $1`;
      values = [`%${keyword.toLowerCase()}%`];
    } else {
      values = [];
    }
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
  GetByID,
  UpdateStatus,
  GetList,
  Update,
};
