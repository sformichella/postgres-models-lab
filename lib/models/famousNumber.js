const pool = require('../utils/pool');

module.exports = class FamousNumber {
  id;
  title;
  description;
  url;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.description = row.description;
    this.url = row.url;
  }

  static async getAll() {
    const { numbers } = await pool.query(`SELECT * from numbers`);

    return numbers.map(thm => new FamousNumber(thm))
  }

  static async getById(id) {
    const { numbers } = await pool.query(`SELECT * from numbers WHERE id = $1`, [id]);

    if (!numbers[0]) throw new Error(`No famous number with an ID of ${id}`);

    return new FamousNumber(numbers[0]);
  }

  static async make({ title, description, url }) {
    const { numbers } = await pool.query(
      `
        INSERT INTO numbers (title, description, url)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [title, description, url]
    );

    return new FamousNumber(numbers[0]);
  }

  static async update(id, {title, description, url }) {
    const { numbers } = await pool.query(
      `
        UPDATE numbers
        SET title = $1,
            description = $2,
            url = $3
        WHERE id = $4
        RETURNING *
      `,
      [title, description, url, id]
    );

    return new FamousNumber(numbers[0]);
  }

  static async delete(id) {
    const { numbers } = await pool.query(
      `
        DELETE * from numbers
        WHERE id = $1
        RETURNING *
      `,
      [id]
    );

    return new FamousNumber(numbers[0]);
  }
}