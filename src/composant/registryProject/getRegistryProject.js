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
            path: '/v1/registry/project/{id}',

           async handler (req, rep) {
                const id = req.params.id;
                const axios= require('axios');
                const auth = {
                    username : "admin-getcaas",
                    password : "Fullmetal1989"
                }


                const query =  await axios.get(`https://registry.getcaas.io/api/projects/${id}`, { auth, headers: { "content-type": "application/json" } })
                const project = query.data;
                resultArray = [];
                resultArray.push(project)
                req.totalCount = resultArray.length;
                    switch (query.status){
                        case 401:
                            return "User need to log in first."
                        case 500:
                            return "Internal errors."
                        default:
                            return resultArray
                }
               
            
        }
        });
    },

    version: require('../../../package.json').version,
    name: 'route-getregistryproject'
};


