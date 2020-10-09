const app = require("../index")
const supertest = require('supertest');
const request = supertest(app);
const {TEST_THUMBNAIL_URL, TEST_JSON, TEST_JSONPATCH} = require("./constants")
let token = null;

describe('Login API Routes', () => {
    describe('POST /login', () => {
        it('Login with username and password', (done) => {
            request.post('/login')
                .send({
                    username: 'test',
                    password: 'test_password'
                })
                .expect(200)
                .end((err, res) => {
                    token = res.body.token
                    done(err);
                });
        });
    });
});

describe('JSON Patch API Routes', () => {
    describe('PATCH /jsonPatch', () => {
        it('Patch the json with json_patch object', (done) => {
            request.patch('/jsonPatch')
                .set("Authorization", token)
                .send({
                    json: TEST_JSON,
                    json_patch: TEST_JSONPATCH
                })
                .expect(200)
                .end((err, res) => {
                    done(err);
                });
        });
    });
});


describe('Thumbnail API Routes', () => {
    describe('POST /thumbnail', () =>  {
        it('Download image from url, create thumbnail and return', (done) => {
            request.post('/thumbnail')
                .set("Authorization", token)
                .send({
                    url: TEST_THUMBNAIL_URL
                })
                .expect(200)
                .end((err, res) => {
                    done(err);
                });
        });
    });
});