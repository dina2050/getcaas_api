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
            path: '/v1/registry/users',
            options: {
                validate: {
                    payload: Joi.object({
                        username: Joi.string().required(),
                        password: Joi.string().required(),
                        email: Joi.string().required(),
                        realname:  Joi.string().required()
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
                    username : "admin-getcaas",
                    password : "Fullmetal1989"
                }
                
                const query = await axios.post(`https://registry.getcaas.io/api/users`, payload, { auth, headers: { "content-type": "application/json" } })
                console.log("query :",query)
                const resultArray = [];
                resultArray.push(payload);
                    switch (query.status){
                        case 400:
                            return "Unsatisfied with constraints of the user creation."
                        case 403:
                            return "User registration can only be used by admin role user when self-registration is off."
                        case 413:
                            return "User registration can only be used by admin role user when self-registration is off."
                        case 415:
                            return "The Media Type of the request is not supported, it has to be application/json"
                        case 500:
                            return "Unexpected internal errors."
                        default:
                            return resultArray
                }
               
            
        }
        });
    },

    //     });
    // },
    version: require('../../../package.json').version,
    name: 'route-createuser'
};


