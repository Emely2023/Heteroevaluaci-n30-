// Array de métodos ( C R U D)
const empleadosController = {};


import EmpleadosModel from "../models/Empleados.js";

//SELECT
empleadosController.getEmpleados = async (req, res) => {
const empleados = await EmpleadosModel.find()
res.json(empleados)
}
//INSERT
empleadosController.createEmpleados = async (req, res) => {
    const{nombre, correo, contrasenia ,telefono, direccion, puesto,fecha_contratacion, salario, DUI } = req.body;
    const newEmpleado = new EmpleadosModel ({nombre, correo, contrasenia ,telefono, direccion, puesto,fecha_contratacion, salario, DUI });
    await newEmpleado.save()
    res.json({ message : "Empleado guardado"});
}
//DELETE
empleadosController.deleteEmpleados = async (req, res) => {
    await empleadosController.findOneAndDelete(req.params.id)
    res.json({message:"Empleado eliminado"})
}

//UPDATE
empleadosController.updateEmpleados = async (req, res) => {
   //  Solicito todos los valores
    const {nombre, correo, contrasenia ,telefono, direccion, puesto,fecha_contratacion, salario, DUI} = req.body;

    await EmpleadosModel.findByIdAndUpdate(req.params.id,{
        nombre,
        correo,
        contrasenia ,
        telefono,
        direccion,
        puesto,
        fecha_contratacion,
        salario,
        DUI
    },{new: true}
);
// muestro un mensaje que todo se actualizó
res.json({ message: "Empleado Actualizado"});
};
export default empleadosController;