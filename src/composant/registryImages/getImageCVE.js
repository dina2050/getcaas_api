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
            path: '/v1/image/cve/{project}/{image}/{tag}',
            options:{
                validate: {

                    params:Joi.object({
                        image: Joi.string().min(1).max(50),
                        project:Joi.string().min(1).max(50),
                        tag:Joi.string().min(1).max(50)
                    })
                }
            },
           async handler (req, rep) {
                const image = req.params.image
                const project = req.params.project
                const tag = req.params.tag
                console.log(image)
                const axios= require('axios');
                const auth = {
                    username : "admin-getcaas",
                    password : "Fullmetal1989"
                }


                const query =  await axios.get(`https://registry.getcaas.io/api/repositories/${project}/${image}/tags/${tag}/vulnerability/details`, { auth, headers: { "content-type": "application/json" } })
                const dockerImage = query.data;
                console.log(dockerImage)
                resultArray = [];
                resultArray.push(dockerImage)
                req.totalCount = resultArray.length;
                   
                    return resultArray
               
            
        }
        });
    },

    version: require('../../../package.json').version,
    name: 'route-getimagecve'
};


