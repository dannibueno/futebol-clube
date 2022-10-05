import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

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





// describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

//   it('Seu sub-teste', () => {
//     expect(false).to.be.eq(true);
//   });
// });
