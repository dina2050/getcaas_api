const Boom = require('boom');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const Mongoose = require('mongoose').set('debug', true);
const Project = require("../../schema/schemaProject");

exports.plugin = {
    async register(server, options) {
        server.route({
            method: 'GET',
            path: '/v1/projects/{id}',
            options: {
                validate: {
                    params: Joi.object({
                        id: Joi.objectId()
                    })}
            },

            async handler(request) {
                try {
                    const resultArray = [];
                    const id = request.params.id;
                    const ObjectID = Mongoose.Types.ObjectId(id);
                    const Query =  Project.findOne(
                        { _id: ObjectID },
                        {  aws_cognito_idp: 0, __v: 0 });
                    const doc = await Query;
                    console.log(doc)
                    resultArray.push(doc);
                    request.totalCount = resultArray.length;
                    return resultArray;

                }
                catch (err) {
                    throw Boom.internal('Internal MongoDB error', err);
                }
            }

        });
    },
    version: require('../../../package.json').version,
    name: 'route-oneproject'
};