import 'mocha'
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000';

describe('NOTE TEST',()=>{
    it('post', (done) => {
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

    it('post', (done) => {
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

    it('get', (done) => {
        chai.request(url)
          .get('/notes?name=test')
          .end( function(_,res) {
              expect(res).to.have.status(201);
              done();
        });
    });

    it('get', (done) => {
        chai.request(url)
          .get('/notes/628621d94892ca00167')
          .send()
          .end( function(_,res) {
              expect(res).to.have.status(500);
              done();
        });
    });

    it('get', (done) => {
        chai.request(url)
          .get('/notes?name=')
          .end( function(_,res) {
              expect(res).to.have.status(201);
              done();
        });
    });

    it('get', (done) => {
        chai.request(url)
          .get('/notes?name=notExist')
          .end( function(_,res) {
              expect(res).to.have.status(404);
              done();
        });
    });

    it('patch', (done) => {
        chai.request(url)
          .patch('/notes?name=test')
          .send({
              "name": "test modified",
              "content": "test modified"
            })
          .end( function(_,res) {
              expect(res).to.have.status(200);
              done();
        });
    });

    it('patch', (done) => {
        chai.request(url)
          .patch('/notes/6200167fe749')
          .send({
              "content": "test modified"
            })
          .end( function(_,res) {
              expect(res).to.have.status(404);
              done();
        });
    });

    it('patch', (done) => {
        chai.request(url)
          .patch('/notes?name=notExist')
          .send({
              "content": "test modified"
            })
          .end( function(_,res) {
              expect(res).to.have.status(404);
              done();
        });
    });

    it('delete', (done) => {
        chai.request(url)
          .delete('/notes?name=test modified')
          .end( function(_,res) {
              expect(res).to.have.status(200);
              done();
        });
    });

    it('delete', (done) => {
        chai.request(url)
          .delete('/notes?name=notExist')
          .end( function(_,res) {
              expect(res).to.have.status(404);
              done();
        });
    });

    it('delete', (done) => {
        chai.request(url)
          .delete('/notes?name=')
          .end( function(_,res) {
              expect(res).to.have.status(400);
              done();
        });
    });

    it('delete', (done) => {
        chai.request(url)
          .delete('/notes/000000000000000000000000')
          .end( function(_,res) {
              expect(res).to.have.status(404);
              done();
        });
    });
});