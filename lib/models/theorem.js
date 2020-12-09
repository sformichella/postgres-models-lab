const pool = require('../utils/pool');

module.exports = class Theorem {
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
    const { rows } = await pool.query('SELECT * FROM theorems');
    return rows.map(thm => new Theorem(thm));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from theorems WHERE id = $1', [id]);

    if(!rows[0]) throw new Error(`No theorem with an ID of ${id}`);

    return new Theorem(rows[0]);
  }

  static async make({ title, description, url }) {
    const { rows } = await pool.query(
      `
        INSERT INTO theorems (title, description, url)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [title, description, url]
    );

    return new Theorem(rows[0]);
  }

  static async update(id, { title, description, url }) {
    const { rows } = await pool.query(
      `
        UPDATE theorems
        SET title = $1,
            description = $2,
            url = $3
        WHERE id = $4
        RETURNING *
      `,
      [title, description, url, id]
    );

    return new Theorem(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
        DELETE * from theorems
        WHERE id = $1
        RETURNING *
      `,
      [id]
    );

    return new Theorem(rows[0]);
  }
}