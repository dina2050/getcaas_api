const Mongoose = require('mongoose').set('debug', true);

const Schema = Mongoose.Schema;

const hostingSchema = new Mongoose.Schema({
    customer: {
        name: String,
        email: String
    },
    //createdBy: String,
    state: String,
    resources: {
        name: { type: String},
        type: { type: String},
        domaine: { type: String},
        project: { type :Mongoose.Schema.Types.ObjectId},
        image_application: { type: String},
        image_database: { type: String},
        subscription_type: { type: String},
        subscription: { type: String},
        save: { type:Boolean},
        price_no_tax: {type:Number},
        land: { type: String,  },
        location: { type: String},
        provider: { type: String}
    },
    //aws_cognito_idp: String,
    createdAt: { type: Date, default: Date.now },
}, { versionKey: false });

const Hosting = Mongoose.model('Hosting',hostingSchema);
module.exports = Hosting
