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
const apiURL = "/v1/registry/users"
const id = 48
describe('Updating users', () => {
    it('updates a user', (done) => {
        mock.onPut(apiURL + id).reply(200).then(done());
        axios.put(apiURL + id, data, { headers: { "content-type": "application/json" } })
            .then(function (response) {
                console.log("response :", response);
                console.log("postdata :", response.data);
                done()
            })
            .catch((err) => {
                console.log(err)
            })
    });

   
 
})
