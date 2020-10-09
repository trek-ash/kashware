const app = require("../index")
const supertest = require('supertest');
const request = supertest(app);
const {TEST_THUMBNAIL_URL, TEST_JSON, TEST_JSONPATCH} = require("./constants")
let token = null;

describe('Login API Routes', function() {
    describe('POST /login', function() {
        it('Login with username and password', function(done) {
            request.post('/login')
                .send({
                    username: 'test',
                    password: 'test_password'
                })
                .expect(200)
                .end(function(err, res) {
                    token = res.body.token
                    done(err);
                });
        });
    });
});

describe('JSON Patch API Routes', function() {
    describe('PATCH /jsonPatch', function() {
        it('Patch the json with json_patch object', function(done) {
            request.patch('/jsonPatch')
                .set("Authorization", token)
                .send({
                    json: TEST_JSON,
                    json_patch: TEST_JSONPATCH
                })
                .expect(200)
                .end(function(err, res) {
                    done(err);
                });
        });
    });
});


describe('Thumbnail API Routes', function() {
    describe('POST /thumbnail', function() {
        it('Download image from url, create thumbnail and return', function(done) {
            request.post('/thumbnail')
                .set("Authorization", token)
                .send({
                    url: TEST_THUMBNAIL_URL
                })
                .expect(200)
                .end(function(err, res) {
                    done(err);
                });
        });
    });
});