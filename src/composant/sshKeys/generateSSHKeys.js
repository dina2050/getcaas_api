const Boom = require('boom');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const node_openssl = require('node-openssl-cert');
const openssl = new node_openssl();
const SSHKey = require("../../schema/schemaKeySSH");
const Promise = require('bluebird');
exports.plugin = {
    async register(server, options) {
        server.route({
            method: 'POST',
            path: '/v1/ssh-keys/generate',
            options: {
                validate: {
                    payload: Joi.object({
                        name: Joi.string().strict().trim().min(1).max(50).required(),
                        description: Joi.string().trim().min(1).max(1000).required(),
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
                    const data = request.payload;
                    openssl.generateRSAPrivateKey({}, function (err, key, cmd) {
                            const Query = new SSHKey(
                                {
                                    name: data.name,
                                    description: data.description,
                                    createdAt: data.createdAt,
                                    createdBy: data.createdBy,
                                    content: key

                                })
                             
                            return  Query.save()
                       

                    }) 
                   
                }
                catch (err) {
                    throw Boom.internal('Internal MongoDB error', err);
                }
            }


        });
    },
    version: require('../../../package.json').version,
    name: 'route-generatesshkey'
};


