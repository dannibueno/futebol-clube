import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const dumpLogin = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}

describe('/login', () => {
  describe('POST', () => {
    it('Deve logar com sucesso', async() => {
      const response = await chai.request(app).post('/login').send(dumpLogin);
      expect(response.status).to.equal(200);
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
