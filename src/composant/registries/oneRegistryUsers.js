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
            path: '/v1/registry/users/{id}',

           async handler (req, rep)  {
                const id = req.params.id;
                const payload = req.payload;
                const axios= require('axios')
                const auth = {
                    username : "admin-getcaas",
                    password : "Fullmetal1989"
                }
                const query =  await axios.get(`https://registry.getcaas.io/api/users/${id}`, { auth, headers: { "content-type": "application/json" } })
                const user = query.data;
                const resultArray = [];
                resultArray.push(user);
                req.totalCount = resultArray.length;
                    switch (query.status){
                        case 400:
                            return "Invalid user ID."
                        case 401:
                            return "User need to log in first."
                        case 403:
                            return "User does not have permission of admin role."
                        case 404:
                            return "User ID does not exist."
                        case 500:
                            return "Unexpected internal errors."
                        default:
                            return resultArray
                }
            
              
            
        }
        });
    },

    version: require('../../../package.json').version,
    name: 'route-getuser'
};

