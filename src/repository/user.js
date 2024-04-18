const { dbConfig } = require("../config/index");

const Insert = async (data) => {
  let db, query, values;
  try {
    db = await dbConfig.pool.connect();
    query = `
      INSERT INTO "user" (
        name,
        email,
        password,
        nik,
        phone_number,
        address,
        birth_date,
        created_by
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
    return error;
  }
  db.release();

  return;
};

const GetByNameOrEmail = async (name, email) => {
  let db, query, values, result;
  try {
    db = await dbConfig.pool.connect();
    query = `SELECT name, email FROM "user" u WHERE u.name = $1 OR u.email = $2`;
    values = [name, email];
    result = await db.query(query, values);
  } catch (error) {
    return error;
  }
  db.release();

  return result;
};

const GetByID = async (id) => {
  let db, query, values, result;
  try {
    db = await dbConfig.pool.connect();
    query = `SELECT id, name, email, nik, phone_number, address, position_id FROM user u wher u.id = $1`;
    values = [id];
    result = await db.query(query, values);
  } catch (error) {
    console.log(error);
    return error;
  }
  db.release();

  return result;
};

module.exports = {
  GetByNameOrEmail,
  GetByID,
  Insert,
};
