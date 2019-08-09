import { expect } from 'chai';
import requests from 'supertest';

describe('Hello world test', () => {
  let agent;

  before(() => {
    agent = requests(`http://localhost:${process.env.PORT}`);
  });

  it('should hello world query', async () => {
    const name = 'world';
    const graphqlQuery = `{ Hello(name: "${name}" ) }`
    const response = await agent.post('/').set('Content-Type', 'application/json').send({ query: graphqlQuery });

    expect(response.status).to.be.eq(200);
    expect(response.body.data.Hello).to.be.eq(`Hello ${name}`);
  });
});
