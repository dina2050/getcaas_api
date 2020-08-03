var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");
var mock = new MockAdapter(axios);

const data = {
    username: "dinara",
    password: "dinara1995",
    email: "dina.new@mail.ru",
    realname: "Dinara",
}
const auth = {
    username: "admin-getcaas",
    password: "Fullmetal1989"
}
const config = {
    baseURL: '/v1/registry/users',  
    timeout: 1000
  }
  console.log(config)
describe('Creating users', () => {
    it('creates a user', (done) => {
        mock.onPost("/v1/registry/bla").reply(200).then(done());
        axios.post("/v1/registry/bla", data, { headers: { "content-type": "application/json" } })
            .then(function (response) {
                console.log("response :", response)
                console.log("postdata :", response.data);
                done()
            })
            .catch((err) => {
                console.log(err)
            })
    });

   
 
})
