const assert = require('assert');
const Hosting = require('../src/schema/schemaProject');
describe('Deleting a project resource', () => {

    let resource;

    beforeEach((done) => {
        resource = new Hosting({
            name: 'myproject',
            description: "testmyproject",
            type: "bla",
            environment: "testing",
            status: "testing",
            updatedAt: "2020-06-19T11:25:14.949+00:00",
            createdAt: "2020-06-19T11:25:14.949+00:00",
            instances: 1
        });
        resource.save()
            .then(() => done());
    });

    function assertHelper(statement, done) {
        statement
            .then(() => Hosting.find({}))
            .then((resources) => {
                assert(resources.length === 1);
                assert(resources[0].name === 'myproject');
                done();
            });
    }

    it('sets and saves project resource using an instance', (done) => {
        resource.set('name', 'myproject'); //not updated in mongodb yet
        assertHelper(resource.save(), done);
    });

    it('update project resource using instance', (done) => {
        //useful to update multiple fields of the object
        assertHelper(resource.update({ customer:{name: 'newresource' }}), done);
    });

    it('update all matching projects resources using model', (done) => {
        assertHelper(Hosting.update({ customer:{name: 'updatedresource' }}, { customer:{name: 'newresource' }}), done);
    });

    it('update one project resource using model', (done) => {
        assertHelper(Hosting.findOneAndUpdate({ customer:{name: 'updatedresource' }}, { customer:{name: 'newresource' }}), done);
    });

    it('update one project resource with id using model', (done) => {
        assertHelper(Hosting.findByIdAndUpdate(resource._id, { customer:{name: 'newresource' }}), done);
    });
});