const assert = require('assert');
const Project = require('../src/schema/schemaProject'); //imports the Project model.
let pro;
beforeEach((done) => {
    pro = new Project({
        name: 'myproject',
        description: "testmyproject",
        type: "bla",
        environment: "testing",
        status: "testing",
        updatedAt: "2020-06-19T11:25:14.949+00:00",
        createdAt: "2020-06-19T11:25:14.949+00:00",
        instances: 1
    })
    pro.save()
        .then(() => done());
});
describe('Reading project details', () => {
    it('finds project with the name of myproject', (done) => {
        Project.findOne({
            name: 'myproject'
        })

            .then((project) => {
                assert(pro.name === 'myproject');
                done();
            });
    });
})