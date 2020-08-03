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
            method: 'DELETE',
            path: '/v1/image/project/{project}/{image}',
            options:{
                validate: {

                    params:Joi.object({
                        image: Joi.string().min(1).max(50),
                        project:Joi.string().min(1).max(50)
                    })
                }
            },
           async handler (req, rep) {
                const image = req.params.image;
                const project = req.params.project;
                const axios= require('axios');
                const auth = {
                    username : "dinara",
                    password : "dinara1995"
                }


                const query =  await axios.delete(`https://registry.getcaas.io/api/repositories/${project}/${image}`, { auth, headers: { "content-type": "application/json" } })
                    switch (query.status){
                        case 200:
                            return "Succesfully deleted."
                        case 400:
                            return "Invalid repo_name."
                        case 401:
                            return "Unauthorized."
                        case 403:
                            return "Forbidden."
                        case 404:
                            return "Repository not found."
                        default:
                            return query.data
                }
            
        }
        });
    },

    version: require('../../../package.json').version,
    name: 'route-deleteregistryimage'
};


