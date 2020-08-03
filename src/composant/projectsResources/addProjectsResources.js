const Boom = require('boom');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const JoiCountryExtension = require('joi-country-extension');
const Joicountry = Joi.extend(JoiCountryExtension);
const hosting = require("../../schema/schemaHosting");

exports.plugin = {
    async register(server) {
        server.route({
            method: 'POST',
            path: '/v1/projects/resources',
            options: {
                validate: {
                    payload: Joi.object({
                        customer: Joi.object({
                            name: Joi.string().min(1).max(50).required(),
                            email: Joi.string().email().required()
                        }),
                        state: Joi.string().min(1).max(50).required(),
                        resources: Joi.object({
                            name: Joi.string().min(1).max(50).required(),
                            type: Joi.valid(
                                "try",
                                "website",
                                "webapp",
                                "api",
                                "mobilapp",
                                "ML", "iot",
                                "intern",
                                "other").required(),
                            domaine: Joi.string().min(1).max(50).required(),
                            project: Joi.objectId().required(),
                            image_application: Joi.string().min(1).max(50).required(),
                            image_database: Joi.string().min(1).max(50).required(),
                            subscription_type: Joi.string().min(1).max(50).required(),
                            subscription: Joi.string().min(1).max(50).required(),
                            save: Joi.boolean().required(),
                            price_no_tax: Joi.number().required(),
                            land: Joicountry.string().country().required(),
                            location: Joi.string().min(1).max(50).required(),
                            provider: Joi.string().min(1).max(50).required(),
                        }),
                        //aws_cognito_idp: Joi.string().min(1).max(50).required(),
                        createdAt: Joi.date().default(() => new Date(), 'current date').timestamp()
                    }),
                    failAction: (request, h, error) => {

                        return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
                    }
                }
            },
            async handler(request) {

                try {
                    const data = request.payload;
                    const Query = new hosting.Hosting(data);
                    console.log("query", await Query.save())
                    return await Query.save()
                }
                catch (err) {
                    throw Boom.internal('Internal MongoDB error', err);
                }

            }
        });
    },
    version: require('../../../package.json').version,
    name: 'route-addresources'
};
