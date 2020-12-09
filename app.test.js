const request = require('supertest');
const fsPromises = require('fs').promises;

const app = require('./app');
const pool = require('./lib/utils/pool');


const testTheorem = {
  'id': '1',
  'title': 'Test Theorem',
  'description': 'A fundamental theorem for testing http request',
  'url': 'test-theorem.com'
};

const calculusTheorem = {
  'id': '2',
  'title': 'Fundamental Theorem of Calculus',
  'description': 'A fundamental relationship between derivatives and anti-derivatives',
  'url': 'https://en.wikipedia.org/wiki/Fundamental_theorem_of_calculus'
};



describe('theorems routes', () => {

  beforeAll(async() => {
    const setupSQL = await fsPromises.readFile('./sql/setup.sql', 'utf-8');

    await pool.query(setupSQL);
  });

  afterAll(async() => {
    await pool.end();
  });


  it('should add a theorem and then return it', async() => {
    const response = await request(app)
      .post('/theorems')
      .send(testTheorem);

    expect(response.body).toEqual(testTheorem);
  });

  it('returns a theorem', async() => {
    const response = await request(app)
      .get('/theorems/1')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(testTheorem);
  });

  it('returns some theorems', async() => {
    await request(app)
      .post('/theorems')
      .send(calculusTheorem);

    const response = await request(app)
      .get('/theorems')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.length > 0);
    expect(response.body).toEqual([testTheorem, calculusTheorem]);
  });

  it('should update a theorem', async() => {
    const updatedTestTheorem = {
      'id': '1',
      'title': 'Really Cool Test Theorem',
      'description': 'A fundamental theorem for testing http request',
      'url': 'test-theorem.com'
    };

    const response = await request(app)
      .put('/theorems/1')
      .send(updatedTestTheorem);

    expect(response.body).toEqual(updatedTestTheorem);
  });

  it('should delete a theorem', async() => {
    const deleteResponse = await request(app)
      .delete('/theorems/2');

    expect(deleteResponse.body).toEqual(calculusTheorem);
  });

  it('should return an error message', async() => {
    const errorMessage = await request(app)
      .get('/theorems/2');

    expect(errorMessage.text).toEqual('No theorem with an ID of 2');
  });

  it('should return some theores', async() => {
    const updatedTestTheorem = {
      'id': '1',
      'title': 'Really Cool Test Theorem',
      'description': 'A fundamental theorem for testing http request',
      'url': 'test-theorem.com'
    };

    const theorems = await request(app)
      .get('/theorems');

    expect(theorems.body).toEqual([updatedTestTheorem]);
  });
});
