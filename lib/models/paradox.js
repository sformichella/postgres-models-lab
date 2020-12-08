const pool = require('../utils/pool');

module.exports = class Paradox {
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
    const { paradoxes } = await pool.query(`SELECT * from paradoxes`);

    return paradoxes.map(thm => new Paradox(thm))
  }

  static async getById(id) {
    const { paradoxes } = await pool.query(`SELECT * from paradoxes WHERE id = $1`, [id]);

    if (!paradoxes[0]) throw new Error(`No paradox with an ID of ${id}`);

    return new Paradox(paradoxes[0]);
  }

  static async make({ title, description, url }) {
    const { paradoxes } = await pool.query(
      `
        INSERT INTO paradoxes (title, description, url)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [title, description, url]
    );

    return new Paradox(paradoxes[0]);
  }

  static async update(id, {title, description, url }) {
    const { paradoxes } = await pool.query(
      `
        UPDATE paradoxes
        SET title = $1,
            description = $2,
            url = $3
        WHERE id = $4
        RETURNING *
      `,
      [title, description, url, id]
    );

    return new Paradox(paradoxes[0]);
  }

  static async delete(id) {
    const { paradoxes } = await pool.query(
      `
        DELETE * from paradoxes
        WHERE id = $1
        RETURNING *
      `,
      [id]
    );

    return new Paradox(paradoxes[0]);
  }
}