const express = require('express');
const router = express.Router();

//Incluir el controlador
const empleados = require('../controllers/empleado.controller');

//Obtener todos los empleados
router.get('/', empleados.getEmpleados);

//Crear un empleado
router.post('/', empleados.createEmpleado);

//Obtener un empleado
router.get('/:id', empleados.getEmpleado);

//Actualizar un empleado
router.put('/:id', empleados.updateEmpleado);

//Elimiar un empleado
router.delete('/:id', empleados.deleteEmpleado);

module.exports = router;