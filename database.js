const mongoose = require('mongoose');

//configuracion de los parametros de la base de datos
//url = 'mongodb://localhost/empleados';
url = "mongodb+srv://sistema_empleados:Sistemaempleados2021@cluster0.4aivt.mongodb.net/Empleados?retryWrites=true&w=majority";
//url="mongodb+srv://sistema_empleados:<Sistemaempleados>@cluster0.4aivt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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
