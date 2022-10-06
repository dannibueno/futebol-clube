import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import Team from '../database/models/Team';
import Match from '../database/models/Match';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const TeamMock = [{
  "id": 2,
  "teamName": "Bahia"
}]

describe('/login', () => {
  describe('POST', () => {
    it('Testa se o loga com sucesso', async() => {
      const response = await chai.request(app).post('/login').send({
      
        email: 'admin@admin.com',
        password: 'secret_admin',
      });
      
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('token');
    });

    it('Testa erro para email e senha não valido', async() => {
      const response = await chai.request(app).post('/login').send({
        email: 'testando@testando.com',
        password: '12345',

      });
      expect(response.status).to.equal(401);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.equal('Incorrect email or password');
    });

    it('Testa erro para campo de login vazio ', async() => {
      const response = await chai.request(app).post('/login').send({
        email: '',
        password: '',

      });
      expect(response.status).to.equal(400);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.equal('All fields must be filled');
    });
  });
});


describe('/Rota teams', () => {
  describe('GET', () => {

    beforeEach(() => {
      sinon
        .stub(Team, 'findAll')
        .resolves(TeamMock as Team[]);
    });
  
    afterEach(() => {
      (Team.findAll as sinon.SinonStub).restore();
    });

    it('Testa se retorna todos os times cadastrados - getAllTimes', async() => {
      const response = await chai.request(app).get('/teams');
      expect(response.status).to.equal(200);
    });

    it('Testa se retorna um time', async() => {
      const response = await chai.request(app).get('/teams/2');
      expect(response.status).to.equal(200);
    });
  });
});
