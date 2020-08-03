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
            method: 'GET',
            path: '/v1/image/project/{id}',

           async handler (req, rep) {
                const id = req.params.id;
                const axios= require('axios');
                const auth = {
                    username : "admin-getcaas",
                    password : "Fullmetal1989"
                }


                const query =  await axios.get(`https://registry.getcaas.io/api/repositories?project_id=${id}`, { auth, headers: { "content-type": "application/json" } })
                const image = query.data;
                resultArray = [];
                resultArray.push(image)
                req.totalCount = resultArray.length;
                    switch (query.status){
                        case 400:
                            return "Invali project ID."
                        case 403:
                            return "Project is not public or current user is irrelevant to the repository."
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
    name: 'route-getregistryimage'
};


