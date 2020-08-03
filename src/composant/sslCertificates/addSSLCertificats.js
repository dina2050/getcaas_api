const Boom = require('boom');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { fkExtension } = require('joi-key-extensions');
const VanillaJoi = Joi.extend(fkExtension.string);
const SSLCertificate = require("../../schema/schemaCertificateSSL");


exports.plugin = {
    async register(server, options) {
        server.route({
            method: 'POST',
            path: '/v1/ssl-certificats',
            options: {
                validate: {
                    payload: Joi.object({
                            name: Joi.string().strict().min(1).max(50).required(),
                            domain: Joi.string().strict().min(1).max(50).required(),
                            description: Joi.string().strict().min(1).max(50).required(),
                            createdAt: Joi.date().default(() => new Date(), 'current date').timestamp(),
                            createdBy: Joi.string().trim().default("undefined"),
                            privateKey : privateKey,
                            certificateCsr: certificateCsr,
                            certificateKey: certificateKey,
                            order: {
                                status:Joi.string().strict().min(1).max(5000).required(),
                                expires:order.expires,
                                identifiers:Joi.string().strict().min(1).max(5000).required(),
                                authorizations: Joi.string().strict().min(1).max(5000).required(),
                                finalize: Joi.string().strict().min(1).max(5000).required(),
                                url:Joi.string().strict().min(1).max(5000).required()
                            }

                    }),
                    failAction: (request, h, error) => {

                        return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
                    }
                }
            },
            async handler(request) {
                
                
                try {
                    const data = request.payload;
                    const Query = new SSLCertificate(data);
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
    name: 'route-addsslcertificate'
};