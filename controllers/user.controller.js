const bcrypt = require('bcryptjs');
const Users = require('../models/Users');

const userController = { }

//Listar todos los usuarios
userController.getUsers = async (req, res) =>{
    const users = await Users.find();
    res.json(users);
}

//crear un usuario
userController.createuser= async (req, res) =>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const tipo = req.body.tipo; //Se agrego el tipo en createUser

    //Creamos el objeto usuario para almacernalo en la base de datos
    const User = new Users({
        name: name,
        email: email,
        password: password,
        tipo: tipo     
    });
    //Encriptamos el password del usuario
                        //Encriptamosla contraseña 10 veces aplicando una funcion hash
    User.password = bcrypt.hashSync(password, 10);
    await User.save()
              .then((user)=>{
                  return res.json(user)
              })
              .catch((err)=>{
                  return res.json({message: ' Error al agregar usuario'})
              })

}//fin de createuser

userController.deleteUser = async (req, res)=>{
    await Users.findByIdAndRemove(req.params.id)
    .then(  (user)=>{
        res.json({status: 'Usuario eliminado', user: user});
    })
    .catch((err)=>{
        console.log(err);
        return res.json({message: 'Error al eliminar usuario'});
    })
}//fin de eliminar usuario

userController.updateUser = async (req, res) =>{
    const {id} = req.params;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const tipo = req.body.tipo;

    const user = new Users({
        name: name,
        email: email,
        password: password,
        tipo: tipo
    });
    user._id = id;
    user.password = bcrypt.hashSync(password, 10);
    await Users.findByIdAndUpdate(id, {$set: user}, {new: true})
                .then((user)=>{
                    res.json({status: 'Ususario actualizado', user:user});
                })
                .catch((err)=>{
                    console.log(err);
                    return res.json({message: 'Erro al actuaizar usuario'});
                });
}//Fin de updateUser
//Buscar un usuario
userController.getUser = async (req, res) =>{
    const user = await Users.findById(req.params.id)
                            .then((user)=>{
                                res.json(user);
                            })
                            .catch((err)=>{
                                console.log(err);
                                return res.json({message: 'Error al obtener usuario'})
                            })
}//Fin de getUser
module.exports = userController;