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
            path: '/v1/registry/users/{id}',
            options: {
                validate: {
                    payload: Joi.object({
                        password: Joi.string(),
                        email: Joi.string(),
                        realname:  Joi.string()
                    }), 
                   
                    failAction: (request, h, error) => {

                        return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
                    },
                   
                }
            },
            async handler (req, rep)  {
                const id = req.params.id;
                const payload = req.payload;
                const axios= require('axios')
                const auth = {
                    username : "admin-getcaas",
                    password : "Fullmetal1989"
                }
                const query =  await axios.put(`https://registry.getcaas.io/api/users/${id}`, payload, { auth, headers: { "content-type": "application/json" } })
                    switch (query.status){
                        case 400:
                            return "Invalid user ID."
                        case 401:
                            return "User need to log in first."
                        case 401:
                            return "User registration can only be used by admin role user when self-registration is off."
                        case 403:
                            return "User does not have permission of admin role."
                        case 404:
                            return "User ID does not exist."
                        case 500:
                            return "Unexpected internal errors"
                        default:
                            return payload
                }
            
              
            
        }
        });
    },

    version: require('../../../package.json').version,
    name: 'route-updateuser'
};

