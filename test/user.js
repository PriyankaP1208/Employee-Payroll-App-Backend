/* eslint-disable */
const chai = require('chai');
const chaiHttp = require('chai-http');
const { data } = require('../config/logers.js');
const server = require('../server.js');
const user = require('./user.json');

chai.should();
chai.use(chaiHttp);

describe('registerUser', () => {
  // it('givenValidData_shouldRegisterSuccessfully', (done) => {
  //   const userData = user.userCreate;
  //   chai.request(server)
  //     .post('/register')
  //     .send(userData)
  //     .end((error, res) => {
  //       if (error) {
  //         return done(error);
  //       }
  //       res.should.have.status(201);
  //       res.body.should.have.property('success').eql(true);
  //       res.body.should.have.property('message').eql('Registered Successfully');
  //       return done();
  //     });
  // });

  it('givenInvalidFirstName_shouldFailToRegister', (done) => {
    const userData = user.userCreateFalseFirstName;
    chai.request(server)
      .post('/register')
      .send(userData)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        res.should.have.status(400);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Enter valid details');
        return done();
      });
  });

  it('givenInvalidLastName_shouldFailToRegister', (done) => {
    const userData = user.userCreateFalseLastName;
    chai.request(server)
      .post('/register')
      .send(userData)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        res.should.have.status(400);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Enter valid details');
        return done();
      });
  });

  it('givenInvalidEmailId_shouldFailToRegister', (done) => {
    const userData = user.userCreateFalseFirstName;
    chai.request(server)
      .post('/register')
      .send(userData)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        res.should.have.status(400);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Enter valid details');
        return done();
      });
  });

  it('givenInvalidPassword_shouldFailToRegister', (done) => {
    const userData = user.userCreateFalseFirstName;
    chai.request(server)
      .post('/register')
      .send(userData)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        res.should.have.status(400);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Enter valid details');
        return done();
      });
  });
});

describe('loginUser', () => {
  it('givenValidData_shouldLoginSuccessfully', (done) => {
    const userData = user.userLogin;
    chai.request(server)
      .post('/login')
      .send(userData)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message').eql('Login Successful');
        return done();
      });
  });

  it('givenInvalidEmailId_shouldFailToLogin', (done) => {
    const userData = user.loginFalseEmailId;
    chai.request(server)
      .post('/login')
      .send(userData)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('User not found');
        return done();
      });
  });

  it('givenInvalidPassword_shouldFailToLogin', (done) => {
    const userData = user.loginFalsePassword;
    chai.request(server)
      .post('/login')
      .send(userData)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('User not found');
        return done();
      });
  });

  it('givenIfNoEmailId_shouldFailToLogin', (done) => {
    const userData = user.loginNoEmail;
    chai.request(server)
      .post('/login')
      .send(userData)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('User not found');
        return done();
      });
  });

  it('givenIfNoPassword_shouldFailToLogin', (done) => {
    const userData = user.loginNoPassword;
    chai.request(server)
      .post('/login')
      .send(userData)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Password can not be empty');
        return done();
      });
  });
});

describe("Employee Payroll API", () => {
  let token = " ";

  beforeEach((done) => {
    const userData = user.userLogin;
    chai
      .request(server)
      .post('/login')
      .send(userData)
      .end((error, res) => {
        token = res.body.token;
        res.should.have.status(200);
        if (error) return done(error)
        done();
      });
  });


describe("Add Employee", ()=> {
  it("givenDataIsValid_shouldCreateNewEmployee", (done) => {
    const userData = user.employeeData;
    chai.request(server)
      .post("/addEmployee")
      .send(userData)
      .set('token', token )
      .end((error, res) => {
        res.should.have.status(201);
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message').eql('Employee Created Successfully');
        res.body.should.have.property('data');
        done();
      });
  });

  it("givenNameIsInValid_shouldFailToCreateNewEmployee", (done) => {
    const userData = user.employeeWrongName;
    chai.request(server)
      .post("/addEmployee")
      .send(userData)
      .set('token', token )
      .end((error, res) => {
        res.should.have.status(400);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Enter valid details');
        res.body.should.have.property('data');
        done();
      });
  });

  it("givenMailIdIsInValid_shouldFailToCreateNewEmployee", (done) => {
    const userData = user.employeeWrongMailId;
    chai.request(server)
      .post("/addEmployee")
      .send(userData)
      .set('token', token )
      .end((error, res) => {
        res.should.have.status(400);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Enter valid details');
        res.body.should.have.property('data');
        done();
      });
  });

  it("givenEmployeeDetails_whenNoName_shouldFailToCreateNewEmployee", (done) => {
    const userData = user.employeeNoName;
    chai.request(server)
      .post("/addEmployee")
      .send(userData)
      .set('token', token )
      .end((error, res) => {
        res.should.have.status(400);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Enter valid details');
        res.body.should.have.property('data');
        done();
      });
  });

  it("givenEmployeeDetails_whenNoEmailId_shouldFailToCreateNewEmployee", (done) => {
    const userData = user.employeeNoMailId;
    chai.request(server)
      .post("/addEmployee")
      .send(userData)
      .set('token', token )
      .end((error, res) => {
        res.should.have.status(400);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Enter valid details');
        res.body.should.have.property('data');
        done();
      });
  });

  it("givenEmployeeDetails_whenNoGender_shouldFailToCreateNewEmployee", (done) => {
    const userData = user.employeeNoGender;
    chai.request(server)
      .post("/addEmployee")
      .send(userData)
      .set('token', token )
      .end((error, res) => {
        res.should.have.status(400);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Enter valid details');
        res.body.should.have.property('data');
        done();
      });
  });
})

describe("Retrieve Data", () => {
  it("givenValidRequest_shouldRetrieveAllEmployeeData", (done) => {
    chai.request(server)
      .get("/getEmployees")
      .set('token', token )
      .end((error, res) => {
        res.should.have.status(200);
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message').eql('Retrieved employee details');
        res.body.should.have.property('data');
        done();
      });
  });

  it("givenInvalidRequest_shouldFailTo_retrieveAllEmployeeData", (done) => {
    chai.request(server)
      .get("/getEmployee")
      .set('token', token )
      .end((error, res) => {
        res.should.have.status(404);
        done();
      });
  });
})

  describe("Retrieve One Data", () => {
    it("givenValidId_shouldRetrieveOneEmployeeData", (done) => {
      const id = user.getEmployeeById.id;
      chai.request(server)
        .get("/getById/" + id)
        .set('token', token )
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('message').eql('Retrieved employee details');
          res.body.should.have.property('data');
          done();
        });
    });

    it("givenInValidId_shouldFailTo_retrieveOneEmployeeData", (done) => {
      const id = user.getWrongEmployeeId.id;
      chai.request(server)
        .get("/getById/" + id)
        .set('token', token )
        .end((error, res) => {
          res.should.have.status(400);
          done();
        });
    });
})

describe("UpdateData", () => {
  it("givenValidId_shouldUpdateEmployeeData", (done) => {
    const id = user.updateEmployeeDetails.id;
    chai.request(server)
      .put("/updateById/" + id)
      .set('token', token )
      .end((error, res) => {
        res.should.have.status(200);
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message').eql('Updated data successfully');
        res.body.should.have.property('data');
        done();
      });
  });

  it("givenInvalidId_shouldFailTo_UdateEmployeeData", (done) => {
    const id = user.updateWrongId.id;
    chai.request(server)
      .put("/updateById/" + id)
      .set('token', token )
      .end((error, res) => {
        res.should.have.status(500);
        done();
      });
  });
})

describe("DeleteData", () => {
  it("givenValidId_shouldDeleteEmployeeData", (done) => {
    const id = user.deleteEmployeeDetails.id;
    chai.request(server)
      .delete("/deleteEmployee/" + id)
      .set('token', token )
      .end((error, res) => {
        res.should.have.status(200);
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message').eql('Deleted employee successfully');
        res.body.should.have.property('data');
        done();
      });
  });
})
})
