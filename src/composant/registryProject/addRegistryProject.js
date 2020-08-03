const Boom = require('boom');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const H2o2 = require('@hapi/h2o2');
const Wreck = require('@hapi/wreck');
const Https = require('https');
const Http = require('http');
exports.plugin = {
    async register(server, options) {
        server.route({
            method: 'POST',
            path: '/v1/registry/project',
            options: {
                validate: {
                    payload: Joi.object({
                        project_name: Joi.string().required(),
                        count_limit: Joi.number().default(-1),
                        cve_whitelist: Joi.object({
                        project_id: Joi.number().default(0),
                        id: Joi.number().default(0),
                        expires_at: Joi.number().default(0)
                        }),
                        storage_limit:  Joi.number().default(10000),
                        metadata:Joi.object({
                            enable_content_trust: Joi.boolean().default(false),
                            auto_scan: Joi.boolean().default(true),
                            severity:Joi.string().default("negligible"),
                            reuse_sys_cve_whitelist:Joi.boolean().default(false),
                            public: Joi.boolean().default(false),
                            prevent_vul: Joi.boolean().default(false)
                        })
                    }), 
                   
                    failAction: (request, h, error) => {

                        return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
                    },
                   
                }
            },
            async handler (req, rep)  {

                const axios= require('axios')
                const payload = req.payload
                const auth = {
                    username : "dinara",
                    password : "dinara1995"
                }

                console.log(payload)
                const query =  await axios.post("https://registry.getcaas.io/api/projects", payload, { auth, headers: { "content-type": "application/json" } });
                const resultArray = [];
                console.log(query)
                resultArray.push(payload);
                    switch (query.status){
                        case 400:
                            return "Unsatisfied with constraints of the project creation."
                        case 401:
                            return "User need to log in first."
                        case 409:
                            return "Project name already exists."
                        case 415:
                            return "The Media Type of the request is not supported, it has to be 'application/json'"
                        case 500:
                            return "Unexpected internal errors."
                        default:
                            return resultArray
                }
               
            
        }
        });
    },

    version: require('../../../package.json').version,
    name: 'route-createregistryproject'
};


