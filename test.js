const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app'); 

chai.use(chaiHttp);
const expect = chai.expect;

describe('Currency Conversion API', () => {
  it('should convert currency amount', (done) => {
    chai.request(app)
      .get('/?source=USD&target=JPY&amount=$1,525')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.msg).to.equal('success');
        expect(res.body.amount).to.equal('$170,496.53');
        done();
      });
  });

  it('should handle invalid source currency', (done) => {
    chai.request(app)
      .get('/?source=EUR&target=JPY&amount=$1,525')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.msg).to.equal('Invalid source or target currency.');
        done();
      });
  });

  it('should handle invalid target currency', (done) => {
    chai.request(app)
      .get('/?source=USD&target=EUR&amount=$1,525')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.msg).to.equal('Invalid source or target currency.');
        done();
      });
  });
});
