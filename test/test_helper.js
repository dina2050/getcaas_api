const mongoose = require('mongoose');//tell mongoose to use es6 implementation of promises
mongoose.Promise = global.Promise;mongoose.connect( "mongodb+srv://developpment-getcaas:j7mciOAjT6qdsCwo@cluster0-tnuck.mongodb.net/getcaas-test"); 
mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ',error);
    });//Called hooks which runs before something.
beforeEach((done) => {
    mongoose.connection.collections.projects.drop(() => {
         //this function runs after the drop is completed
        done(); //go ahead everything is done now.
    }); 
});