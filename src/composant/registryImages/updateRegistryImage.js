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
            path: '/v1/image/{project}/{image}',
            options:{
                validate: {
                    payload: Joi.object({
                        description:Joi.string().min(1).max(500)
                    }),

                    params:Joi.object({
                        image: Joi.string().min(1).max(50),
                        project:Joi.string().min(1).max(50)
                    }),
                }
            },
           async handler (req, rep) {
                const image = req.params.image;
                const project = req.params.project
                const payload = req.payload
                const axios= require('axios');
                const auth = {
                    username : "admin-getcaas",
                    password : "Fullmetal1989"
                }


                const query =  await axios.put(`https://registry.getcaas.io/api/repositories/${project}/${image}`, payload, { auth, headers: { "content-type": "application/json" } })
                    switch (query.status){
                        case 200:
                            return "Update successfully."
                        case 401:
                            return "Unauthorized"
                        case 403:
                            return "Forbidden"
                        case 404:
                            return "Repository not found."
                        default:
                            return query.data
                }
               
            
        }
        });
    },

    version: require('../../../package.json').version,
    name: 'route-updateregistryimage'
};


