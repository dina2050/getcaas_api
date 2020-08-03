'use strict';
const Hapi = require('@hapi/hapi');
const Mongoose = require('mongoose');
const H2o2 = require('@hapi/h2o2');
const Boom = require('boom');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const memory =  require('@hapi/catbox-memory')
const JoiCountryExtension = require('joi-country-extension');
const Joicountry = Joi.extend(JoiCountryExtension);


    const dbOpts = {
        url: "mongodb+srv://developpment-getcaas:j7mciOAjT6qdsCwo@cluster0-tnuck.mongodb.net/getcaas-test",
        settings: {
            poolSize: 10
        },
        decorate: true
    };
    
            Mongoose.connect(dbOpts.url, { useNewUrlParser: true }, function(err) {
                if (err) {
                    console.log(err);
                    throw err;
                }
                else {
                    console.log("we are here")
                }
            });
            // When the connection is connected
            Mongoose.connection.on('connected', function() {
                console.log('Mongo Database connected');
            });

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        cache: memory
    });
    
    
    server.start();

     server.register({plugin:require('hapi-pagination'),
    options :{
        query: {
          page: {
            name: 'the_page' // The page parameter will now be called the_page
          },
          limit: {
            name: 'per_page', // The limit will now be called per_page
            default: 20     // The default value will be 10
          }
        },
         meta: {
            location: 'body', // The metadata will be put in the response body
            name: 'metadata', // The meta object will be called metadata
            count: {
                active: true,
                name: 'count'
            },
            pageCount: {
                active: true,
                name: 'totalPages'
            },
            totalCount: {
                active: true,
                name: 'totalCount'
            },
          
            self: {
                active: false // Will not generate the self link
            },
            first: {
                active: false // Will not generate the first link
            },
            last: {
                active: false // Will not generate the last link
            }
         },
       
         
    }

    });
   


     server.register({
        plugin: require('hapi-multi-rate-limit'),
        options: {
            pathLimit: false,
            userLimit:false,
            userPathLimitMinutes:250,
            userPathLimitHours:5000
            
        }
    });
  
     server.register({
        plugin:  require('./src/composant/projects/listProjects')
    });

     server.register({
        plugin:  require('./src/composant/projects/oneProjects')
    });

     server.register({
        plugin:  require('./src/composant/projects/addProjects')
    });

     server.register({
        plugin:  require('./src/composant/projects/updateProjects')
    });

     server.register({
        plugin:  require('./src/composant/projects/deleteProjects')
    });



     server.register({
        plugin:  require('./src/composant/projectsResources/listProjectsResources')
    });

     server.register({
        plugin:  require('./src/composant/projectsResources/oneProjectsResources')
    });

     server.register({
        plugin:  require('./src/composant/projectsResources/addProjectsResources')
    });

     server.register({
        plugin:  require('./src/composant/projectsResources/updateProjectsResources')
    });

     server.register({
        plugin:  require('./src/composant/projectsResources/deleteProjectsResources')
    });



     server.register({
        plugin:  require('./src/composant/sshKeys/addSSHKeys')
    });

     server.register({
        plugin:  require('./src/composant/sshKeys/deleteSSHKeys')
    });

     server.register({
        plugin:  require('./src/composant/sshKeys/generateSSHKeys')
    });
  
     server.register({
        plugin:  require('./src/composant/sshKeys/listSSHKeys')
    }); 

     server.register({
        plugin:  require('./src/composant/sshKeys/oneSSHKeys')
    }); 

     server.register({
        plugin:  require('./src/composant/sshKeys/updateSSHKeys')
    }); 


    //  server.register({
    //     plugin:  require('./src/composant/sslCertificates/addSSLCertificats')
    // });

     server.register({
        plugin:  require('./src/composant/sslCertificates/deleteSSLCertificats')
    });
   
     server.register({
        plugin:  require('./src/composant/sslCertificates/generateSSLCertificats')
    });

    //  server.register({
    //     plugin:  require('./src/composant/sslCertificates/listSSLCertificats')
    // });

    //  server.register({
    //     plugin:  require('./src/composant/sslCertificates/oneSSLCertificats')
    // });

    //  server.register({
    //     plugin:  require('./src/composant/sslCertificates/updateSSLCertificats')
    // });


     server.register({
        plugin:  require('./src/composant/registries/addRegistryUsers')
    });

     server.register({
        plugin:  require('./src/composant/registries/oneRegistryUsers')
    });

     server.register({
        plugin:  require('./src/composant/registries/updateRegistryUsers')
    });


     server.register({
        plugin:  require('./src/composant/registryProject/addRegistryProject')
    });

     server.register({
        plugin:  require('./src/composant/registryProject/updateRegistryProject')
    });

     server.register({
        plugin:  require('./src/composant/registryProject/getRegistryProject')
    });

     server.register({
        plugin:  require('./src/composant/registryProject/deleteRegistryProject')
    });


     server.register({
        plugin:  require('./src/composant/registryImages/getRegistryImage')
    });

     server.register({
        plugin:  require('./src/composant/registryImages/getImageInfo')
    });

     server.register({
        plugin:  require('./src/composant/registryImages/getImageCVE')
    });

     server.register({
        plugin:  require('./src/composant/registryImages/deleteRegistryImage')
    });

     server.register({
        plugin:  require('./src/composant/registryImages/updateRegistryImage')
    });

   
   
     
    console.log('Server running on %s', server.info.uri);
    
    module.exports = server;
   

process.on('unhandledRejection', (err) => {
    
    console.log(err);
    process.exit(1);
});






