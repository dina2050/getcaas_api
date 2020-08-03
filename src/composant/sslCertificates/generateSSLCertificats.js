const Boom = require('boom');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const Acme = require("acme-client")
const forge = require('node-forge');
const Promise = require('bluebird');
const SSLCertificate = require("../../schema/schemaCertificateSSL");


exports.plugin = {
    async register(server, options) {
        server.route({
            method: 'POST',
            path: '/v1/ssl-certificats/generate',
            options: {
                validate: {
                    payload: Joi.object({
                        commonName: Joi.string().strict().min(1).max(50).required(),
                        altNames: Joi.array().required(),
                        country: Joi.string().strict().min(1).max(50).required(),
                        state: Joi.string().strict().min(1).max(50).required(),
                        locality:Joi.string().strict().min(1).max(50).required(),
                        organization: Joi.string().strict().min(1).max(50).required(),
                        organizationUnit: Joi.string().strict().min(1).max(50).required(),
                        emailAddress: Joi.string().email().required(),
                        name: Joi.string().strict().min(1).max(50).required(),
                        description: Joi.string().min(1).max(1000).required(),
                        createdAt: Joi.date().default(() => new Date(), 'current date').timestamp(),
                        createdBy: Joi.string().trim().default("undefined")

                    }),
                    failAction: (request, h, error) => {

                        return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
                    }
                }
            },

            async handler(request) {

                try {
                   
                    const payload = request.payload;

                    const privateKey = await Acme.forge.createPrivateKey();
                    console.log("privateKey :", privateKey)

                    
                    const [certificateKey, certificateCsr] = await Acme.forge.createCsr({
                        commonName: payload.commonName,
                        altNames: payload.altNames,
                        country: payload.country,
                        state: payload.state,
                        locality: payload.locality,
                        organization: payload.organization,
                        organizationUnit: payload.organizationUnit,
                        emailAddress: payload.emailAddress,
                        key: privateKey
                    });
                   
                    // console.log("certificateKey :", certificateKey)
                    // console.log("certificateCsr:",certificateCsr)

                    const client = new Acme.Client({
                        directoryUrl: Acme.directory.letsencrypt.staging,
                        accountKey:  await Acme.forge.createPrivateKey()
                    });

                    await client.createAccount({
                        termsOfServiceAgreed: true,
                        contact: ['mailto:'+ payload.emailAddress]
                    });
                   
                    const identifiers = [];
                    for (i=0; i<payload.altNames.length; i++){
                       identifiers.push( { type: 'dns', value: payload.altNames[i] })
                     }
                    const order = await client.createOrder({
                      identifiers
                           
                    });
                  
                        
                  
                   
                    // const authorizations = await client.getAuthorizations(order);
                    // console.log("authorizations:",authorizations)
                  
                    // .*(?=\))
                    const Query = new SSLCertificate(
                         {   
                            name: payload.name,
                            domain: payload.domain,
                            description: payload.description,
                            createdAt: payload.createdAt,
                            createdBy: payload.createdBy,
                            privateKey :privateKey ,
                            certificateCsr: certificateCsr,
                            certificateKey:  certificateKey,
                            Order: {
                                status:order.status,
                                expires:order.expires,
                                identifiers:order.identifiers,
                                authorizations: order.authorizations,
                                finalize: order.finalize,
                                url:order.url
                            }
                           
                        }); 
                  
                   console.log(await Query.save())

                    return  await Query.save()
              

                }
                catch (err) {
                    throw Boom.internal('Internal MongoDB error', err);
                }
            },
           

        });
    },
    version: require('../../../package.json').version,
    name: 'route-sslcertificategenerate'
};

