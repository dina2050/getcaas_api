const Boom = require('boom');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const hosting = require("../../schema/schemaHosting");
const Mongoose = require('mongoose').set('debug', true);

exports.plugin = {
    async register(server, options) {
        server.route({
            method: 'GET',
            path: '/v1/projects/resources/{id}',
            options: {
                validate: {
                    params: Joi.object({
                        id: Joi.objectId()
                    })}
            },
            async handler(request) {

                try {
                    const resultArray = [];
                    const id = request.params.id
                    const ObjectID = Mongoose.Types.ObjectId(id)
                    const Query =  hosting.Hosting.findOne(
                        { _id: ObjectID },
                        {  aws_cognito_idp: 0, __v: 0 });
                        const doc = await Query;
                        resultArray.push(doc);
                        request.totalCount = resultArray.length;
                       console.log("query :", resultArray)
                    return  resultArray
                }
                catch (err) {
                    throw Boom.internal('Internal MongoDB error', err);
                }
               
            }
        });
    },
    version: require('../../../package.json').version,
    name: 'route-oneresource'
};