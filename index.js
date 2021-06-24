const express = require ('express');
const morgan = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authorization = require('auth-header');

//Modelo de datos de usuarios
const Users = require('./models/Users');

const app = express();

//Conectamos la base de datos
const{ mongoose } = require('./database')
//configuraciones
app.set('port', process.env.PORT || 3100);
app.set('secret', 'my_secret_key_1357');

//Middleaware
app.use(express.urlencoded({extended:true})); //Para recibir los datos del formulario
app.use(morgan('dev'));   //escuchar los cambiso del servidor solo desarrollo
app.use(express.json()); //obtener los datos del ususrio en request.body
app.use(cors());          //Permite ola comunicacion desde afuera del servidor


//Rutas para iniciar sesion en el api
app.post('/api/login', async (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    return new Promise( (resolve, reject)=>{
            Users.findOne({email: email})
                .then ((user)=>{
                    if(!user){//si la consulta no regresa ninguna 
                    res.json({status: false, message: 'Usuario no encontrado'})
                    }else {//Si se encuntra el usuario
                        //comprobamos que el password corresponda
                        if(bcrypt.compareSync(password, user.password)){
                            const expire = 3600; //1 hora
                            const token = jwt.sign(
                                                        {user},
                                                        app.get('secret'),
                                                        { expiresIn: expire}
                                                  )
                            res.json({
                                success: true,
                                token: token
                            })
                        } else {
                            res.json({success: false, message: 'Password no coincide'})
                        }//else

                    }//else
                })//.then
    })//new promise
});// fin de /api/login

// el token se enviaa a travez de requesr.body (e json)
//request.query.token (en la url)
//request.headers (contiene las cabeceras de authorization)


//http://localhost:3100/api/users HTTP/1.1
//Content-Type: application/json
//Authorization: token-auth token
app.use ( (req, res, next)=>{
    //Verificamos si el token viene por el header
    var tokenauth = '';
    if (req.get('authorization')){
        auth = authorization.parse(req.get('authorization'));
        if (auth.scheme == 'token-auth')
            tokenauth = auth.token;
    }

    const token = req.body.token || //json
                  req.query.token || //url
                  tokenauth; //headers
    if (token) {
        jwt.verify(token, app.get('secret'), (err, decoded)=>{
            if (err)
                return res.json( {success: false, message: 'Fallo en la autentificacion'})
            else {
                req.decoded = decoded; //Almacenamos en req el token descodificado
                next(); //Permite ejecutar las siguientes funciones de las rutas
            }
        })
    } else { //Si no existe el token o no se ha enviado en el request
        return res.status(403).send({
            success: false,
            message: 'El token no existe'
        })
    }
});//Fin de app.use
//Las rutas que estan de aqui para abajo solo se tendra acceso
//si el usuario envia un token y ha iniciado sesion

//Rutas del servidor
app.use('/api/empleados', require('./routes/empleados.routes'));
app.use('/api/users', require('./routes/users.routes'));

//Rutas de usuario
app.get('/api/user', (req, res)=>{
    //Verificar que la contraseña corresponda a la endicada
    jwt.verify(req.token, 'my_secret_key_1357', (err, data)=>{
        if (err){
            //Se genera un estatus 403 que indica que el token
            //no fue generado apartir de esta llave secreta
            res.sendStatus(403);
        } else {
            //Significa que el token es valido y se regresan
            //los datos del ususario en la variable data
            res.json({
                text: 'user',
                data
            });
        }
    })
});

//Iniciar el servidor
app.listen(app.get('port'), ()=>{
    console.log("Servidor corriendo en el puerto " + app.get('port'));
});



// http://localhost:3100/api/empleados