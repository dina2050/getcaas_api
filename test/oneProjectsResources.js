const assert = require('assert');
const Hosting = require('../src/schema/schemaHosting');
let resource;
beforeEach((done) => {
    resource = new Hosting({
        customer: {
            name: "newresource",
            email: "newresource"
        },
        //createdBy: String,
        state:"unknown",
        resources: {
            name: "resourcename",
            type: "resourcetype",
            domaine:"resourcedomaine",
            project: "5e0a21a6c3546600073d230b",
            image_application: "unknown",
            image_database: "base",
            subscription_type: "subscription_type",
            subscription: "subscription",
            save: true,
            price_no_tax:4.99,
            land: "land",
            location:"location",
            provider: "provider"
        },
        //aws_cognito_idp: String,
        createdAt: "2020-03-11T09:33:12.406+00:00"
    });
    resource.save()
        .then(() => done());
});
describe('Reading project resource details', () => {
    it('finds project resource with the name of newresource', (done) => {
        Hosting.findOne({ customer:{name: 'newresource' }})

            .then((projectResource) => {
                assert(resource.customer.name === 'newresource');
                done();
            });
    });
})
