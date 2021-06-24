const express = require('express');
const router = express.Router();

//const bcrypt = require('bcryptjs');

const users = require('../controllers/user.controller');
const Users = require('../models/Users');

//Obtener todos los usuarios
router.get('/', users.getUsers);

//Agregamos un usuario
router.post('/', users.createuser);

//Eliminar un usuario
router.delete('/:id',users.deleteUser);

//Actuializar un usuario
router.put('/:id', users.updateUser);

//obtener un usuario
router.get('/:id', users.getUser);

module.exports = router;