const Boom = require('boom');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
JoiCountryExtension = require('joi-country-extension');
const Joicountry = Joi.extend(JoiCountryExtension);
const hosting = require("../../schema/schemaHosting");
const Mongoose = require('mongoose').set('debug', true);

exports.plugin = {
    async register(server, options) {
        server.route({
            method: 'PUT',
            path: '/v1/projects/resources/{id}',
            options: {
                validate: {
                    params: Joi.object({
                        id: Joi.objectId()
                    }),
                    payload: Joi.object({
                        customer:Joi.object({
                            name: Joi.string().min(1).max(50).required(),
                            email: Joi.string().email().required()
                        }),
                        state: Joi.string().min(1).max(50).required(),
                        resources: Joi.object({
                            name:Joi.string().min(1).max(50).required(),
                            type:Joi.valid(
                                "try",
                                "website",
                                "webapp",
                                "api",
                                "mobilapp",
                                "ML","iot",
                                "intern",
                                "other").required(),
                            domaine:Joi.string().min(1).max(50).required(),
                            project: Joi.objectId().required(),
                            image_application:Joi.string().min(1).max(50).required(),
                            image_database:Joi.string().min(1).max(50).required(),
                            subscription_type:Joi.string().min(1).max(50).required(),
                            subscription:Joi.string().min(1).max(50).required(),
                            save:Joi.boolean().required(),
                            price_no_tax: Joi.number().required(),
                            land:Joicountry.string().country().required(),
                            location:Joi.string().min(1).max(50).required(),
                            provider:Joi.string().min(1).max(50).required(),
                        }),
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
                    const Query = await hosting.Hosting.updateOne(
                        {_id: ObjectID},
                        {
                            $set: {
                                "customer": {
                                    "name": request.payload.customer.name,
                                    "email": request.payload.customer.email
                                },
                                "state": request.payload.state,
                                "resources": {
                                    "name": request.payload.resources.name,
                                    "type": request.payload.resources.type,
                                    "domaine": request.payload.resources.domaine,
                                    "project": request.payload.resources.project,
                                    "image_application": request.payload.resources.image_application,
                                    "image_database": request.payload.resources.image_database,
                                    "subscription_type": request.payload.resources.subscription_type,
                                    "subscription": request.payload.resources.subscription,
                                    "save": request.payload.resources.save,
                                    "price_no_tax": request.payload.resources.price_no_tax,
                                    "land": request.payload.resources.land,
                                    "location": request.payload.resources.location,
                                    "provider": request.payload.resources.provider,
                                }
                            }
                        })

                    if(Query.n === 1 ){
                        if (Query.nModified === 1){
                            return {
                                statusCode: 200,
                                body: JSON.stringify('Successfully modified ')
                            };
                        } else {
                            return {
                                statusCode: 400,
                                body: JSON.stringify("Not Modified")
                            };
                        }
                    } else {
                        return {
                            statusCode: 500,
                            body: JSON.stringify("Failed Modification")
                        };
                    }

                }
                catch (err) {
                    throw Boom.internal('Internal Server Error', err);
                }
            },
         });
    },
    version: require('../../../package.json').version,
    name: 'route-updateresource'
};
