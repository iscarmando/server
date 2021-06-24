const { response } = require("express");
const router = require("../routes/empleados.routes");
const { route } = require("../routes/empleados.routes");

const Empleados = require ('../models/Empleados');
const empleadoController = {};


//obtener todos los empleados
empleadoController.getEmpleados = async (req, res) =>{
   const empledados = await Empleados.find();
   res.json(empledados);
}

//crear un empleado--> INSERT INTO Empleado
empleadoController.createEmpleado = async (req, res) =>{
    //req.body contiene la informacion del empleado a creae
    //console.log(req.body);
    //res.json("Resibido");
    const empleado= new Empleados({
        nombre: req.body.nombre,
        nuesto: req.body.puesto,
        departamento: req.body.departamento,
        salario: req.body.salario
    });
    console.log("empleado creado");
    await empleado.save();
    res.json({
        'status': 'Empledo guardado'
    })
}

//actualizar un empleado---> UPDATE EMPLEADO 
empleadoController.updateEmpleado = async (req,res)=>{
    const { id } = req.params;
    const empleado = {
        nombre: req.body.nombre,
        puesto: req.body.puesto,
        departamento: req.body.departamento,
        salario: req.body.salario
    }
    //console.log(id);
    //console.log(empleado);
    await Empleados.findByIdAndUpdate(id,{$set: empleado}, {new: true});
    res.json({status: 'Empleado actualizado correctamente'});
}
// consultar emplead --> SELECT* FROM Empleados where id=?
empleadoController.getEmpleado = async (req, res) =>{
//obtener el id de la peticon
//objeto re.params contiene el id dque va a envir
//console.log(req.params);
///res.json("Recidibo");
const empleado = await Empleados.findById(req.params.id);
res.json(empleado);

}


//eliminar un empleado --> DELETE EMPLEADO
empleadoController.deleteEmpleado = async (req, res) =>{
    const {id} = req.params;
    await Empleados.findByIdAndDelete(id);
    res.json({status: 'Empleado eliminado correctamente '});
}
module.exports = empleadoController;