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
            path: '/v1/image/{info}/{project}/{image}',
            options:{
                validate: {

                    params:Joi.object({
                        image: Joi.string(),
                        project:Joi.string(),
                        info:Joi.string()
                    })
                }
            },
           async handler (req, rep) {
                const image = req.params.image
                const project = req.params.project
                const info = req.params.info
                console.log(image)
                const axios= require('axios');
                const auth = {
                    username : "admin-getcaas",
                    password : "Fullmetal1989"
                }


                const query =  await axios.get(`https://registry.getcaas.io/api/repositories/${project}/${image}/tags?detail=true`, { auth, headers: { "content-type": "application/json" } })
                resultArray = [];
                if (info == "size") {
                    const dockerImage = {
                        "name_image":image,
                        "name_project":project,
                        "size":query.data[0].size,
                        "version":query.data[0].name
                                    }
                    resultArray.push(dockerImage)
                }
                else if  (info == "created") {

                    const dockerImage = {
                        "name_image":image,
                        "name_project":project,
                        "created":query.data[0].created,
                        "version":query.data[0].name
                                    }
                    resultArray.push(dockerImage)
                }
                
                
                req.totalCount = resultArray.length;
                    switch (query.status){
                        case 500:
                            return "Unexpected internal errors."
                        default:
                            return resultArray
                }
               
            
        }
        });
    },

    version: require('../../../package.json').version,
    name: 'route-getimageinfo'
};


