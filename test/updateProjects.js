const assert = require('assert');
const Project = require('../src/schema/schemaProject');
describe('Deleting a project', () => {

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
        });
        pro.save()
            .then(() => done());
    });

    function assertHelper(statement, done) {
        statement
            .then(() => Project.find({}))
            .then((projects) => {
                assert(projects.length === 1);
                assert(projects[0].name === 'newproject');
                done();
            });
    }

    it('sets and saves project using an instance', (done) => {
        pro.set('name', 'newproject'); //not updated in mongodb yet
        assertHelper(pro.save(), done);
    });

    it('update project using instance', (done) => {
        //useful to update multiple fields of the object
        assertHelper(pro.update({ name: 'newproject' }), done);
    });

    it('update all matching projects using model', (done) => {
        assertHelper(Project.update({ name: 'myproject' }, { name: 'newproject' }), done);
    });

    it('update one projects using model', (done) => {
        assertHelper(Project.findOneAndUpdate({ name: 'myproject' }, { name: 'newproject' }), done);
    });

    it('update one project with id using model', (done) => {
        assertHelper(Project.findByIdAndUpdate(pro._id, { name: 'newproject' }), done);
    });
});