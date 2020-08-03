const Boom = require('boom');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const Mongoose = require('mongoose').set('debug', true);
const SSHKey = require("../../schema/schemaKeySSH");
exports.plugin = {
    async register(server, options) {
        server.route({
            method: 'GET',
            path: '/v1/ssh-keys/{id}',
            options: {
                validate: {
                    params: Joi.object({
                        id: Joi.objectId()
                    })}
            },

            async handler(request) {
    
                try {
                    const resultArray = [];
                    console.log("gotry")
                    const id = request.params.id;
                    console.log(id)
                    const ObjectID = Mongoose.Types.ObjectId(id);
                    console.log(ObjectID)
                    const Query =  SSHKey.findOne(
                        { _id: ObjectID }
                       );
                     
                    const doc = await Query;
                    resultArray.push(doc);
                    request.totalCount = resultArray.length;
                    return resultArray
                }
                catch (err) {
                    throw Boom.internal('Internal MongoDB error', err);
                }
               
            }

        });
    },
    version: require('../../../package.json').version,
    name: 'route-onesshkey'
};