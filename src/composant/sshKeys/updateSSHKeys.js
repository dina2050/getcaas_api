const Boom = require('boom');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
JoiCountryExtension = require('joi-country-extension');
const Joicountry = Joi.extend(JoiCountryExtension);
const Mongoose = require('mongoose').set('debug', true);
const SSHKey = require("../../schema/schemaKeySSH");
exports.plugin = {
    async register(server, options) {
        server.route({
            method: 'PUT',
            path: '/v1/ssh-keys/{id}',
            options: {
                validate: {
                    params: Joi.object({
                        id: Joi.objectId()
                    }),
                    payload: Joi.object({
                        name:Joi.string().min(1).max(50).required(),
                       description:Joi.string().min(1).max(1000).required(),
                       content:Joi.string().min(1).max(5000).required()
                    }),
                    failAction: (request, h, error) => {

                        return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
                    }
                 }
             },
            async handler(request) {
                try {
                    const id = request.params.id
                    const ObjectID = Mongoose.Types.ObjectId(id)
                    const Query = await SSHKey.updateOne(
                        {_id: ObjectID},
                        {$set:{
                            "name":request.payload.name,
                            "description":request.payload.description,
                            "content":request.payload.content
                        }}, {upsert:false}
                    );
                    if(Query.n === 1 ){
                        if (Query.nModified === 1){
                            return {
                                statusCode: 200,
                                body: JSON.stringify('Successfully modified ')
                            };
                        } else {
                            return {
                                statusCode: 400,
                                body: JSON.stringify("Not Modified")
                            };
                        }
                    } else {
                        return {
                            statusCode: 500,
                            body: JSON.stringify("Failed Modification")
                        };
                    }
            }
                catch (err) {
                    throw Boom.internal('Internal MongoDB error', err);
                }
            },
            

         });
    },
    version: require('../../../package.json').version,
    name: 'route-updatesshkey'
};
