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
            method: 'PUT',
            path: '/v1/registry/project/{id}',
            options: {
                validate: {
                    payload: Joi.object({
                        project_name: Joi.string().min(1).max(50),
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
            async handler (req, rep) {
                const axios= require('axios')
                const payload = req.payload
                const id = req.params.id
                const auth = {
                    username : "admin-getcaas",
                    password : "Fullmetal1989"
                }

                const query =  await axios.put(`https://registry.getcaas.io/api/projects/${id}`, payload, { auth, headers: { "content-type": "application/json" } })
                console.log(query);
                const resultArray = [];
                resultArray.push(payload);
                    switch (query.status){
                        case 400:
                            return "Illegal format of provided ID value."
                        case 401:
                            return "User need to log in first."
                        case 403:
                            return "User does not have permission to the project."
                        case 404:
                            return "Project ID does not exist."
                        case 500:
                            return "Unexpected internal errors."
                        default:
                            return resultArray
                }
               
            
        }
        });
    },

    version: require('../../../package.json').version,
    name: 'route-updateregistryproject'
};


