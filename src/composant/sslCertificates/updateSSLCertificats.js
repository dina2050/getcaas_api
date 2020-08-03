const Boom = require('boom');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { fkExtension } = require('joi-key-extensions');
const VanillaJoi = Joi.extend(fkExtension.string);
const Mongoose = require('mongoose').set('debug', true);
const SSLCertificate = require("../../schema/schemaCertificateSSL");

exports.plugin = {
    async register(server, options) {
        server.route({
            method: 'PUT',
            path: '/v1/ssl-certificats/{id}',
            options: {
                validate: {
                    params: Joi.object({
                        id: Joi.objectId()
                    }),
                    payload: Joi.object({
                        name: Joi.string().min(1).max(50).required(),
                        domain: Joi.string().min(1).max(50).required(),
                        description: Joi.string().min(1).max(50).required(),
                        createdAt: Joi.date().default(() => new Date(), 'current date').timestamp(),
                        createdBy: Joi.string().trim().default("undefined"),
                        privateKey: Joi.string().min(1).max(5000).required(),
                        certificateCsr: Joi.string().min(1).max(5000).required(),
                        certificateKey: Joi.string().min(1).max(5000).required(),
                        Order: {
                            status: Joi.string().min(1).max(5000).required(),
                            expires: Joi.date(),
                            identifiers: Joi.string().min(1).max(5000).required(),
                            authorizations: Joi.string().min(1).max(5000).required(),
                            finalize: Joi.string().min(1).max(5000).required(),
                            url: Joi.string().min(1).max(5000).required()
                        }

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
                    const Query = await SSLCertificate.updateOne(
                        { _id: ObjectID(id) },
                        {
                            $set: {
                                "name": payload.name,
                                "domain": payload.domain,
                                "description": payload.description,
                                "privateKey": payload.privateKey,
                                "certificateCsr": payload.certificateCsr,
                                "certificateKey": payload.certificateKey,
                                "order": {
                                    "status": payload.order.status,
                                    "expires": payload.order.expires,
                                    "identifiers": payload.order.identifiers,
                                    "authorizations": payload.order.authorizations,
                                    "finalize": payload.order.finalize,
                                    "url": payload.order.url
                                }
                            }
                        }
                    ); if (Query.n === 1) {
                        if (Query.nModified === 1) {
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
                    throw Boom.internal('Internal MongoDB error', err);
                }
            },


        });
    },
    version: require('../../../package.json').version,
    name: 'route-changesslcertificate'
};


