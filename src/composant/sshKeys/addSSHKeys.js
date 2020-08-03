const Boom = require('boom');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { fkExtension } = require('joi-key-extensions');
const VanillaJoi = Joi.extend(fkExtension.string);
const node_openssl = require('node-openssl-cert');
const openssl = new node_openssl();
const SSHKey = require("../../schema/schemaKeySSH");

exports.plugin = {
    async register(server, options) {
        server.route({
            method: 'POST',
            path: '/v1/ssh-keys',
            options: {
                validate: {
                    payload: Joi.object({
                        name: Joi.string().trim().min(1).max(50).required(),
                        description: Joi.string().trim().min(1).max(1000).required(),
                        createdAt: Joi.date().default(() => new Date(), 'current date').timestamp(),
                        createdBy: Joi.string().trim().default("undefined"),
                        content: Joi.string().trim().min(1).max(5000).required()
                    }),
                    failAction: (request, h, error) => {

                        return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
                    }
                }
            },
            async handler(request) {
                
                
                try {
                    const data = request.payload;
                    const Query = new SSHKey(data);
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
    name: 'route-addsshkey'
};