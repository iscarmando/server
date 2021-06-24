const mongoose = require('mongoose');

//configuracion de los parametros de la base de datos
url = 'mongodb://localhost/empleados';
dbparams = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
};

mongoose.connect(url, dbparams)
    .then (db => console.log('La base de datos esta conectada'))
    .catch( err => console.log(err));

    module.exports = mongoose;
