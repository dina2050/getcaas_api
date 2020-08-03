var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

const instance = axios.create({
    baseURL: '/v1/registry/users',
    timeout: 2500,
    headers: { Accept: 'application/json' },
  });
var mock = new MockAdapter(instance);
describe(' users', () => {

    it('gets a user', (done) => {
        mock.onGet("/bja").reply(200, {
            users: [{
                username: "dina",
                password: "dina1995",
                email: "dina.new@mail.ru",
                realname: "Dinara"
            }],
        }).then(done());
        axios.get("/bja")
            .then(function (response) {
                console.log(response.data);
                done()
            });
    });
});