// Array de métodos ( C R U D)
const clientesController = {};


import ClientesModel from "../models/Clientes.js";

//SELECT
clientesController.getClientes = async (req, res) => {
const clientes = await ClientesModel.find()
res.json(clientes)
}

// INSERT
clientesController.createClientes = async (req, res) => {
    const{ nombre,email,password,telefono,direccion,DUI } = req.body;
    const newCliente = new ClientesModel ({nombre,email,password,telefono,direccion,DUI });
    await newCliente.save()
    res.json({ message : "Cliente Guardado"});
}
    //DELETE
clientesController.deleteClientes = async (req, res) => {
  try {
    const deleted = await ClientesModel.findByIdAndDelete(req.params.id); 
    if (!deleted) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar cliente" });
  }
}


//UPDATE
clientesController.updateClientes = async (req, res) => {
   //  Solicito todos los valores
    const {nombre,email,password,telefono,direccion,DUI} = req.body;

    await ClientesModel.findByIdAndUpdate(req.params.id,{
       nombre,
       email,
       password,
       telefono,
       direccion,
       DUI

    },{new: true}
);
// muestro un mensaje que todo se actualizó
res.json({ message: "Cliente actualizado"});
};
export default clientesController;