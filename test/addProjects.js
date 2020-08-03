const assert = require('assert');
const Project = require('../src/schema/schemaProject'); //imports the Project model.
describe('Creating documents', () => {
    it('creates a project', (done) => {
        //assertion is not included in mocha so 
        //require assert which was installed along with mocha
        const pro = new Project({
         name: 'Pickachu' ,
        description:"testpickacu",
        type:"bla",
        environment:"testing",
        status:"testing",
        updatedAt:"2020-06-19T11:25:14.949+00:00",
        createdAt:"2020-06-19T11:25:14.949+00:00",
        instances:1});
        pro.save()
       //takes some time and returns a promise
            .then(() => {
                assert(!pro.isNew); //if pro is saved to db it is not new
                done();
            });
    });
});

