const Mongoose = require('mongoose').set('debug', true);


const projectSchema = new Mongoose.Schema({
    name: { type: String},
    description:{ type: String},
    type:{ type: String},
    environment:{ type: String},
    status:{ type: String},
    updatedAt:{ type: Date, default: Date.now },
    createdAt:{ type: Date, default: Date.now },
    instances:{ type: String, default:1},
}, { versionKey: false });

const Project = Mongoose.model('Project',projectSchema);
module.exports = Project