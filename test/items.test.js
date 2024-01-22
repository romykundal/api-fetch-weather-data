// test.js
import { expect } from 'chai';
import request from 'supertest';
import app from './../bin/server.js'; // Replace with the correct path

describe('Test server endpoint', () => {
  it('responds with JSON message', async () => {
    const res = await request(app).get('/');
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal({ message: "Welcome Rohit's world to learn deep level code." });
  });
});

describe('Weather API', () => {
  it('should fetch weather data for a specified lat long', async () => {
    const res = await request(app).get('/api/weather?lat=18.520430&long=73.856743');
    expect(res.status).to.equal(200);
    // expect(res.body).to.deep.equal(sampleData);
   
    expect(res.body).to.have.property('code').to.be.a('number');
    expect(res.body).to.have.property('status').that.equals('success');
    expect(res.body).to.have.property('status').to.be.a('string');
    
  });

  it('should fetch weather data and check city name in weather data', async () => {
    const res = await request(app).get('/api/weather?lat=18.520430&long=73.856743');
    
    expect(res.body.data).to.have.property('name').that.equals('Pune');
    
  });

  it('should fetch weather data for a without lat long', async () => {
    const res = await request(app).get('/api/weather?lat=&long=');
    
    expect(res.body.data).to.have.property('visibility').to.be.a('number');
    expect(res.body.data).to.have.property('coord').to.be.a('object');

  });

  it('should handle errors when fetching weather data', async () => {
    const res = await request(app).get('/weather');

    expect(res.status).to.equal(404);
    expect(res.body).to.deep.equal({});
  });

//   it('should handle errors 500', async () => {
//     const res = await request(app).get('/sdsdsdsdsdsdsd');
// console.log(">>>>>>>>", res);
//     // expect(res.status).to.equal(404);
//     // expect(res.body).to.deep.equal({});
//   });

});
