import express from "express";
import clientesController from "../controllers/clientesController.js"
//Router que nos ayuda a color métodos
// que tendrá mi ruta


//Router nos ayuda a color los métodos que tendrá mi ruta
const router = express.Router();


router
.route("/")
.get(clientesController.getClientes)
.post(clientesController.createClientes)

router
.route("/:id")
.put(clientesController.updateClientes)
.get(clientesController.getClientes)
.delete(clientesController.deleteClientes);

export default router;