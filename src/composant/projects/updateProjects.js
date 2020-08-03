const Boom = require('boom');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const project = require("../../schema/schemaProject");
const Mongoose = require('mongoose').set('debug', true);

exports.plugin = {
    async register(server, options) {
        server.route({
            method: 'PUT',
            path: '/v1/projects/{id}',
            options: {
                validate: {
                    params: Joi.object({
                        id: Joi.objectId()
                    }),
                    payload: Joi.object({
                        name: Joi.string().min(1).max(50).required(),
                        description: Joi.string().min(1).max(1000).required(),
                        type: Joi.valid(
                            "try",
                            "website",
                            "webapp",
                            "api", "mobilapp", 
                            "ML","iot",
                            "intern","other").required(),
                        environment: Joi.valid(
                            "test","preprod",
                            "prod","development",
                            "other").required(),
                        status: Joi.string().default("aucun"),
                        updatedAt: Joi.date().default(() => new Date(), 'current date').timestamp(),
                        createdAt: Joi.date().default(() => new Date(), 'current date').timestamp(),
                        instances: Joi.number().default(1)
                    }),
                    failAction: (request, h, error) => {

                        return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
                    }
                 }
             },

            async handler(request) {
                try {
                    const id = request.params.id
                    const ObjectID = Mongoose.Types.ObjectId(id)
                    const Query = await project.Project.updateOne(
                        {_id: ObjectID},
                        {
                            $set: {
                               "name":request.payload.name,
                               "description":request.payload.description,
                               "type":request.payload.type,
                               "environment":request.payload.environment,
                               "status":request.payload.status
                            }
                        })

                        if(Query.n === 1 ){
                            if (Query.nModified === 1){
                                return {
                                    statusCode: 200,
                                    body: "Successfully modified"
                                };
                            } else {
                                return {
                                    statusCode: 400,
                                    body: "Not Modified"
                                };
                            }
                        } else {
                            return {
                                statusCode: 500,
                                body:"Failed Modification"
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
    name: 'route-updateproject'
};