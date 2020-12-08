const pool = require('../utils/pool');

module.exports = class ProofTechnique {
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
    const { techniques } = await pool.query(`SELECT * from techniques`);

    return techniques.map(thm => new ProofTechnique(thm))
  }

  static async getById(id) {
    const { techniques } = await pool.query(`SELECT * from techniques WHERE id = $1`, [id]);

    if (!techniques[0]) throw new Error(`No proof technique with an ID of ${id}`);

    return new ProofTechnique(techniques[0]);
  }

  static async make({ title, description, url }) {
    const { techniques } = await pool.query(
      `
        INSERT INTO techniques (title, description, url)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [title, description, url]
    );

    return new ProofTechnique(techniques[0]);
  }

  static async update(id, {title, description, url }) {
    const { techniques } = await pool.query(
      `
        UPDATE techniques
        SET title = $1,
            description = $2,
            url = $3
        WHERE id = $4
        RETURNING *
      `,
      [title, description, url, id]
    );

    return new ProofTechnique(techniques[0]);
  }

  static async delete(id) {
    const { techniques } = await pool.query(
      `
        DELETE * from techniques
        WHERE id = $1
        RETURNING *
      `,
      [id]
    );

    return new ProofTechnique(techniques[0]);
  }
}