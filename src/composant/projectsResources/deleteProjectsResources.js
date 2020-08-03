const Boom = require('boom');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const hosting = require("../../schema/schemaHosting");
const Mongoose = require('mongoose').set('debug', true);

exports.plugin = {
    async register(server, options) {
        server.route({
            method: 'DELETE',
            path: '/v1/projects/resources/{id}',
            options: {
                validate: {
                    params: Joi.object({
                        id: Joi.objectId()
                    })
                }
            },
            async handler(request) {

                try {
                    const id = request.params.id
                    const ObjectID = Mongoose.Types.ObjectId(id)
                    const Query = hosting.Hosting.deleteOne(
                        { _id: ObjectID });
                    const doc = await Query;
                    console.log("query :", doc)
                    if (doc.n === 1) {
                        if (doc.deletedCount === 1) {
                            return {
                                statusCode: 200,
                                body: JSON.stringify('Successfully deleted')
                            };
                        } else {
                            return {
                                statusCode: 400,
                                body: JSON.stringify("Not Deleted")
                            };
                        }
                    } else {
                        return {
                            statusCode: 500,
                            body: JSON.stringify("Failed Delete")
                        };
                    }
                }
                catch (err) {
                    throw Boom.internal('Internal MongoDB error', err);
                }

            },
        });
    },
    version: require('../../../package.json').version,
    name: 'route-deleteresource'
};