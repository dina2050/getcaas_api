const Boom = require('boom');
const Joi = require('joi');
const Mongoose = require('mongoose').set('debug', true);
Joi.objectId = require('joi-objectid')(Joi);
const hosting = require("../../schema/schemaHosting");

exports.plugin = {
    async register(server, options) {
        server.route({
            method: 'GET',
            path: '/v1/projects/resources/list',
            async handler(request) {
                try {
                    const Query =  hosting.Hosting.find({}, {  aws_cognito_idp: 0, __v: 0 } );
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
    name: 'route-resources'
};


