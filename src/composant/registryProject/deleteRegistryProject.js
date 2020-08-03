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
            path: '/v1/registry/project/{id}',

            async handler (req, rep)  {
                const axios= require('axios');
                const id = req.params.id
                const auth = {
                    username : "admin-getcaas",
                    password : "Fullmetal1989"
                }

                const query =  await axios.delete(`https://registry.getcaas.io/api/projects/${id}`, { auth, headers: { "content-type": "application/json" } })
                const resultArray = [];
                resultArray.push(query.data);
                    switch (query.status){
                        case 400:
                            return "Invalid project id."
                        case 403:
                            return "User need to log in first."
                        case 404:
                            return "Project does not exist."
                        case 412:
                            return "Project contains policies, can not be deleted."
                        case 500:
                            return "Internal errors."
                        default:
                            return resultArray
                }
               
            
        }
        });
    },

    version: require('../../../package.json').version,
    name: 'route-deleteregistryproject'
};


