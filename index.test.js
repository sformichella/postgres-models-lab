const request = require('supertest');

const app = require('./index');

describe('GET theorems', () => {
  it('returns some theorems', () => {
    request(app)
      .get('/theorems')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => expect(res.length > 0))
  })
})