const Mongoose = require('mongoose').set('debug', true);


const SSHKeySchema = new Mongoose.Schema({
    name: { type: String},
    description: { type: String},
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String, default: "undefined"},
    content: { type: String}
}, { versionKey: false });

const SSHKey = Mongoose.model('SSHKey',SSHKeySchema);
module.exports = SSHKey