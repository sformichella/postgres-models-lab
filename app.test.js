const request = require('supertest');
const fsPromises = require('fs').promises;

const app = require('./app');
const pool = require('./lib/utils/pool');


const testTheorem = {
  'title': 'Test Theorem',
  'description': 'A fundamental theorem for testing http request',
  'url': 'test-theorem.com'
};

const calculusTheorem = {
  'id': '1',
  'title': 'Fundamental Theorem of Calculus',
  'description': 'A fundamental relationship between derivatives and anti-derivatives',
  'url': 'https://en.wikipedia.org/wiki/Fundamental_theorem_of_calculus'
};



describe('GET theorems', () => {

  beforeAll(async() => {
    const setupSQL = await fsPromises.readFile('./sql/setup.sql');

    pool.query(setupSQL);
  });

  afterAll(async() => {
    await pool.end();
  });
  

  it('returns some theorems', async() => {
    const response = await request(app)
      .get('/theorems')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.length > 0);
  });

  it('returns a theorem', async() => {
    const response = await request(app)
      .get('/theorems/1')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(calculusTheorem);
  });
});


// describe('POST /make/theorem', () => {
//   it('creates a new theorem', () => {
//     request(app)
//       .get('/theorems/1')
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .then(res => expect(res).toEqual(testTheorem))

    
//   })
// })
