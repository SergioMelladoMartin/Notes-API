import 'mocha'
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000';

describe('POST TEST',()=>{
    it('[POST] - add a correctly note should respond a 201 status', (done) => {
      chai.request(url)
        .post('/notes')
        .send({
            "name": "test",
            "content": "test"
        })
        .end( function(_,res) {
            expect(res).to.have.status(201);
            done();
        });
    });

    it('[POST] - add a note without name should fail with a 400 status', (done) => {
        chai.request(url)
          .post('/notes')
          .send({
             "content": "test"
          })
          .end( function(_,res) {
              expect(res).to.have.status(400);
              done();
        });
    });

    it('[POST] - add a note without content should fail with a 400 status', (done) => {
        chai.request(url)
          .post('/notes')
          .send({
             "name": "test"
          })
          .end( function(_,res) {
              expect(res).to.have.status(400);
              done();
        });
    });
});