import 'mocha'
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000';

describe('GET TEST',()=>{
    it('[GET] - get a note correctly should respond a 200 status', (done) => {
        chai.request(url)
          .get('/notes?name=PERMANENT_NOTE_TEST')
          .end( function(_,res) {
              expect(res).to.have.status(200);
              done();
        });
    });

    it('[GET] - get a note correctly should respond with the note', (done) => {
        chai.request(url)
          .get('/notes?name=PERMANENT_NOTE_TEST')
          .end( function(_,res) {
              expect(res.body.name).to.equal('PERMANENT_NOTE_TEST');
              expect(res.body.content).to.equal('TEST');
              done();
        });
    });

    it('[GET] - get a note that does not exist should respond with a 404', (done) => {
        chai.request(url)
          .get('/notes?name=NOTEXIST')
          .end( function(_,res) {
              expect(res).to.have.status(404);
              done();
        });
    });

    it('[GET] - if the param name is not provided should respond with a 404', (done) => {
        chai.request(url)
          .get('/notes?not=test')
          .end( function(_,res) {
              expect(res).to.have.status(403);
              done();
        });
    });


    it('[GET] - get a note by id correctly should respond a status 201', (done) => {
        chai.request(url)
          .get('/notes/63824a62f573c32a8487aaf3')
          .end( function(_,res) {
              expect(res).to.have.status(200);
              done();
        });
    });

    it('[GET] - get a note by id correctly should have the note in res.body', (done) => {
        chai.request(url)
          .get('/notes/63824a62f573c32a8487aaf3')
          .end( function(_,res) {
              expect(res.body.name).to.equal('PERMANENT_NOTE_TEST'); 
              expect(res.body.content).to.equal('TEST');
              done();
        });
    });

    it('[GET] - get an id that not exist should respond with a 400 status', (done) => {
        chai.request(url)
          .get('/notes/00')
          .end( function(_,res) {
              expect(res).to.have.status(400);
              done();
        });
    });

    it('[GET] - if anything is send in the route should respond a 400 status', (done) => {
        chai.request(url)
          .get('/notes')
          .end( function(_,res) {
              expect(res).to.have.status(403);
              done();
        });
    });
});