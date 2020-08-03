const Boom = require('boom');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const Project = require("../../schema/schemaProject");
exports.plugin = {
    async register(server, options) {
        server.route({
            method: 'POST',
            path: '/v1/projects/',
            options: {
                validate: {
                    options:{
                    payload: Joi.object({
                        name: Joi.string().min(1).max(50).required(),
                        description: Joi.string().min(1).max(1000).required(),
                        type: Joi.valid("try","website","webapp","api", "mobilapp", "ML","iot","intern","other").required(),
                        environment: Joi.valid("test","preprod","prod","development","other").required(),
                        status: Joi.string().default("aucun"),
                        updatedAt: Joi.date().default(() => new Date(), 'current date').timestamp(),
                        createdAt: Joi.date().default(() => new Date(), 'current date').timestamp(),
                        instances: Joi.number().default(1)
                    }),
                    failAction: (request, h, error) => {

                        return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
                    }
                }
            }
            },

            async handler(request) {
                try {
                    const data = request.payload;
                    const Query = new Project(data);
                    console.log("query", await Query.save())
                      
                    return await Query.save()
                }
                catch (err) {
                    throw Boom.internal('Internal MongoDB error', err);
                }
            },
            

        });
    },
    version: require('../../../package.json').version,
    name: 'route-addproject'
};