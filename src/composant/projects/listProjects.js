const Boom = require('boom');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const Project = require("../../schema/schemaProject");

exports.plugin = {
    async register(server, options) {
        server.route({
            method: 'GET',
            path: '/v1/projects/list',

            async handler(request) {
                try {
                    const Query = Project.find({}, {  aws_cognito_idp: 0, __v: 0 } );
                    const docs = await Query;
                    console.log("result :", docs);
                    request.totalCount = docs.length;
                    return  docs
                }
                catch (err) {
                    throw Boom.internal('Internal MongoDB error', err);
                }
               
            }

        });
    },
    version: require('../../../package.json').version,
    name: 'route-projects'
};