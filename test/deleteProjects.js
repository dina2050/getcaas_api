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
describe('Deleting a project', () => {
  it('removes a project using its instance', (done) => {
    pro.remove()
      .then(() => Project.findOne({ name: 'myproject' }))
      .then((project) => {
        console.log(project)
        assert(project === null );
        done();
      });
  });
})
  it('removes multiple projects', (done) => {
    Project.remove({ name: 'myproject' })
      .then(() => Project.findOne({ name: 'myproject' }))
      .then((project) => {
        assert(project === null);
        done();
      });
  });

  it('removes a project', (done) => {
    Project.findOneAndDelete({ name: 'myproject' })
      .then(() => Project.findOne({ name: 'myproject' }))
      .then((project) => {
        assert(project === null);
        done();
      });
  });

  it('removes a Project using id', (done) => {
    Project.findByIdAndRemove(pro._id)
      // the following code block is repeated again and again
      .then(() => Project.findOne({ name: 'myproject' }))
      .then((project) => {
        assert(project === null);
        done();
      });
  
 })
})