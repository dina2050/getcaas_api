const Mongoose = require('mongoose').set('debug', true);


const SSLCertificateSchema = new Mongoose.Schema({
    name: { type: String},
    description: { type: String},
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String, default: "undefined"},
    privateKey:{type:String},
    certificateKey: { type: String},
    certificateCsr:{ type: String},
    Order:{
        status:{ type: String},
        expires:{ type: Date},
        identifiers:{ type: Array},
        authorizations: { type: Array},
        finalize: { type: String},
        url:{ type: String}
    }
}, { versionKey: false });

const SSLCertificate = Mongoose.model('SSLCertificate',SSLCertificateSchema);
module.exports = SSLCertificate